"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ScrollSection } from "@/components/layout/ScrollSection";
import { ProcessStepIcon } from "@/components/icons/AccentIcons";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const steps = [
  {
    title: "Align",
    body: "Goals, constraints, and success metrics — set early so design decisions stay accountable.",
  },
  {
    title: "Frame",
    body: "UX strategy turns ambiguity into a narrative: what matters first, second, and not at all.",
  },
  {
    title: "Build",
    body: "Development follows the story — performance budgets, accessibility, and maintainable systems.",
  },
  {
    title: "Prove",
    body: "Instrumentation and iteration against real behavior — not opinions, not vanity metrics.",
  },
  {
    title: "Compound",
    body: "Handoff-ready documentation and patterns so the product keeps improving after launch.",
  },
] as const;

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ProcessChapterSection() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement | null>(null);
  const listInView = useInView(listRef, { amount: 0.15, margin: "0px 0px -10% 0px" });

  return (
    <ScrollSection id="process">
      <div className="mx-auto max-w-[1100px] text-left">
        <SectionEyebrow>Process</SectionEyebrow>
        <h2 className="mt-4 max-w-3xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium tracking-tight text-white">
          A calm cadence from discovery to optimization
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#A1A1A1] md:text-lg">
          The process is built for judgment under pressure: fewer surprises, more
          signal, and a product that earns trust quickly.
        </p>

        <div ref={listRef} className="mt-16 space-y-10 md:mt-20 md:space-y-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={false}
              animate={{
                opacity: reduce ? 1 : listInView ? 1 : 0.35,
                y: reduce ? 0 : listInView ? 0 : 10,
              }}
              transition={{ duration: 0.75, delay: reduce ? 0 : i * 0.08, ease }}
              className="border-t border-[#39ff88]/12 pt-10 md:pt-12"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="shrink-0 pt-1">
                  <ProcessStepIcon index={i} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white md:text-xl">{step.title}</h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#A1A1A1]">
                    {step.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}
