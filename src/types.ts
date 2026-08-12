import type { ComponentType, ReactElement, ReactNode } from "react";

export const CASE_STUDY_SLUGS = ["ember", "kimport", "anti-fragility", "halil"] as const;

export type CaseStudySlug = (typeof CASE_STUDY_SLUGS)[number];

export type MetaEntry = {
  readonly label: string;
  readonly value: string;
};

/**
 * A case study is a typed object, so a page missing its `decision` section
 * fails to compile rather than shipping a hole.
 */
export type CaseStudy = {
  readonly slug: CaseStudySlug;
  readonly title: string;
  readonly year: string;
  /** One sentence stating the problem the way a person would say it. */
  readonly dek: string;
  /** One-line summary used for page metadata and social cards. */
  readonly description: string;
  readonly meta: readonly MetaEntry[];
  readonly Diagram: ComponentType;
  readonly diagramCaption: string;
  readonly problem: ReactNode;
  readonly decision: ReactNode;
  readonly outcome: ReactNode;
  /** Footnote rail bound to this page's declared sources. */
  readonly Rail: () => ReactElement | null;
};

export type WorkIndexEntry = {
  readonly slug: CaseStudySlug;
  readonly title: string;
  readonly year: string;
};

export type CompactItem = {
  readonly title: string;
  readonly when: string;
  readonly detail: string;
  readonly stack?: string;
};

export type Role = {
  readonly company: string;
  readonly role: string;
  readonly when: string;
  readonly detail: string;
  readonly stack: string;
};
