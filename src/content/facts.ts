import type { Fact } from "@/types";

/**
 * The strip directly under the call to action. At that point the reader is
 * deciding whether to write to you, so these answer the screening questions in
 * the order they get asked — availability and time zone first, because neither
 * is a number and both outrank every number on the page.
 */
export const facts: readonly Fact[] = [
  {
    label: "Available",
    value: "Full-time or freelance",
    detail: "Starting now",
    live: true,
  },
  {
    label: "Based",
    value: "Lahore, PK",
    detail: "UTC+5 · remote",
  },
  {
    label: "Experience",
    value: "2 years",
    detail: "Shipping production AI",
  },
  {
    label: "Builds",
    value: "RAG · agents · evals",
    detail: "Python & TypeScript",
  },
  {
    label: "Clouds",
    value: "AWS · GCP · Azure",
    detail: "All three, in production",
  },
  {
    label: "Certified",
    value: "Azure AI Engineer",
    detail: "AI-102",
    href: "https://learn.microsoft.com/api/credentials/share/en-us/MominImranQureshi-0804/9415DFC214F7DEBC",
  },
];
