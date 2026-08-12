import type { WorkIndexEntry } from "@/types";

/**
 * The ordered case-study index. Routing, the home page work list, and the
 * previous/next pager all read this, so order is defined once.
 *
 * Ember leads because enterprise scope is the strongest first signal; Halil
 * closes because it is the most narrowly architectural.
 */
export const workIndex: readonly WorkIndexEntry[] = [
  { slug: "ember", title: "Ember — Enterprise AI Agent Platform", year: "2026" },
  { slug: "kimport", title: "Kimport AI Sales Assistant", year: "2025" },
  { slug: "anti-fragility", title: "Anti-Fragility Coach", year: "2025" },
  { slug: "halil", title: "Halil RAG Microservice", year: "2025" },
];
