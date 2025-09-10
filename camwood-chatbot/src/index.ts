import express from "express";
import cors from "cors";
import { cfg } from "./config";
import { loadKnowledge } from "./knowledge";
import { readChunks } from "./store";
import { buildIndexFromChunks } from "./search";
import { composeAnswer, composeEscalationResponse } from "./compose";
import { classifyIntent, checkEscalation, lowConfidence } from "./decision";
import { sendHandoffEmail } from "./mailer";
import type { Chunk } from "./store";
import { chunks } from "./data"; // Fix: Import the populated chunks array from data.ts

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Build the search index from the imported chunks.
const { search } = buildIndexFromChunks(chunks);

if (!search) {
  console.error(
    "Search function is not available. Ensure the index is built correctly."
  );
  process.exit(1);
}

// Health check endpoint.
app.get("/health", (_req, res) =>
  res.json({ ok: true, provider: cfg.provider })
);

// Endpoints for knowledge base and chunks (for debugging).
app.get("/api/knowledge", (_req, res) => res.json(loadKnowledge()));
app.get("/api/chunks", (_req, res) => res.json(readChunks()));

// Main chat endpoint.
app.post("/api/chat", async (req, res) => {
  try {
    const { message, userEmail, userName } = req.body as {
      message: string;
      userEmail?: string;
      userName?: string;
    };
    if (!message) return res.status(400).json({ error: "message is required" });

    // Classify user intent and check for explicit escalation keywords.
    const intent = classifyIntent(message);
    const esc = checkEscalation(message);
    
    // Perform a semantic search on the knowledge base.
    const retrieved = await search(message, 8);
    // Check if the retrieved results are of low confidence.
    const confidenceLow = lowConfidence(retrieved);

    // If either an explicit escalation is detected or confidence is low, handoff.
    if (esc.shouldEscalate || confidenceLow) {
      const reason = esc.reason || "uncertainty";
      const payload = composeEscalationResponse(reason); // The message is now a direct statement.

      try {
        const fallbackFrom =
          /<([^>]+)>/.exec(cfg.smtp.from || "")?.[1] ||
          cfg.smtp.user ||
          "no-reply@camwoodinc.com";
        // Attempt to send the handoff email.
        await sendHandoffEmail({
          fromEmail: userEmail || fallbackFrom,
          name: userName || "Website Chat (Auto)",
          topic: `Escalation: ${reason} | Intent: ${intent}`,
          message: `Original question:
${message}

Confidence low: ${confidenceLow}
Provider: ${cfg.provider}
Timestamp: ${new Date().toISOString()}`,
        });
      } catch (mailErr) {
        console.warn("Auto handoff email failed:", mailErr);
      }

      // Return the handoff message to the user.
      return res.json({
        answer: payload.answer,
        citations: [],
        handoff: payload.handoff,
        meta: {
          intent,
          escalation: { shouldEscalate: true, reason, confidenceLow },
        },
      });
    }

    // If no escalation, compose a standard answer.
    const result = await composeAnswer(message, retrieved);
    res.json({
      ...result,
      meta: { intent, escalation: { shouldEscalate: false } },
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: "server_error", detail: e?.message });
  }
});

// Endpoint for manual handoff from the user.
app.post("/api/handoff", async (req, res) => {
  try {
    const { fromEmail, name, topic, message } = req.body as {
      fromEmail: string;
      name?: string;
      topic?: string;
      message?: string;
    };
    if (!fromEmail || !fromEmail.includes("@"))
      return res.status(400).json({ error: "invalid_email" });

    const ok = await sendHandoffEmail({ fromEmail, name, topic, message });
    if (!ok) return res.status(500).json({ error: "mail_failed" });

    res.json({ ok: true, to: cfg.smtp.to });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: "server_error", detail: e?.message });
  }
});

// Admin endpoint to re-index the knowledge base.
app.post("/api/reindex", async (req, res) => {
  try {
    const token = req.headers["x-admin-token"];
    if (token !== cfg.adminToken)
      return res.status(401).json({ error: "unauthorized" });
    const { spawn } = await import("node:child_process");
    const child = spawn(
      process.execPath,
      ["node_modules/tsx/dist/cli.js", "src/crawl.ts"],
      { stdio: "inherit" }
    );
    child.on("close", (code) => {
      console.log("crawl finished", code);
    });
    res.json({ ok: true, started: true });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: "server_error", detail: e?.message });
  }
});

app.listen(cfg.port, () =>
  console.log(
    `Camwood chatbot backend listening on :${cfg.port} (provider=${cfg.provider})`
  )
);

// Example search to test the index on startup.
const runExampleSearch = async () => {
    const query = "example query";
    const results = await search(query, 5);
    console.log("Search results:", results);
};
runExampleSearch();
