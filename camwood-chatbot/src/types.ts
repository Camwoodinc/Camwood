export type Provider = 'local' | 'openai' | 'ollama';
export type Message = { role: 'user' | 'assistant' | 'system'; content: string };
// Fix: Add 'llm' to the list of valid source types
export type Retrieved = { id: string; source: 'knowledge' | 'web' | 'llm'; url?: string; title?: string; content: string; score: number };