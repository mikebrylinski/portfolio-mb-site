"use client";

import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { AppleStaggerChild, AppleStaggerRoot } from "@/components/layout/AppleStagger";
import { MountainBackdrop } from "@/components/sections/MountainBackdrop";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
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
                <SectionEyebrow>Contact</SectionEyebrow>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
                  Let&apos;s build
                  <span className="mt-1 block text-[#3B8CFF]">something real</span>
                </h2>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <p className="mt-6 max-w-md text-base leading-relaxed text-white/75 md:text-lg">
                  Share the goal, timeline, and stack. You&apos;ll get a direct,
                  thoughtful response — no funnel, no noise.
                </p>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
                  Available for hire on{" "}
                  <a
                    href="https://www.upwork.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3B8CFF] underline decoration-[#3B8CFF]/40 underline-offset-4 transition-opacity hover:opacity-85"
                  >
                    Upwork
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.flexjobs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3B8CFF] underline decoration-[#3B8CFF]/40 underline-offset-4 transition-opacity hover:opacity-85"
                  >
                    FlexJobs
                  </a>
                  — contract and freelance welcome.
                </p>
              </AppleStaggerChild>
            </AppleStaggerRoot>
          </div>

          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-white/10 bg-[#020617]/70 p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-6">
              <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.24em] text-white/70">
                Quick message
              </p>
              <ContactForm variant="compact" />
              <p className="mt-5 text-xs leading-relaxed text-white/45">
                Hourly / hire intent and longer briefs:{" "}
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
