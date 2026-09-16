"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { AppleStaggerChild, AppleStaggerRoot } from "@/components/layout/AppleStagger";
import { ScrollSection } from "@/components/layout/ScrollSection";
import { AestheticNote, FieldLabel, FrameCorners } from "@/components/ui/FieldNotes";
import { capabilities, skillGroups } from "@/content/services";
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
      id="capabilities"
      className="relative overflow-hidden border-white/10 bg-[#020617]"
    >
      <div
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-25"
        aria-hidden
      />

      <div className={`relative ${siteContainerClass} text-left`}>
        <div className="relative border border-[#3B8CFF]/25 px-5 py-8 sm:px-7 sm:py-10 md:px-8">
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
          </AppleStaggerRoot>

          <motion.div
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px", amount: 0.08 }}
          >
            {capabilities.map((item, i) => (
              <motion.article
                key={item.title}
                variants={colVariants}
                className="relative border border-[#3B8CFF]/20 bg-[#06101c]/50 p-5 md:p-6"
              >
                <FrameCorners size="sm" />
                <span className="font-mono text-[10px] tracking-[0.18em] text-[#3B8CFF]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-medium uppercase tracking-tight text-white md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
                  {item.body}
                </p>
              </motion.article>
            ))}
          </motion.div>

          <div className="mt-10 space-y-5 border-t border-[#3B8CFF]/20 pt-8">
            <FieldLabel>Technical specification</FieldLabel>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {skillGroups
                .filter((group) => group.label !== "Other")
                .map((group) => (
                  <li key={group.label}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/80">
                      {group.label}
                    </p>
                    <p className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-[#9cb6d4]">
                      {group.items.join(" · ")}
                    </p>
                  </li>
                ))}
            </ul>
            {skillGroups
              .filter((group) => group.label === "Other")
              .map((group) => (
                <div
                  key={group.label}
                  className="border-t border-[#3B8CFF]/20 pt-4"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/80">
                    {group.label}
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-[#9cb6d4]">
                    {group.items.join(" · ")}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}
