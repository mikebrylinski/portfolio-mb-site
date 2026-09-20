import type { MetadataRoute } from "next";
import { getCaseStudySlugs } from "@/content/case-studies";
import { getSeoPageSlugs } from "@/content/seo-pages";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const caseStudies = getCaseStudySlugs().map((slug) => ({
    url: absoluteUrl(`/work/${slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const seoPages = getSeoPageSlugs().map((slug) => ({
    url: absoluteUrl(`/${slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/work"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/recruiters"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...seoPages,
    ...caseStudies,
  ];
}
