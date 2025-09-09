import { faqAnswer, loadKnowledge } from './knowledge';
import type { Retrieved } from './types';
import { generateWithProvider } from './providers';
import { cfg } from './config';

export async function composeAnswer(question: string, retrieved: Retrieved[]) {
  const kp = loadKnowledge();
  const faq = faqAnswer(kp, question);
  if (faq) {
    return { answer: faq, citations: [] as Array<{ url?: string; title?: string }> };
  }

  const contextBlocks = retrieved.map(r => {
    const header = r.source === 'web' ? `SOURCE: ${r.title || ''} (${r.url || ''})` : 'SOURCE: Camwood Knowledge Pack';
    return `${header}
${r.content.trim()}`;
  }).join(`

---

`);

  const system = `You are Camwood Architect AI. Answer precisely and helpfully using ONLY the CONTEXT provided.
If something is not covered, say so briefly and offer to connect with a consultant. Keep answers under 180 words unless asked.`;
  const prompt = `USER QUESTION:
${question}

CONTEXT:
${contextBlocks}`;

  const text = await generateWithProvider(prompt, system);
  const citations = retrieved.filter(r => r.source === 'web').slice(0, 3).map(r => ({ url: r.url, title: r.title }));
  return { answer: text, citations };
}

export function composeEscalationResponse(reason: string) {
  const base = {
    financial_specifics: `Every engagement is unique, so we don't quote pricing here. We focus on outcomes like faster time-to-decision, reduced noise, and improved trust. I can connect you with our team for specifics.`,
    contractual_legal: `Our team can best walk you through contracts, SLAs, and audits. I can connect you with the right person.`,
    technical_integrations: `We integrate with major platforms like AWS, Azure, Snowflake and more. For proprietary systems, I'll bring in an engineer to confirm details.`,
    sensitive_info: `For security, I can't process sensitive information here. Let me connect you with a Camwood specialist to continue safely.`,
    uncertainty: `I don't want to give you an incomplete answer. Let me connect you with a member of our team.`
  } as Record<string, string>;
  const message = base[reason] || base['uncertainty'];
  return {
    answer: message + `

Would you like to: (a) book a 15-min fit check, or (b) leave your email for follow-up?`,
    handoff: { options: ['calendar', 'email'], suggested: 'calendar' }
  };
}