import { ScrollSection } from "@/components/layout/ScrollSection";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function AboutChapterSection() {
  return (
    <ScrollSection id="about">
      <div className="mx-auto max-w-[1100px] text-left">
        <SectionEyebrow>About</SectionEyebrow>
        <h2 className="mt-4 max-w-3xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium tracking-tight text-white">
          Developer &amp; UX engineer
        </h2>
        <div className="mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-[#A1A1A1] md:text-lg">
          <p>
            I build high-performance, SEO-aware systems for teams that care about
            speed, clarity, and long-term maintainability — from eCommerce and
            marketing sites to cloud-backed applications and AI-enabled workflows.
          </p>
          <p>
            My background spans touring audio engineering for high-stakes live
            environments and years shipping web products end-to-end. That mix
            shows up as taste under constraints: calm interfaces, disciplined
            architecture, and launches that hold up after day one.
          </p>
        </div>
      </div>
    </ScrollSection>
  );
}
