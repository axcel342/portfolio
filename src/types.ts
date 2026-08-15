import type { ComponentType, ReactElement, ReactNode } from "react";
import type { MarkName } from "@/components/logos";

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
  /** Short domain label shown as the card eyebrow. */
  readonly domain: string;
  /** Two-sentence card summary. */
  readonly summary: string;
  /**
   * Headline figures, all CV-sourced. Omitted where a project has no honest
   * numbers — a stat row of words reads as padding.
   */
  readonly stats?: readonly { readonly value: string; readonly label: string }[];
  readonly stack: readonly string[];
};

/**
 * A logo is either an inline mark drawn in components/logos.tsx or an image file
 * dropped in public/logos. `id` exists so tests and debugging can identify a
 * tile without relying on the image filename.
 */
export type Logo =
  | {
      readonly kind: "image";
      readonly id: string;
      readonly src: string;
      readonly width: number;
      readonly height: number;
    }
  | { readonly kind: "mark"; readonly id: string; readonly mark: MarkName };

export type CompactItem = {
  readonly title: string;
  readonly when: string;
  readonly detail: string;
  readonly stack?: readonly string[];
  readonly logo?: Logo;
  /** Where the credential can be verified, when there is one. */
  readonly href?: string;
};

/** One cell of the hiring strip under the call to action. */
export type Fact = {
  readonly label: string;
  readonly value: string;
  readonly detail?: string;
  readonly href?: string;
  /** Availability gets the accent, because it is the cell that decides contact. */
  readonly live?: boolean;
};

export type Capability = {
  readonly title: string;
  readonly body: string;
  readonly proof: string;
};

export type Role = {
  readonly company: string;
  readonly role: string;
  readonly when: string;
  readonly where: string;
  readonly summary: string;
  readonly bullets: readonly string[];
  readonly stack: readonly string[];
};

export type NavSection = {
  readonly id: string;
  readonly label: string;
};
