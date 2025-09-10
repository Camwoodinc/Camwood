import BM25 from "wink-bm25-text-search";
import type { Chunk } from "./store";
import { loadKnowledge } from "./knowledge";
import type { Retrieved } from "./types";

// Helpers for text preprocessing
const as = {
  lowerCase: (s: string) => (s ?? "").toLowerCase(),
  removePunc: (s: string) =>
    (s ?? "").replace(/[^\w\s]|_/g, " ").replace(/\s+/g, " "),
  removeDigits: (s: string) => (s ?? "").replace(/\d+/g, ""),
  removeStopWords: (s: string) => {
    const stop = new Set([
      "the",
      "is",
      "a",
      "an",
      "and",
      "or",
      "of",
      "to",
      "in",
      "for",
      "on",
      "with",
      "as",
      "by",
      "that",
      "this",
      "these",
      "those",
      "it",
      "be",
      "are",
      "was",
      "were",
      "have",
      "has",
      "had",
    ]);
    return (s ?? "")
      .split(/\s+/)
      .filter((w) => !!w && !stop.has(w.toLowerCase()))
      .join(" ");
  },
  collapseWhitespace: (s: string) => (s ?? "").replace(/\s+/g, " ").trim(),
};

export function buildSearchIndex(chunks: Chunk[]) {
  const kp = loadKnowledge();

  const index = BM25();
  index.defineConfig({
    fldWeights: {
      body: 1,
    },
  });

  index.definePrepTasks([
    as.lowerCase,
    as.removePunc,
    as.removeDigits,
    as.removeStopWords,
    as.collapseWhitespace,
  ]);

  console.log("Knowledge pack loaded:", {
    hasCore: !!kp.core_identity,
    hasPillars: Array.isArray(kp.brand_pillars),
    hasUseCases: Array.isArray(kp.use_cases),
    hasDifferentiators: Array.isArray(kp.differentiators),
    hasFaq: Array.isArray(kp.faq),
  });

  let idCounter = 0;
  const map: Record<string, Retrieved> = {};

  const knowledgeDocs: {
    id: string;
    content: string;
    meta: Omit<Retrieved, "score">;
  }[] = [];

  if (
    kp.core_identity &&
    kp.core_identity.positioning &&
    kp.core_identity.edge
  ) {
    knowledgeDocs.push({
      id: `k-core-${++idCounter}`,
      content: kp.core_identity.positioning + " " + kp.core_identity.edge,
      meta: {
        id: `k-core-${idCounter}`,
        source: "knowledge",
        content: kp.core_identity.positioning + " " + kp.core_identity.edge,
      },
    });
  }

  if (Array.isArray(kp.brand_pillars)) {
    for (const p of kp.brand_pillars) {
      if (p && typeof p === "string" && p.trim()) {
        const kid = `k-pillar-${++idCounter}`;
        knowledgeDocs.push({
          id: kid,
          content: p.trim(),
          meta: { id: kid, source: "knowledge", content: p.trim() },
        });
      }
    }
  }

  if (Array.isArray(kp.use_cases)) {
    for (const u of kp.use_cases) {
      if (u && typeof u === "string" && u.trim()) {
        const kid = `k-use-${++idCounter}`;
        knowledgeDocs.push({
          id: kid,
          content: u.trim(),
          meta: { id: kid, source: "knowledge", content: u.trim() },
        });
      }
    }
  }

  if (Array.isArray(kp.differentiators)) {
    for (const d of kp.differentiators) {
      if (d && typeof d === "string" && d.trim()) {
        const kid = `k-diff-${++idCounter}`;
        knowledgeDocs.push({
          id: kid,
          content: d.trim(),
          meta: { id: kid, source: "knowledge", content: d.trim() },
        });
      }
    }
  }

  if (Array.isArray(kp.faq)) {
    for (const f of kp.faq) {
      if (
        f &&
        f.q &&
        f.a &&
        typeof f.q === "string" &&
        typeof f.a === "string"
      ) {
        const kid = `k-faq-${++idCounter}`;
        knowledgeDocs.push({
          id: kid,
          content: f.q.trim() + " " + f.a.trim(),
          meta: { id: kid, source: "knowledge", content: f.a.trim() },
        });
      }
    }
  }

  const webDocs: { id: string; content: string }[] = [];
  for (const c of chunks) {
    if (!c.id || typeof c.id !== "string" || !c.id.trim()) {
      console.error("Skipping chunk because its id is missing or invalid:", c);
      continue;
    }

    if (!c.content || typeof c.content !== "string" || !c.content.trim()) {
      console.error(
        "Skipping chunk because content is missing or invalid:",
        c.id
      );
      continue;
    }

    const wid = `w-${c.id}`;
    webDocs.push({ id: wid, content: c.content });
    map[wid] = {
      id: wid,
      source: "web",
      url: c.url || "",
      title: c.title || "",
      content: c.content,
      score: 0,
    };
  }

  const allDocuments = [...knowledgeDocs, ...webDocs];
  console.log(`Number of documents to index: ${allDocuments.length}`);

  const uniqueByIdMap = new Map<string, { id: string; content: string }>();
  for (const d of allDocuments) {
    if (!uniqueByIdMap.has(d.id)) uniqueByIdMap.set(d.id, d);
    else console.warn(`Removed duplicate before indexing: ${d.id}`);
  }
  const uniqueDocuments = Array.from(uniqueByIdMap.values());
  console.log(`Number of unique documents to index: ${uniqueDocuments.length}`);

  let addedDocCount = 0;
  uniqueDocuments.forEach((doc) => {
    if (!doc.id) {
      console.error("Document is missing an id:", doc);
      return;
    }

    try {
      index.addDoc({ id: doc.id, body: doc.content });
      addedDocCount++;
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes("Duplicate document encountered")) {
        console.warn(`Duplicate document skipped: ${doc.id}`);
      } else {
        console.error("Error adding document to index:", error);
      }
    }
  });

  let isConsolidated = false;
  if (addedDocCount > 1) {
    try {
      index.consolidate();
      isConsolidated = true;
    } catch (err: any) {
      console.error("Failed to consolidate index:", err?.message || err);
    }
  } else {
    console.warn(
      "Skipping consolidation: Not enough documents were added to the collection."
    );
  }

  async function search(q: string, k = 8): Promise<Retrieved[]> {
    if (!q || typeof q !== "string" || !q.trim()) return [];

    const processedQuery = as.collapseWhitespace(
      as.removeStopWords(as.removeDigits(as.removePunc(as.lowerCase(q))))
    );

    if (isConsolidated) {
      try {
        const hits = index.search(processedQuery).slice(0, k);
        const results = hits.map((h: any) => ({ ...map[h[0]], score: h[1] }));
        if (results.length > 0) {
            return results;
        }
      } catch (err: any) {
        console.error("BM25 search failed:", err?.message || err);
      }
    } else {
      console.warn("Index not consolidated: using fallback linear search.");
    }

    const escapeRegExp = (s: string) =>
      s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const terms = processedQuery.split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];
    
    const scored = Object.values(map)
      .map((d) => {
        const text = (d.content || "").toLowerCase();
        let score = 0;
        for (const t of terms) {
          const re = new RegExp("\\b" + escapeRegExp(t) + "\\b", "g");
          const m = text.match(re);
          if (m) score += m.length;
          else if (text.includes(t)) score += 0.5;
        }
        return { doc: d, score };
      })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, k)
      .map((s) => ({ ...s.doc, score: s.score }));

    return scored;
  }

  return { search };
}

export const buildIndexFromChunks = buildSearchIndex;