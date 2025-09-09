import fs from 'node:fs';
import path from 'node:path';

export type KnowledgePack = ReturnType<typeof loadKnowledge>;

export function loadKnowledge() {
  const p = path.join(process.cwd(), 'data', 'camwood_knowledge_pack.json');
  const raw = fs.readFileSync(p, 'utf8');
  const kp = JSON.parse(raw);
  return kp;
}

export function faqAnswer(kp: any, q: string): string | null {
  const lq = q.toLowerCase();
  // Mission/vision/values/direct identity hooks first
  if (/(mission|vision|values|who is camwood|what is camwood)/.test(lq)) {
    const c = kp.core_identity;
    return `Camwood Inc. — ${c.positioning}\n\nPhilosophy: ${c.philosophy}\nEdge: ${c.edge}`;
  }
  // FAQ match by simple similarity (substring heuristic)
  let best: { a: string; score: number } | null = null;
  for (const item of kp.faq as Array<{ q: string; a: string }>) {
    const score = jaccard(lq, item.q.toLowerCase());
    if (!best || score > best.score) best = { a: item.a, score };
  }
  return best && best.score > 0.25 ? best.a : null;
}

function jaccard(a: string, b: string): number {
  const A = new Set(a.split(/[^a-z0-9]+/g).filter(Boolean));
  const B = new Set(b.split(/[^a-z0-9]+/g).filter(Boolean));
  const inter = [...A].filter(x => B.has(x)).length;
  const union = new Set([...A, ...B]).size || 1;
  return inter / union;
}