"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { AppleStaggerChild, AppleStaggerRoot } from "@/components/layout/AppleStagger";
import { ScrollSection } from "@/components/layout/ScrollSection";
import { AestheticNote, FieldLabel, FrameCorners } from "@/components/ui/FieldNotes";
import { skillGroups } from "@/content/services";
import { appleEase } from "@/lib/motion";
import { siteContainerClass } from "@/lib/site";

export function ServicesChapterSection() {
  const reduce = Boolean(useReducedMotion());
  const rootRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const gridY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [28, -28],
  );

  const gridVariants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduce ? 0 : 0.1,
          delayChildren: reduce ? 0 : 0.1,
        },
      },
    }),
    [reduce],
  );

  const cardVariants = useMemo(
    () => ({
      hidden: {
        opacity: reduce ? 1 : 0,
        y: reduce ? 0 : 28,
      },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduce ? 0 : 0.8, ease: appleEase },
      },
    }),
    [reduce],
  );

  return (
    <ScrollSection
      id="skills"
      className="relative overflow-hidden border-white/10 bg-[#020617]"
    >
      <div ref={rootRef} className="relative">
      <motion.div
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-25"
        style={{ y: gridY }}
        aria-hidden
      />

      <div className={`relative ${siteContainerClass} text-left`}>
        <div className="relative overflow-hidden border border-[#3B8CFF]/25 px-5 py-8 sm:px-7 sm:py-10 md:px-8">
          <FrameCorners />

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <FieldLabel>Ridgeline — Technical expertise</FieldLabel>
            <AestheticNote>SPEC SET · 06</AestheticNote>
          </div>

          <AppleStaggerRoot>
            <AppleStaggerChild>
              <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
                Technical expertise
              </h2>
            </AppleStaggerChild>
            <AppleStaggerChild>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
                A full-stack skill set spanning product, application,
                infrastructure, data, and AI.
              </p>
            </AppleStaggerChild>
            <AppleStaggerChild>
              <motion.div
                className="mt-5 h-px max-w-xs origin-left bg-gradient-to-r from-[#3B8CFF] via-[#3B8CFF]/50 to-transparent"
                initial={reduce ? false : { scaleX: 0, opacity: 0 }}
                whileInView={reduce ? undefined : { scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: reduce ? 0 : 1.1, ease: appleEase, delay: 0.15 }}
                aria-hidden
              />
            </AppleStaggerChild>
          </AppleStaggerRoot>

          <motion.div
            className="relative mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px", amount: 0.08 }}
          >
            {!reduce ? (
              <svg
                className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full sm:block"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                <motion.path
                  d="M 16 8 L 84 8 L 84 92 L 16 92 Z"
                  fill="none"
                  stroke="rgba(59,140,255,0.18)"
                  strokeWidth="0.3"
                  strokeDasharray="2 2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.6, ease: appleEase, delay: 0.25 }}
                />
                <motion.path
                  d="M 50 4 L 50 96 M 8 50 L 92 50"
                  fill="none"
                  stroke="rgba(59,140,255,0.12)"
                  strokeWidth="0.22"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.35, ease: appleEase, delay: 0.45 }}
                />
              </svg>
            ) : null}

            {skillGroups.map((group, i) => (
              <motion.article
                key={group.label}
                variants={cardVariants}
                className="relative z-[1] border border-[#3B8CFF]/20 bg-[#06101c]/50 p-5 md:p-6"
              >
                <FrameCorners size="sm" />
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-[#3B8CFF]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[#3B8CFF]/70"
                    aria-hidden
                  />
                </div>
                <h3 className="mt-3 text-base font-medium uppercase tracking-tight text-white md:text-lg">
                  {group.label}
                </h3>
                <ul className="mt-4 space-y-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#9cb6d4]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
      </div>
    </ScrollSection>
  );
}
