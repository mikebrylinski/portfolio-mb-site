"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { AppleStaggerChild, AppleStaggerRoot } from "@/components/layout/AppleStagger";
import { ScrollSection } from "@/components/layout/ScrollSection";
import { FieldLabel, FrameCorners } from "@/components/ui/FieldNotes";
import { appleEase } from "@/lib/motion";
import { siteContainerClass } from "@/lib/site";

const phases = [
  {
    code: "01",
    title: "Understand",
    body: "Translate ambiguous product requirements into a technical plan.",
  },
  {
    code: "02",
    title: "Architect",
    body: "Design frontend, backend, database, APIs, and infrastructure.",
  },
  {
    code: "03",
    title: "Build",
    body: "Ship production-quality interfaces and full-stack functionality.",
  },
  {
    code: "04",
    title: "Integrate",
    body: "Connect AI, APIs, payments, analytics, and third-party services.",
  },
  {
    code: "05",
    title: "Deploy",
    body: "Own cloud infrastructure, CI/CD, and production environments.",
  },
  {
    code: "06",
    title: "Iterate",
    body: "Measure, troubleshoot, improve, and ship again.",
  },
] as const;

export function ProcessChapterSection() {
  const reduce = Boolean(useReducedMotion());

  const packContainer = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.04 },
      },
    }),
    [reduce],
  );

  const packItem = useMemo(
    () => ({
      hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduce ? 0 : 0.8, ease: appleEase },
      },
    }),
    [reduce],
  );

  return (
    <ScrollSection id="process" className="relative overflow-hidden bg-[#000000]">
      <div
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-35"
        aria-hidden
      />
      <div className={`relative z-[1] ${siteContainerClass} text-left`}>
        <div className="relative border border-[#3B8CFF]/25 px-5 py-8 sm:px-7 sm:py-10 md:px-8">
          <FrameCorners />
          <FieldLabel>The build — From problem to production</FieldLabel>
          <AppleStaggerRoot>
            <AppleStaggerChild>
              <h2 className="mt-4 max-w-3xl text-[clamp(1.75rem,3.6vw,2.85rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
                From problem to production
              </h2>
            </AppleStaggerChild>
          </AppleStaggerRoot>

          <motion.ol
            className="relative mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3"
            variants={packContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {phases.map((phase) => (
              <motion.li
                key={phase.code}
                variants={packItem}
                className="relative border border-[#3B8CFF]/20 bg-[#06101c]/40 p-4 sm:p-5"
              >
                <FrameCorners size="sm" />
                <p className="font-mono text-[11px] tracking-[0.2em] text-[#3B8CFF]">
                  {phase.code}
                </p>
                <h3 className="mt-3 text-lg font-medium uppercase tracking-tight text-white">
                  {phase.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9cb6d4]">
                  {phase.body}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </ScrollSection>
  );
}
