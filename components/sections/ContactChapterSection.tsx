"use client";

import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { AppleStaggerChild, AppleStaggerRoot } from "@/components/layout/AppleStagger";
import { ScrollSection } from "@/components/layout/ScrollSection";
import { ContactRocket } from "@/components/sections/ContactRocket";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function ContactChapterSection() {
  return (
    <ScrollSection id="contact">
      <div className="mx-auto max-w-[1100px] text-left">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-10 lg:items-start">
          {/* Left: intro + rocket */}
          <div className="min-w-0 space-y-10 lg:space-y-12">
            <AppleStaggerRoot>
              <AppleStaggerChild>
                <SectionEyebrow>Contact</SectionEyebrow>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <h2 className="mt-4 text-[clamp(1.85rem,4vw,3rem)] font-medium tracking-tight text-white lg:mt-0">
                  Let&apos;s build something high-performance
                </h2>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <p className="mt-6 text-base leading-relaxed text-[#A1A1A1] md:text-lg lg:mt-0">
                  Share the goal, timeline, and stack. You&apos;ll get a direct, thoughtful
                  response — no funnel, no noise.
                </p>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <p className="mt-5 text-sm leading-relaxed text-[#A1A1A1] md:text-base">
                  Available for hire on{" "}
                  <a
                    href="https://www.upwork.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#39ff88] underline decoration-[#39ff88]/45 underline-offset-4 transition-opacity hover:opacity-85"
                  >
                    Upwork
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.flexjobs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#39ff88] underline decoration-[#39ff88]/45 underline-offset-4 transition-opacity hover:opacity-85"
                  >
                    FlexJobs
                  </a>
                  — contract and freelance engagements welcome.
                </p>
              </AppleStaggerChild>
            </AppleStaggerRoot>

            <div className="flex justify-center lg:justify-start">
              <ContactRocket className="lg:max-w-[320px]" />
            </div>
          </div>

          {/* Right: form */}
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-white/[0.1] bg-black/30 p-5 sm:p-6">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[#39ff88]/90">
                Quick message
              </p>
              <ContactForm variant="compact" />
              <p className="mt-4 text-xs leading-relaxed text-white/45">
                Hourly / hire intent and longer briefs:{" "}
                <Link
                  href="/contact"
                  className="text-[#39ff88] underline decoration-[#39ff88]/40 underline-offset-2 transition-opacity hover:opacity-85"
                >
                  full contact page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}
