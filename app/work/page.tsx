import type { Metadata } from "next";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { WorkProjectRow } from "@/components/sections/WorkProjectRow";
import { AestheticNote, FieldLabel, FrameCorners } from "@/components/ui/FieldNotes";
import { caseStudies } from "@/content/case-studies";
import { absoluteUrl, siteConfig, siteContainerClass } from "@/lib/site";

const title = "Selected Projects";
const description =
  "Products designed, architected, and shipped by Michael Brylinski — full-stack SaaS, AI-powered applications, and production web experiences.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: {
    title: `${title} — ${siteConfig.name}`,
    description,
    url: absoluteUrl("/work"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${siteConfig.name}`,
    description,
  },
};

export default function WorkIndexPage() {
  return (
    <main id="main-content" className="relative overflow-hidden bg-[#020617] text-white">
      <div
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-40"
        aria-hidden
      />
      <div className={`relative z-[1] ${siteContainerClass} pb-20 pt-24 md:pb-28 md:pt-28`}>
        <div className="relative border border-[#3B8CFF]/25 px-5 py-8 sm:px-7 sm:py-10 md:px-8">
          <FrameCorners />
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <FieldLabel>Sheet A — Selected projects</FieldLabel>
            <AestheticNote>SCALE 1 : 1 · END TO END</AestheticNote>
          </div>
          <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
            Selected projects
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
            Products I&apos;ve designed, architected, and shipped.
          </p>
        </div>

        <ul className="mt-10 grid list-none grid-cols-1 gap-6 p-0 md:mt-12">
          {caseStudies.map((project, index) => (
            <WorkProjectRow
              key={project.slug}
              project={project}
              reverse={index === 1}
            />
          ))}
        </ul>
      </div>
      <SiteFooter />
    </main>
  );
}
