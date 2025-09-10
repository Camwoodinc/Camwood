import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

function makeTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  const secure = port === 465;
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    // allow self-signed in dev if explicitly set
    tls: { rejectUnauthorized: process.env.SMTP_TLS_REJECT !== "false" },
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-chatbot-key");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

    const payload = req.body || {};
    const target = process.env.HANDOFF_EMAIL || process.env.SMTP_TO || process.env.SMTP_FROM;
    if (!target) {
      console.warn("Handoff requested but HANDOFF_EMAIL not configured — returning simulated success.");
      return res.json({ ok: true, simulated: true, message: "Handoff would be sent (HANDOFF_EMAIL not configured)" });
    }

    const transport = makeTransport();
    const subject = payload.topic || "Chatbot handoff";
    const text = `${payload.name || "N/A"} <${payload.fromEmail || "noreply@example.com"}>\n\n${payload.message || ""}`;

    if (!transport) {
      console.warn("SMTP not configured — logging handoff and returning success (simulated)");
      console.log("HANDOFF ->", { to: target, subject, text });
      return res.json({ ok: true, simulated: true, message: "SMTP not configured; handoff logged" });
    }

    const info = await transport.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: target,
      subject,
      text,
    });

    console.log("Handoff email sent:", info?.messageId || info);
    return res.json({ ok: true, messageId: info?.messageId });
  } catch (err: any) {
    console.error("handoff error:", err?.message || err);
    return res.status(500).json({ error: "handoff_failed", detail: (err as any)?.message || err });
  }
}