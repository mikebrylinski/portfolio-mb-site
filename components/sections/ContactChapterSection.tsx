"use client";

import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { AppleStaggerChild, AppleStaggerRoot } from "@/components/layout/AppleStagger";
import { MountainBackdrop } from "@/components/sections/MountainBackdrop";
import { AestheticNote, FieldLabel } from "@/components/ui/FieldNotes";
import { siteContainerClass } from "@/lib/site";

export function ContactChapterSection() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/10 bg-[#020617] py-[120px] md:py-[160px] lg:py-[180px]"
    >
      <MountainBackdrop intensity="section" />

      <div className={`relative z-10 ${siteContainerClass} text-left`}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-x-16 lg:gap-y-10">
          <div className="min-w-0">
            <AppleStaggerRoot>
              <AppleStaggerChild>
                <FieldLabel>Summit — Contact</FieldLabel>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
                  Have an idea
                  <span className="mt-1 block text-[#3B8CFF]">worth building?</span>
                </h2>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <p className="mt-6 max-w-md text-base leading-relaxed text-white/75 md:text-lg">
                  Let&apos;s turn it into something real.
                </p>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <Link
                  href="/#work"
                  className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#3B8CFF] transition-opacity hover:opacity-80"
                >
                  View the Work →
                </Link>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-white/50">
                  Available for select freelance and product engagements.
                </p>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <AestheticNote className="mt-6">
                  STATUS / PRODUCTION · BUILD / 001
                </AestheticNote>
              </AppleStaggerChild>
            </AppleStaggerRoot>
          </div>

          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="relative border border-[#3B8CFF]/30 bg-[#020617]/70 p-5 backdrop-blur-md sm:p-6">
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-white/70">
                Start a project
              </p>
              <ContactForm variant="compact" />
              <p className="mt-5 text-xs leading-relaxed text-white/45">
                Longer briefs:{" "}
                <Link
                  href="/contact"
                  className="text-[#3B8CFF] underline decoration-[#3B8CFF]/40 underline-offset-2 transition-opacity hover:opacity-85"
                >
                  full contact page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
