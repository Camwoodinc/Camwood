import type { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT || "You are Camwood assistant. Answer briefly and escalate pricing/PII/legal requests.";

// small helper to build a text prompt from chat messages (used for Ollama)
function buildPrompt(messages: { role: string; content: string }[]) {
  const lines = messages.map(m => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`);
  return `${SYSTEM_PROMPT}\n\n${lines.join("\n")}\n\nAssistant:`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Basic CORS for serverless endpoints (safe for same-origin deployments)
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-chatbot-key");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

    const body = req.body || {};
    const messages: { role: string; content: string }[] = Array.isArray(body.messages) ? body.messages : (body.messages ? [body.messages] : []);
    if (!messages.length) return res.status(400).json({ error: "messages required" });

    // Optional header key check (frontend may omit in same-origin)
    const clientKey = req.headers["x-chatbot-key"] as string | undefined;
    if (process.env.CHATBOT_API_KEY && clientKey !== process.env.CHATBOT_API_KEY) {
      // allow in dev if CHATBOT_API_KEY is not set; otherwise require match
      return res.status(401).json({ error: "unauthorized" });
    }

    const provider = (process.env.PROVIDER || "ollama").toLowerCase();
    const userText = messages.slice(-1)[0]?.content || "";

    // simple escalation detector (same as earlier)
    const escalateTriggers = ["price", "pricing", "cost", "roi", "contract", "sla", "pii", "personal data", "legal"];
    const shouldEscalate = escalateTriggers.some(t => (userText || "").toLowerCase().includes(t));

    if (shouldEscalate) {
      return res.json({ escalation: true, message: process.env.ESCALATION_MESSAGE || "This looks like it needs a human — would you like to connect?", reason: "escalation_triggered" });
    }

    if (provider === "ollama") {
      const host = (process.env.OLLAMA_HOST || "http://localhost:11434").replace(/\/$/, "");
      const model = process.env.OLLAMA_MODEL || "llama2";
      // best-effort single-prompt approach
      const prompt = buildPrompt(messages);
      const r = await fetch(`${host}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, prompt }),
        // note: Vercel runtime has a request timeout — keep it short
      });
      if (!r.ok) {
        const text = await r.text().catch(() => "");
        return res.status(502).json({ error: "upstream_error", details: text });
      }
      // Ollama responses vary — try parse
      const json = await r.json().catch(() => null);
      let assistant = "";
      if (json) {
        if (json?.output && Array.isArray(json.output) && json.output[0]?.content) {
          assistant = Array.isArray(json.output[0].content) ? json.output[0].content.join("") : json.output[0].content;
        } else if (json?.result) assistant = json.result;
        else assistant = JSON.stringify(json);
      } else {
        assistant = await r.text();
      }
      return res.json({ ok: true, response: assistant });
    }

    // fallback to OpenAI provider
    if (provider === "openai") {
      const OPENAI_KEY = process.env.OPENAI_API_KEY;
      if (!OPENAI_KEY) return res.status(500).json({ error: "openai_key_missing" });

      const payload = {
        model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        temperature: Number(process.env.TEMPERATURE || 0.2),
        max_tokens: Number(process.env.MAX_TOKENS || 800),
      };

      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_KEY}` },
        body: JSON.stringify(payload),
      });
      if (!r.ok) {
        const text = await r.text().catch(() => "");
        return res.status(502).json({ error: "upstream_error", details: text });
      }
      const data = await r.json();
      const assistant = data.choices?.[0]?.message?.content || "";
      return res.json({ ok: true, response: assistant });
    }

    return res.status(400).json({ error: "unsupported_provider" });
  } catch (err: any) {
    console.error("generate error:", err?.message || err);
    return res.status(500).json({ error: "internal_error" });
  }
}