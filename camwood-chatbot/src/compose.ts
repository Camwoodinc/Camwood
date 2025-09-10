import { faqAnswer, loadKnowledge } from './knowledge';
import type { Retrieved } from './types';
import { generateWithProvider } from './providers';
import { cfg } from './config';

/**
 * Composes a standard answer for a user query based on retrieved knowledge.
 * If a FAQ exists, it returns that. Otherwise, it generates an answer using
 * the configured provider and the retrieved context.
 *
 * @param question The user's original question.
 * @param retrieved A list of retrieved chunks (from the search index).
 * @returns An object containing the generated answer and citations.
 */
export async function composeAnswer(question: string, retrieved: Retrieved[]) {
  const kp = loadKnowledge();
  const faq = faqAnswer(kp, question);
  if (faq) {
    return { answer: faq, citations: [] as Array<{ url?: string; title?: string }> };
  }

  // Combine retrieved content into a single context block for the AI.
  const contextBlocks = retrieved.map(r => {
    const header = r.source === 'web' ? `SOURCE: ${r.title || ''} (${r.url || ''})` : 'SOURCE: Camwood Knowledge Pack';
    return `${header}
${r.content.trim()}`;
  }).join(`

---

`);

  // Define the AI's persona and instructions.
  const system = `You are Camwood Architect AI. Answer precisely and helpfully using ONLY the CONTEXT provided.
If something is not covered, say so briefly and offer to connect with a consultant. Keep answers under 180 words unless asked.`;
  const prompt = `USER QUESTION:
${question}

CONTEXT:
${contextBlocks}`;

  const text = await generateWithProvider(prompt, system);
  // Extract the top 3 web citations.
  const citations = retrieved.filter(r => r.source === 'web').slice(0, 3).map(r => ({ url: r.url, title: r.title }));
  return { answer: text, citations };
}

/**
 * Composes a direct escalation response. This is called when the bot
 * determines it cannot provide a good answer and needs to hand off to a human.
 * The message is now direct and does not provide a false choice.
 *
 * @param reason The reason for the escalation (e.g., 'uncertainty').
 * @returns An object containing the a direct answer for the user and handoff details.
 */
export function composeEscalationResponse(reason: string) {
  const base = {
    financial_specifics: `Every engagement is unique, so we don't quote pricing here. We focus on outcomes like faster time-to-decision, reduced noise, and improved trust. Let me connect you with our team for specifics.`,
    contractual_legal: `Our team can best walk you through contracts, SLAs, and audits. Let me connect you with the right person.`,
    technical_integrations: `We integrate with major platforms like AWS, Azure, Snowflake and more. I'll bring in an engineer to confirm details.`,
    sensitive_info: `For security, I can't process sensitive information here. Let me connect you with a Camwood specialist to continue safely.`,
    uncertainty: `I don't have a complete answer for you right now. Let me connect you with a member of our team so they can assist you directly.`
  } as Record<string, string>;
  
  const message = base[reason] || base['uncertainty'];

  return {
    answer: message + ` We will reach out to you via email shortly.`,
    handoff: { options: ['email'], suggested: 'email' }
  };
}
