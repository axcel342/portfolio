/**
 * The marquee strip. Every figure is stated on the CV — these are scale and
 * scope numbers, not performance claims, because no before/after performance
 * figures exist to quote.
 */
export type Metric = {
  readonly value: string;
  readonly label: string;
};

export const metrics: readonly Metric[] = [
  { value: "600+", label: "documents embedded in Qdrant" },
  { value: "150", label: "concurrent users stress-tested" },
  { value: "75+", label: "active beta users in production" },
  { value: "100+", label: "languages via LaBSE embeddings" },
  { value: "1,000+", label: "page files summarised to 40" },
  { value: "10K", label: "samples fine-tuned with PEFT" },
  { value: "4", label: "live inboxes monitored" },
  { value: "3", label: "companies shipped for since 2024" },
];
