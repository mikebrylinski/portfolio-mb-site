"use client";

import { AppleStaggerChild, AppleStaggerRoot } from "@/components/layout/AppleStagger";
import { ScrollSection } from "@/components/layout/ScrollSection";
import { AestheticNote, FieldLabel, FrameCorners } from "@/components/ui/FieldNotes";
import { experience } from "@/content/experience";
import { siteContainerClass } from "@/lib/site";

export function ExperienceChapterSection() {
  return (
    <ScrollSection
      id="experience"
      className="relative overflow-hidden border-white/10 bg-[#06101c]"
    >
      <div
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-50"
        aria-hidden
      />

      <div className={`relative z-[1] ${siteContainerClass} text-left`}>
        <div className="relative border border-[#3B8CFF]/25 px-5 py-8 sm:px-7 sm:py-10 md:px-8">
          <FrameCorners />

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <FieldLabel>Survey — Engineering experience</FieldLabel>
            <AestheticNote>TIMELINE · 15+ YR</AestheticNote>
          </div>

          <AppleStaggerRoot>
            <AppleStaggerChild>
              <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
                Engineering experience
              </h2>
            </AppleStaggerChild>
            <AppleStaggerChild>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
                15+ years building websites, applications, ecommerce platforms,
                enterprise systems, and digital products.
              </p>
            </AppleStaggerChild>
          </AppleStaggerRoot>

          <ol className="relative mt-10 space-y-0 border-l border-[#3B8CFF]/30 pl-6 sm:pl-8">
            {experience.map((item, i) => (
              <li key={item.company} className="relative pb-10 last:pb-0">
                <span
                  className="absolute -left-[calc(1.5rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border border-[#3B8CFF] bg-[#06101c] sm:-left-[calc(2rem+5px)]"
                  aria-hidden
                />
                <article className="relative border border-[#3B8CFF]/20 bg-[#020617]/40 p-4 sm:p-5">
                  <FrameCorners size="sm" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    {item.dates ? (
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#3B8CFF]/70">
                        {item.dates}
                      </p>
                    ) : null}
                  </div>
                  <h3 className="mt-3 text-lg font-medium uppercase tracking-tight text-white md:text-xl">
                    {item.company}
                  </h3>
                  <p className="mt-1 text-sm text-white/75">{item.role}</p>
                  {item.note ? (
                    <p className="mt-3 text-sm leading-relaxed text-[#9cb6d4]">
                      {item.note}
                    </p>
                  ) : null}
                  {item.focus.length > 0 ? (
                    <ul
                      className="mt-4 flex flex-wrap gap-1.5"
                      aria-label={`${item.company} focus`}
                    >
                      {item.focus.map((chip) => (
                        <li key={chip}>
                          <span className="inline-flex border border-[#3B8CFF]/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#9cb6d4]">
                            {chip}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </ScrollSection>
  );
}
