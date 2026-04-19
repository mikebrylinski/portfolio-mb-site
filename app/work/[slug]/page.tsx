import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/case-study/CaseStudyView";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { getCaseStudy, getCaseStudySlugs } from "@/content/case-studies";

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
  return {
    title: `${study.title} — Michael Brylinski`,
    description: study.statement,
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
    <main id="main-content" className="bg-[#000000] text-white">
      <CaseStudyView study={study} nextTitle={nextTitle} />
      <SiteFooter />
    </main>
  );
}
