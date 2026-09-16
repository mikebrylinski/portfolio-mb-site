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
    body: "Goals, users, constraints and requirements.",
  },
  {
    code: "02",
    title: "Build",
    body: "Design, architecture, development and integration.",
  },
  {
    code: "03",
    title: "Launch",
    body: "Deploy, measure and improve.",
  },
] as const;

export function ProcessChapterSection() {
  const reduce = Boolean(useReducedMotion());

  const packContainer = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.04 },
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
      <div className={`${siteContainerClass} text-left`}>
        <div className="relative border border-[#3B8CFF]/25 px-5 py-8 sm:px-7 sm:py-10 md:px-8">
          <FrameCorners />
          <FieldLabel>The build</FieldLabel>
          <AppleStaggerRoot>
            <AppleStaggerChild>
              <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold uppercase tracking-[-0.03em] text-white">
                How I work
              </h2>
            </AppleStaggerChild>
          </AppleStaggerRoot>

          <motion.ol
            className="relative mt-10 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3 md:gap-0"
            variants={packContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <span
              className="pointer-events-none absolute left-[8%] right-[8%] top-7 hidden h-px bg-[#3B8CFF]/30 md:block"
              aria-hidden
            />
            {phases.map((phase) => (
              <motion.li
                key={phase.code}
                variants={packItem}
                className="relative px-0 md:px-4"
              >
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
