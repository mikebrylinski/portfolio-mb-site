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
import { capabilities, skillGroups } from "@/content/services";
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
          staggerChildren: reduce ? 0 : 0.14,
          delayChildren: reduce ? 0 : 0.12,
        },
      },
    }),
    [reduce],
  );

  const cardVariants = useMemo(
    () => ({
      hidden: {
        opacity: reduce ? 1 : 0,
        y: reduce ? 0 : 36,
        scale: reduce ? 1 : 0.96,
        filter: reduce ? "none" : "blur(6px)",
      },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: reduce ? 0 : 0.9, ease: appleEase },
      },
    }),
    [reduce],
  );

  const specVariants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduce ? 0 : 0.07,
          delayChildren: reduce ? 0 : 0.08,
        },
      },
    }),
    [reduce],
  );

  const specItemVariants = useMemo(
    () => ({
      hidden: { opacity: reduce ? 1 : 0, x: reduce ? 0 : -14 },
      show: {
        opacity: 1,
        x: 0,
        transition: { duration: reduce ? 0 : 0.7, ease: appleEase },
      },
    }),
    [reduce],
  );

  return (
    <ScrollSection
      id="capabilities"
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
            <FieldLabel>Ridgeline — Capabilities</FieldLabel>
            <AestheticNote>SPEC SET · 04</AestheticNote>
          </div>

          <AppleStaggerRoot>
            <AppleStaggerChild>
              <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
                What I build
              </h2>
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
            className="relative mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
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
                  d="M 25 25 L 75 25 L 75 75 L 25 75 Z"
                  fill="none"
                  stroke="rgba(59,140,255,0.22)"
                  strokeWidth="0.35"
                  strokeDasharray="2 2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.6, ease: appleEase, delay: 0.25 }}
                />
                <motion.path
                  d="M 50 8 L 50 92 M 8 50 L 92 50"
                  fill="none"
                  stroke="rgba(59,140,255,0.14)"
                  strokeWidth="0.25"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.35, ease: appleEase, delay: 0.45 }}
                />
              </svg>
            ) : null}

            {capabilities.map((item, i) => (
              <motion.article
                key={item.title}
                variants={cardVariants}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -4,
                        borderColor: "rgba(59,140,255,0.55)",
                        backgroundColor: "rgba(6,16,28,0.78)",
                        transition: { duration: 0.35, ease: appleEase },
                      }
                }
                className="group relative z-[1] overflow-hidden border border-[#3B8CFF]/20 bg-[#06101c]/50 p-5 md:p-6"
              >
                <FrameCorners size="sm" />
                {!reduce ? (
                  <motion.span
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#3B8CFF]/10 blur-2xl"
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: 0.2 + i * 0.1,
                      ease: appleEase,
                    }}
                    aria-hidden
                  />
                ) : null}

                <div className="flex items-center justify-between gap-3">
                  <motion.span
                    className="font-mono text-[10px] tracking-[0.18em] text-[#3B8CFF]"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: reduce ? 0 : 0.55,
                      delay: reduce ? 0 : 0.2 + i * 0.1,
                      ease: appleEase,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>
                  {!reduce ? (
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-[#3B8CFF]"
                      animate={{
                        opacity: [0.35, 1, 0.35],
                        scale: [1, 1.25, 1],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay: i * 0.35,
                        ease: "easeInOut",
                      }}
                      aria-hidden
                    />
                  ) : (
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-[#3B8CFF]/70"
                      aria-hidden
                    />
                  )}
                </div>

                <h3 className="mt-3 text-lg font-medium uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-[#3B8CFF] md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
                  {item.body}
                </p>

                {!reduce ? (
                  <motion.div
                    className="mt-5 h-px origin-left bg-gradient-to-r from-[#3B8CFF]/60 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.85,
                      delay: 0.35 + i * 0.1,
                      ease: appleEase,
                    }}
                    aria-hidden
                  />
                ) : (
                  <div
                    className="mt-5 h-px bg-gradient-to-r from-[#3B8CFF]/40 to-transparent"
                    aria-hidden
                  />
                )}
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 space-y-5 border-t border-[#3B8CFF]/20 pt-8"
            variants={specVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <FieldLabel>Technical specification</FieldLabel>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {skillGroups
                .filter((group) => group.label !== "Other")
                .map((group) => (
                  <motion.li key={group.label} variants={specItemVariants}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/80">
                      {group.label}
                    </p>
                    <p className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-[#9cb6d4]">
                      {group.items.join(" · ")}
                    </p>
                  </motion.li>
                ))}
            </ul>
            {skillGroups
              .filter((group) => group.label === "Other")
              .map((group) => (
                <motion.div
                  key={group.label}
                  variants={specItemVariants}
                  className="border-t border-[#3B8CFF]/20 pt-4"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/80">
                    {group.label}
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-[#9cb6d4]">
                    {group.items.join(" · ")}
                  </p>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
      </div>
    </ScrollSection>
  );
}
