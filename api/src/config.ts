import 'dotenv/config';
export const cfg = {
  port: parseInt(process.env.PORT || '8787', 10),
  baseDomain: process.env.BASE_DOMAIN || 'https://camwoodinc.com',
  crawlPaths: (process.env.CRAWL_PATHS || '/,/about,/services,/contact').split(',').map(s => s.trim()),
  provider: (process.env.PROVIDER || 'local') as 'local' | 'openai' | 'ollama',
  openaiKey: process.env.OPENAI_API_KEY || '',
  openaiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  ollamaHost: process.env.OLLAMA_HOST || 'http://localhost:11434',
  ollamaModel: process.env.OLLAMA_MODEL || 'llama3',
  adminToken: process.env.ADMIN_REINDEX_TOKEN || 'change-this-long-secret',
  handoffEmail: process.env.HANDOFF_EMAIL || 'hello@camwoodinc.com',
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'Camwood Bot <no-reply@camwoodinc.com>',
    to: process.env.SMTP_TO || process.env.HANDOFF_EMAIL || 'hello@camwoodinc.com'
  }
};