"use client";

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
              <h2 className="mt-5 text-[clamp(1.75rem,4vw,3rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
                Looking for a senior engineer
                <span className="mt-1 block text-[#3B8CFF]">
                  who can own the whole stack?
                </span>
              </h2>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <p className="mt-6 max-w-md text-base leading-relaxed text-white/75 md:text-lg">
                  I&apos;m currently available for remote full-time W-2 opportunities
                  in Senior Full-Stack Engineering, Product Engineering, and
                  AI-powered application development.
                </p>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="/recruiters"
                    className="inline-flex min-h-[44px] items-center rounded-md border border-[#3B8CFF] bg-[#3B8CFF]/10 px-5 py-2.5 text-sm font-medium uppercase tracking-[0.12em] text-white transition-[background-color] hover:bg-[#3B8CFF]/20"
                  >
                    View resume
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      const el = document.getElementById("contact");
                      if (!el) return;
                      e.preventDefault();
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="inline-flex min-h-[44px] items-center rounded-md border border-[#3B8CFF]/50 px-5 py-2.5 text-sm font-medium uppercase tracking-[0.12em] text-white transition-[background-color] hover:bg-[#3B8CFF]/15"
                  >
                    Contact me
                  </a>
                </div>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-white/50">
                  Select freelance and consulting projects also considered.
                </p>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <AestheticNote className="mt-6">
                  STATUS / OPEN · REMOTE · W-2
                </AestheticNote>
              </AppleStaggerChild>
            </AppleStaggerRoot>
          </div>

          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="relative border border-[#3B8CFF]/30 bg-[#020617]/70 p-5 backdrop-blur-md sm:p-6">
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-white/70">
                Get in touch
              </p>
              <ContactForm variant="compact" idPrefix="summit-" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
