import Link from "next/link";
import { ScrollSection } from "@/components/layout/ScrollSection";
import { ContactRocket } from "@/components/sections/ContactRocket";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function ContactChapterSection() {
  return (
    <ScrollSection id="contact">
      <div className="mx-auto max-w-[1100px] text-left">
        <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="min-w-0 max-w-2xl flex-1">
            <SectionEyebrow>Contact</SectionEyebrow>
            <h2 className="mt-4 text-[clamp(1.85rem,4vw,3rem)] font-medium tracking-tight text-white">
              Let&apos;s build something high-performance
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#A1A1A1] md:text-lg">
              Share the goal, timeline, and stack. You&apos;ll get a direct, thoughtful
              response — no funnel, no noise.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] min-w-[220px] items-center justify-center rounded-full bg-[#39ff88] px-8 py-3 text-sm font-semibold text-[#050505] transition-opacity duration-300 hover:opacity-90"
              >
                Start a conversation
              </Link>
            </div>
          </div>

          <ContactRocket className="lg:mt-4" />
        </div>
      </div>
    </ScrollSection>
  );
}
