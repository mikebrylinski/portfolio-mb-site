"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { AppleStaggerChild, AppleStaggerRoot } from "@/components/layout/AppleStagger";
import { ScrollSection } from "@/components/layout/ScrollSection";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { serviceColumns } from "@/content/services";
import { appleEase } from "@/lib/motion";
import { siteContainerClass } from "@/lib/site";

export function ServicesChapterSection() {
  const reduce = Boolean(useReducedMotion());

  const gridVariants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduce ? 0 : 0.1,
          delayChildren: reduce ? 0 : 0.04,
        },
      },
    }),
    [reduce],
  );

  const colVariants = useMemo(
    () => ({
      hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 22 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduce ? 0 : 0.85, ease: appleEase },
      },
    }),
    [reduce],
  );

  return (
    <ScrollSection
      id="services"
      className="relative overflow-hidden border-white/10 bg-[#020617]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#3B8CFF]/[0.06] to-transparent"
        aria-hidden
      />

      <div className={`relative ${siteContainerClass} text-left`}>
        <AppleStaggerRoot>
          <AppleStaggerChild>
            <SectionEyebrow>Services</SectionEyebrow>
          </AppleStaggerChild>
          <AppleStaggerChild>
            <h2 className="mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
              What I build
              <span className="mt-1 block text-[#3B8CFF]">and ship.</span>
            </h2>
          </AppleStaggerChild>
          <AppleStaggerChild>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
              Full-stack products, commerce, cloud, and AI — from strategy through
              deployment. One operator, one coherent thread, no handoff theater.
            </p>
          </AppleStaggerChild>
        </AppleStaggerRoot>

        <motion.div
          className="mt-14 grid grid-cols-1 gap-10 md:mt-16 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-white/10"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px", amount: 0.08 }}
        >
          {serviceColumns.map((col, ci) => (
            <motion.div
              key={col.id}
              variants={colVariants}
              className={`flex min-w-0 flex-col border-t border-white/10 pt-8 lg:border-t-0 lg:px-6 lg:pt-0 xl:px-8 ${
                ci === 0 ? "lg:pl-0" : ""
              } ${ci === serviceColumns.length - 1 ? "lg:pr-0" : ""}`}
            >
              <span className="text-[11px] font-medium tabular-nums tracking-[0.18em] text-[#3B8CFF]">
                {String(ci + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">
                {col.kicker}
              </p>
              <h3 className="mt-2 text-lg font-medium leading-snug tracking-tight text-white md:text-xl">
                {col.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/55 md:text-[15px]">
                {col.intro}
              </p>

              <div className="mt-10 flex flex-col gap-8">
                {col.services.map((s, si) => (
                  <article
                    key={s.title}
                    className="group relative border-t border-white/10 pt-6"
                  >
                    <motion.span
                      className="absolute left-0 top-0 h-px origin-left bg-[#3B8CFF]"
                      initial={{ scaleX: reduce ? 1 : 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{
                        duration: reduce ? 0 : 0.65,
                        delay: reduce ? 0 : 0.1 + si * 0.05,
                        ease: appleEase,
                      }}
                      style={{ width: "2rem" }}
                      aria-hidden
                    />
                    <h4 className="text-[15px] font-medium leading-snug text-white transition-colors group-hover:text-[#3B8CFF] md:text-base">
                      {s.title}
                    </h4>
                    <p className="mt-2 text-sm leading-snug text-[#3B8CFF]/90 md:text-[15px]">
                      {s.hook}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/55 md:text-[15px]">
                      {s.body}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Keywords">
                      {s.keywords.map((kw) => (
                        <li key={kw}>
                          <span className="inline-flex rounded-md border border-white/10 bg-[#020617]/60 px-2 py-0.5 text-[11px] font-medium text-white/60 transition-colors duration-300 group-hover:border-[#3B8CFF]/30 group-hover:text-white/85">
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
