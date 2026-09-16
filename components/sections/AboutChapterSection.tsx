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
              <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
                From the studio
                <span className="mt-1 block text-[#3B8CFF]">to the stack.</span>
              </h2>
            </AppleStaggerChild>
          </AppleStaggerRoot>

          <div className="mt-12 flex flex-col items-center gap-12 lg:mt-14 lg:flex-row lg:items-start lg:gap-14">
            <div className="relative mx-auto w-full max-w-[min(100%,300px)] shrink-0 sm:max-w-[340px] lg:mx-0 lg:sticky lg:top-28 lg:max-w-[min(38vw,360px)]">
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
                I&apos;m a digital product designer and full-stack developer, but
                that path didn&apos;t start in software. I spent years in recording
                studios and on the road — touring internationally with artists and
                production teams, keeping complex shows running when there was no
                rehearsal for failure.
              </p>
              <p>
                Studios and live production taught me to think in systems. People,
                signal flow, timing, and creative work all have to function together.
                If one piece breaks, the whole thing falls apart in front of an
                audience. That pressure shaped how I still work.
              </p>
              <p>
                The same instincts now go into digital products. I care about how
                something feels, how it&apos;s built, and whether it actually holds
                up — design, architecture, and engineering as one thread, not a
                handoff.
              </p>
              <p>
                Today I build SaaS platforms, AI applications, membership products,
                and high-performance web experiences from the first sketch through
                production. I&apos;m most interested in work where technology isn&apos;t
                the end goal. The goal is to build something useful.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}
