import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { WorkProjectRow } from "@/components/sections/WorkProjectRow";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { caseStudies } from "@/content/case-studies";
import { absoluteUrl } from "@/lib/site";

const title = "Work";
const description =
  "Selected case studies and outcomes across product, UX, full-stack engineering, and AI-powered SaaS.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: {
    title: `${title} — Mike Brylinski`,
    description,
    url: absoluteUrl("/work"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — Mike Brylinski`,
    description,
  },
};

export default function WorkIndexPage() {
  return (
    <main id="main-content" className="bg-[#000000] text-white">
      <SiteLayout as="div">
        <header className="border-b border-[#3B8CFF]/12 pb-16 pt-24 md:pb-20 md:pt-32">
          <SectionEyebrow>Work</SectionEyebrow>
          <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4.6vw,3.25rem)] font-medium tracking-tight">
            Selected projects
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#A1A1A1] md:text-lg">
            Case studies in a three-column grid — tap a card for the full story.
          </p>
        </header>

        <ul className="mt-12 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {caseStudies.map((project) => (
            <WorkProjectRow key={project.slug} project={project} />
          ))}
        </ul>
      </SiteLayout>
      <SiteFooter />
    </main>
  );
}
