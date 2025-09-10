import fetch from 'node-fetch';
import { cfg } from './config';

export async function generateWithProvider(prompt: string, system = ''): Promise<string> {
  if (cfg.provider === 'openai') return generateOpenAI(prompt, system);
  if (cfg.provider === 'ollama') return generateOllama(prompt, system);
  // local: return prompt-constrained extractive summary fallback
  return extractiveFallback(prompt);
}

async function generateOpenAI(prompt: string, system: string): Promise<string> {
  if (!cfg.openaiKey) throw new Error('OPENAI_API_KEY missing');
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${cfg.openaiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: cfg.openaiModel,
      messages: [system ? { role: 'system', content: system } : undefined, { role: 'user', content: prompt }].filter(Boolean),
      temperature: 0.2
    })
  });
  const j = await res.json() as any;
  return j.choices?.[0]?.message?.content || '';
}

async function generateOllama(prompt: string, system: string): Promise<string> {
  const res = await fetch(`${cfg.ollamaHost}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: cfg.ollamaModel,
      prompt: (system ? system + '\n\n' : '') + prompt,
      stream: false
    })
  });
  const j = await res.json() as any;
  return j.response || '';
}

function extractiveFallback(prompt: string): string {
  // Return the last CONTEXT section if present (simple extract)
  const m = /CONTEXT:\n([\s\S]*)$/m.exec(prompt);
  if (!m) return 'I can help with Camwood topics. Ask about services, process, or how to book a consultant.';
  const ctx = m[1].split(/\n---\n/)[0].trim();
  // Keep first 5 lines as the answer
  return ctx.split('\n').slice(0, 5).join('\n');
}