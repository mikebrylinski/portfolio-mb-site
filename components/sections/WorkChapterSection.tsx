import Link from "next/link";
import { ScrollSection } from "@/components/layout/ScrollSection";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { caseStudies } from "@/content/case-studies";
import { WorkProjectRow } from "@/components/sections/WorkProjectRow";

export function WorkChapterSection() {
  return (
    <ScrollSection id="work">
      <div className="mx-auto max-w-[1100px] text-left">
        <SectionEyebrow>Work</SectionEyebrow>
        <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium tracking-tight text-white">
          Outcomes, not assets
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#A1A1A1] md:text-lg">
          Each engagement is measured by clarity, speed, and conversion — the
          interface is simply where it becomes visible.
        </p>

        <ul className="mt-16 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 lg:gap-8">
          {caseStudies.map((project) => (
            <WorkProjectRow key={project.slug} project={project} />
          ))}
        </ul>

        <div className="mt-14">
          <Link
            href="/work"
            className="text-sm text-[#39ff88] underline-offset-4 transition-opacity hover:opacity-80"
          >
            Browse the full work index
          </Link>
        </div>
      </div>
    </ScrollSection>
  );
}
