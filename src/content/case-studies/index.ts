import type { CaseStudy, CaseStudySlug } from "@/types";
import { antiFragility } from "./anti-fragility";
import { ember } from "./ember";
import { halil } from "./halil";
import { kimport } from "./kimport";

/** Every slug in the union must have a page, enforced by the Record type. */
export const caseStudies: Record<CaseStudySlug, CaseStudy> = {
  ember,
  kimport,
  "anti-fragility": antiFragility,
  halil,
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return Object.hasOwn(caseStudies, slug) ? caseStudies[slug as CaseStudySlug] : undefined;
}
