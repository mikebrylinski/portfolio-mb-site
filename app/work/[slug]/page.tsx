import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/case-study/CaseStudyView";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { getCaseStudy, getCaseStudySlugs } from "@/content/case-studies";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Work" };

  const title = `${study.title} — Case Study`;
  const description = study.seoDescription;
  const ogImage = study.visualSrc.endsWith(".svg")
    ? "/og-default.png"
    : study.visualSrc;
  const url = absoluteUrl(`/work/${study.slug}`);

  return {
    title,
    description,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: `${title} — ${siteConfig.name}`,
      description,
      url,
      type: "article",
      images: [
        {
          url: ogImage,
          alt: study.visualAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const nextTitle = study.nextSlug
    ? getCaseStudy(study.nextSlug)?.title
    : undefined;

  return (
    <main id="main-content" className="bg-[#06101c] text-white">
      <CaseStudyView study={study} nextTitle={nextTitle} />
      <SiteFooter />
    </main>
  );
}
