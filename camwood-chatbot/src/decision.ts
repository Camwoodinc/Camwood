import type { Retrieved } from './types';
import { loadKnowledge } from './knowledge';

const ESCALATION_PATTERNS = [
  { reason: 'financial_specifics', pattern: /(pricing|price|cost|quote|budget|roi|return on investment|how much)/i },
  { reason: 'contractual_legal', pattern: /(contract|sla|legal|terms|agreement|audit|compliance)/i },
  { reason: 'technical_integrations', pattern: /(technical|integration|api|proprietary|custom build|platform)/i },
  { reason: 'sensitive_info', pattern: /(my credit card|social security|ssn|my bank account|password|login|personal info|address)/i }
];

export function checkEscalation(q: string) {
  const lq = q.toLowerCase();
  for (const pattern of ESCALATION_PATTERNS) {
    if (pattern.pattern.test(lq)) {
      return { shouldEscalate: true, reason: pattern.reason };
    }
  }
  return { shouldEscalate: false, reason: null };
}

export function lowConfidence(retrieved: Retrieved[]) {
  // If the search returned no results from the knowledge base, it's a low-confidence response
  if (retrieved.length === 0) {
    return true;
  }

  // Check if the top result's score is below a certain threshold
  const topScore = retrieved[0].score;
  const isLowScore = topScore < 0.25;

  return isLowScore;
}

export function classifyIntent(q: string) {
  const lq = q.toLowerCase();
  const kp = loadKnowledge();
  const faqQs = kp.faq.map((f: any) => f.q.toLowerCase());
  const useCases = kp.use_cases.map((u: string) => u.toLowerCase());
  const brandPillars = kp.brand_pillars.map((p: string) => p.toLowerCase());

  if (faqQs.some((f: string) => lq.includes(f))) return 'faq';
  if (useCases.some((u: string) => lq.includes(u.split('—')[0].trim()))) return 'use_case';
  if (brandPillars.some((p: string) => lq.includes(p.split('—')[0].trim()))) return 'brand_pillar';
  if (/(contact|email|reach out|get in touch|call)/.test(lq)) return 'contact';
  if (/(hello|hi|hey|greetings|how are you|what can you do)/.test(lq)) return 'greeting';
  if (/(thanks|thank you|cheers)/.test(lq)) return 'gratitude';
  if (checkEscalation(q).shouldEscalate) return 'escalation';

  return 'unclassified';
}