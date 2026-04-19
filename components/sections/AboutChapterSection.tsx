"use client";

import { AppleStaggerChild, AppleStaggerRoot } from "@/components/layout/AppleStagger";
import { ScrollSection } from "@/components/layout/ScrollSection";
import { AboutPortrait } from "@/components/sections/AboutPortrait";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function AboutChapterSection() {
  return (
    <ScrollSection id="about">
      <div className="mx-auto max-w-[1100px] text-left lg:flex lg:min-h-[min(72vh,820px)] lg:flex-col lg:justify-center">
        <AppleStaggerRoot>
          <AppleStaggerChild>
            <SectionEyebrow>About</SectionEyebrow>
          </AppleStaggerChild>
          <AppleStaggerChild>
            <h2 className="mt-4 max-w-3xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium tracking-tight text-white">
              Developer &amp; UX engineer
            </h2>
          </AppleStaggerChild>
          <AppleStaggerChild className="mt-10 lg:mt-12">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-20">
              <AboutPortrait className="mx-auto w-full max-w-[min(100%,300px)] shrink-0 sm:max-w-[340px] lg:mx-0 lg:max-w-[min(42vw,380px)] xl:max-w-[400px]" />

              <div className="min-w-0 w-full max-w-2xl flex-1 space-y-6 text-base leading-relaxed text-[#A1A1A1] md:text-lg lg:max-w-none">
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
          </AppleStaggerChild>
        </AppleStaggerRoot>
      </div>
    </ScrollSection>
  );
}
