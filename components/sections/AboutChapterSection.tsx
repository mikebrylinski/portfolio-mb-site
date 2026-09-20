"use client";

import { AppleStaggerChild, AppleStaggerRoot } from "@/components/layout/AppleStagger";
import { ScrollSection } from "@/components/layout/ScrollSection";
import { AboutPortrait } from "@/components/sections/AboutPortrait";
import {
  AestheticNote,
  FieldLabel,
  FrameCorners,
} from "@/components/ui/FieldNotes";
import { siteContainerClass } from "@/lib/site";

export function AboutChapterSection() {
  return (
    <ScrollSection
      id="about"
      className="relative overflow-hidden border-white/10 bg-[#06101c]"
    >
      <div
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-70"
        aria-hidden
      />

      <div className={`relative z-[1] ${siteContainerClass} text-left`}>
        <div className="relative border border-[#3B8CFF]/25 px-5 py-8 sm:px-7 sm:py-10 md:px-8">
          <FrameCorners />

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <FieldLabel>Ascent — About</FieldLabel>
            <AestheticNote>STUDIO → STACK</AestheticNote>
          </div>

          <AppleStaggerRoot>
            <AppleStaggerChild>
              <h2 className="whitespace-nowrap text-[clamp(1.05rem,4.8vw,3.25rem)] font-bold uppercase leading-none tracking-[-0.03em] text-white">
                From the studio{" "}
                <span className="text-[#3B8CFF]">to the stack.</span>
              </h2>
            </AppleStaggerChild>
          </AppleStaggerRoot>

          <div className="mt-12 flex flex-col items-center gap-12 lg:mt-14 lg:flex-row lg:items-center lg:gap-14">
            <div className="relative mx-auto w-full max-w-[min(100%,300px)] shrink-0 sm:max-w-[340px] lg:mx-0 lg:max-w-[min(38vw,360px)]">
              <div className="relative border border-[#3B8CFF]/30 p-2">
                <FrameCorners size="sm" />
                <AboutPortrait className="w-full" />
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/60">
                  Fig. P — Portrait
                </p>
              </div>
            </div>

            <div className="min-w-0 w-full max-w-2xl flex-1 space-y-5 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px] lg:max-w-none">
              <p>
                Before writing production code, I spent years working in recording
                studios and touring internationally with artists and production
                teams.
              </p>
              <p>
                That experience taught me to troubleshoot complex systems, work
                under pressure, collaborate across disciplines, and keep things
                running when failure isn&apos;t an option.
              </p>
              <p>
                I eventually moved into full-time web development, where I&apos;ve
                spent 15+ years building ecommerce platforms, enterprise systems,
                digital experiences, SaaS products, and AI-powered applications.
              </p>
              <p>
                Today I work across the entire product stack — from UX and
                frontend architecture to APIs, databases, cloud infrastructure,
                and AI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}
