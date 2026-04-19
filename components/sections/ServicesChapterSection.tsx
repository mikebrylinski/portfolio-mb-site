"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { AppleStaggerChild, AppleStaggerRoot } from "@/components/layout/AppleStagger";
import { ScrollSection } from "@/components/layout/ScrollSection";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { serviceColumns } from "@/content/services";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ServicesChapterSection() {
  const reduce = useReducedMotion();

  const gridVariants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: { staggerChildren: reduce ? 0 : 0.1 },
      },
    }),
    [reduce],
  );

  const colVariants = useMemo(
    () => ({
      hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduce ? 0 : 0.95, ease },
      },
    }),
    [reduce],
  );

  return (
    <ScrollSection id="services" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-[min(520px,80vw)] w-[min(520px,80vw)] rounded-full bg-[#39ff88]/[0.06] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-[#39ff88]/[0.04] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1100px] text-left">
        <AppleStaggerRoot>
          <AppleStaggerChild>
            <SectionEyebrow>Services</SectionEyebrow>
          </AppleStaggerChild>
          <AppleStaggerChild>
            <h2 className="mt-4 max-w-3xl text-[clamp(1.85rem,3.8vw,2.85rem)] font-medium tracking-tight text-white">
              Stack depth. Solo-operator focus. Zero fluff.
            </h2>
          </AppleStaggerChild>
          <AppleStaggerChild>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#A1A1A1] md:text-lg">
              From UX strategy through deployment, one coherent thread — fewer handoffs,
              fewer regressions, and velocity you can feel in the codebase.
            </p>
          </AppleStaggerChild>
        </AppleStaggerRoot>

        <motion.div
          className="mt-14 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-[#39ff88]/15"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px", amount: 0.08 }}
        >
          {serviceColumns.map((col, ci) => (
            <motion.div
              key={col.id}
              variants={colVariants}
              className={`flex min-w-0 flex-col lg:px-6 xl:px-8 ${ci === 0 ? "lg:pl-0" : ""} ${ci === serviceColumns.length - 1 ? "lg:pr-0" : ""}`}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#39ff88]/90">
                {col.kicker}
              </p>
              <h3 className="mt-2 text-lg font-medium leading-snug text-white md:text-xl">
                {col.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#A1A1A1] md:text-[15px]">
                {col.intro}
              </p>

              <div className="mt-10 flex flex-col gap-10">
                {col.services.map((s) => (
                  <article
                    key={s.title}
                    className="group border-t border-white/[0.08] pt-8 first:border-t-0 first:pt-0"
                  >
                    <h4 className="text-[15px] font-medium leading-snug text-white md:text-base">
                      {s.title}
                    </h4>
                    <p className="mt-2 text-sm leading-snug text-[#39ff88]/90 md:text-[15px]">
                      {s.hook}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#A1A1A1] md:text-[15px]">
                      {s.body}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Keywords">
                      {s.keywords.map((kw) => (
                        <li key={kw}>
                          <span className="inline-flex rounded border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[11px] font-medium text-white/65 transition-colors duration-300 group-hover:border-[#39ff88]/25 group-hover:text-white/85">
                            {kw}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ScrollSection>
  );
}
