"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import { AppleStaggerChild, AppleStaggerRoot } from "@/components/layout/AppleStagger";
import { ScrollSection } from "@/components/layout/ScrollSection";
import { ProcessCodeEditor } from "@/components/sections/ProcessCodeEditor";
import { ProcessStepIcon } from "@/components/icons/AccentIcons";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { siteContainerClass } from "@/lib/site";

const phases = [
  {
    title: "Learn",
    body: "We start with outcomes, constraints, and the people in the room — not a blank canvas. Workshops, audits, and competitive context get folded into a single narrative of what “good” looks like so design and engineering stay pointed at the same north star.",
    help: "How we help: facilitation, technical discovery, analytics and SEO baselines, and a written brief you can share internally — so the team agrees on the problem before anyone ships UI.",
    iconIndex: 0,
  },
  {
    title: "Build",
    body: "UX becomes the blueprint: hierarchy, flows, and states that respect real attention spans. Then engineering earns that story — performance budgets, accessibility, and patterns you can extend without rewriting the product every quarter.",
    help: "How we help: prototyping where it matters, component systems, integration with your stack, and launch checklists — so speed never trades away clarity, resilience, or maintainability.",
    iconIndex: 2,
  },
  {
    title: "Modify",
    body: "Shipping is the halfway point. We instrument what matters, read behavior honestly, and iterate in tight loops — copy, interaction, and code — until the product behaves the way the brief promised it would.",
    help: "How we help: measurement plans, event naming discipline, A/B-ready structure, and prioritized backlogs — so every change ties back to signal, not opinion or vanity metrics.",
    iconIndex: 4,
  },
] as const;

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ProcessChapterSection() {
  const reduce = Boolean(useReducedMotion());

  const packContainer = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: { staggerChildren: reduce ? 0 : 0.14, delayChildren: reduce ? 0 : 0.06 },
      },
    }),
    [reduce],
  );

  const packItem = useMemo(
    () => ({
      hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 36, scale: reduce ? 1 : 0.98 },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: reduce ? 0 : 0.95, ease },
      },
    }),
    [reduce],
  );
  const packRef = useRef<HTMLDivElement | null>(null);
  /** Looser threshold so rail + title pulse work once the pack region is on screen */
  const packRegionInView = useInView(packRef, {
    amount: 0.06,
    margin: "0px 0px -12% 0px",
  });
  const railActive = packRegionInView && !reduce;

  return (
    <ScrollSection id="process">
      <div className={`${siteContainerClass} text-left`}>
        {/* Copy: stagger only in left column. Code editor stays outside stagger so it never stays opacity-0 / clipped. */}
        <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-14 xl:gap-16">
          <div className="min-w-0 max-w-2xl flex-1">
            <AppleStaggerRoot>
              <AppleStaggerChild>
                <SectionEyebrow>Process</SectionEyebrow>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <h2 className="mt-4 max-w-3xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium tracking-tight text-white">
                  Learn. Build. Modify.
                </h2>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#A1A1A1] md:text-lg">
                  You get a partner who moves with you through a tight loop — not a waterfall deck and a disappearing
                  act. I stay close from first conversation through launch and iteration: shared context, honest
                  tradeoffs, and artifacts your team can actually run with.
                </p>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#A1A1A1] md:text-[17px] md:leading-relaxed">
                  Whether you are validating a new surface, hardening an eCommerce path, or unblocking a stuck roadmap,
                  the goal is always the same — fewer surprises, more signal, and a product that earns trust quickly.
                </p>
              </AppleStaggerChild>
            </AppleStaggerRoot>
          </div>

          <div className="flex w-full shrink-0 justify-center lg:w-auto lg:max-w-[min(100%,420px)] lg:justify-end">
            <ProcessCodeEditor className="mx-auto w-full max-w-[340px] sm:max-w-[360px] lg:mx-0 lg:max-w-[400px] lg:justify-end" />
          </div>
        </div>

        <div ref={packRef} className="mt-14 md:mt-20">
          <motion.div
            aria-hidden
            className="mb-10 h-px w-full overflow-hidden rounded-full bg-white/[0.06] md:mb-12"
            initial={false}
            animate={{
              opacity: packRegionInView ? 1 : 0.4,
            }}
            transition={{ duration: 0.6, ease }}
          >
            <motion.div
              className="h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-[#3B8CFF]/70 to-transparent"
              animate={
                reduce
                  ? { x: "0%" }
                  : railActive
                    ? { x: ["-100%", "200%"] }
                    : { x: "-100%" }
              }
              transition={
                reduce
                  ? {}
                  : railActive
                    ? {
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 0.6,
                      }
                    : { duration: 0.35 }
              }
            />
          </motion.div>

          <motion.div
            className="grid gap-6 sm:gap-7 md:grid-cols-3 md:gap-6 lg:gap-8"
            variants={packContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -18% 0px" }}
          >
            {phases.map((phase, i) => (
              <motion.article
                key={phase.title}
                variants={packItem}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -4,
                        transition: { duration: 0.35, ease },
                      }
                }
                className="group relative flex h-full flex-col rounded-2xl border border-[#3B8CFF]/14 bg-gradient-to-b from-white/[0.04] to-transparent p-6 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.85)] backdrop-blur-[2px] transition-[border-color,box-shadow] duration-300 md:p-7 lg:p-8 hover:border-[#3B8CFF]/32 hover:shadow-[0_28px_80px_-36px_rgba(59,140,255,0.08)]"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <span className="font-mono text-[11px] font-medium tabular-nums tracking-[0.2em] text-[#3B8CFF]/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="shrink-0 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                    <ProcessStepIcon index={phase.iconIndex} />
                  </div>
                </div>

                <h3 className="flex flex-wrap items-baseline gap-1">
                  <motion.span
                    className="text-[clamp(1.65rem,3.6vw,2.35rem)] font-medium tracking-tight text-white"
                    animate={
                      reduce || !packRegionInView
                        ? {}
                        : {
                            textShadow: [
                              "0 0 0 rgba(59,140,255,0)",
                              "0 0 20px rgba(59,140,255,0.11)",
                              "0 0 0 rgba(59,140,255,0)",
                            ],
                          }
                    }
                    transition={{
                      duration: 4.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.85,
                    }}
                  >
                    {phase.title}
                  </motion.span>
                  <span className="text-[clamp(1.65rem,3.6vw,2.35rem)] font-medium text-[#3B8CFF]">.</span>
                </h3>

                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-[#A1A1A1] md:text-base md:leading-relaxed">
                  {phase.body}
                </p>

                <p className="mt-5 border-t border-white/[0.06] pt-5 text-sm leading-relaxed text-white/55 md:text-[15px]">
                  {phase.help}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
}
