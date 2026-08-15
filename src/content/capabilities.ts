import type { Capability } from "@/types";

/**
 * Three problems solved, each closed by one piece of evidence from the CV.
 * Written for someone deciding whether to hire, so the framing is what they
 * get rather than what was used to build it.
 */
export const capabilities: readonly Capability[] = [
  {
    title: "Retrieval that stays grounded",
    body: "Hybrid keyword and vector search, multilingual, with layout-aware ingestion for the documents you actually have — PDFs full of tables, slide decks, text in unpredictable encodings.",
    proof: "600+ docs indexed · 100+ languages",
  },
  {
    title: "Agents that act without going rogue",
    body: "Orchestration, tool use, and an approval boundary so nothing executes unreviewed. Built on a governed enterprise agent platform handling sensitive data.",
    proof: "SOC 2 & HIPAA readiness work",
  },
  {
    title: "Proof that it works",
    body: "Eval pipelines scoring what the system actually did — was the draft sent, was the task correct — so quality becomes a number you can act on instead of an opinion.",
    proof: "Measured with 75+ live users",
  },
];
