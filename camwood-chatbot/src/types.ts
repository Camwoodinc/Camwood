export type Provider = 'local' | 'openai' | 'ollama';
export type Message = { role: 'user' | 'assistant' | 'system'; content: string };
export type Retrieved = { id: string; source: 'knowledge' | 'web'; url?: string; title?: string; content: string; score: number };