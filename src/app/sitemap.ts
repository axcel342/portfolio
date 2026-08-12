import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { CASE_STUDY_SLUGS } from "@/types";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.siteUrl, changeFrequency: "monthly", priority: 1 },
    ...CASE_STUDY_SLUGS.map((slug) => ({
      url: `${profile.siteUrl}/work/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
