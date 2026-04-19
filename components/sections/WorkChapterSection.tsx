"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AppleStaggerChild, AppleStaggerRoot } from "@/components/layout/AppleStagger";
import { ScrollSection } from "@/components/layout/ScrollSection";
import { ClientTicker } from "@/components/sections/ClientTicker";
import { WorkProjectRow } from "@/components/sections/WorkProjectRow";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { caseStudies } from "@/content/case-studies";
import { appleEase } from "@/lib/motion";

const listContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.04 },
  },
};

export function WorkChapterSection() {
  const reduce = Boolean(useReducedMotion());

  const listItem = useMemo(
    () => ({
      hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 36 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduce ? 0 : 0.92, ease: appleEase },
      },
    }),
    [reduce],
  );

  return (
    <ScrollSection id="work">
      <div className="mx-auto max-w-[1100px] text-left">
        <AppleStaggerRoot>
          <AppleStaggerChild>
            <SectionEyebrow>Work</SectionEyebrow>
          </AppleStaggerChild>
          <AppleStaggerChild>
            <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium tracking-tight text-white">
              Outcomes, not assets
            </h2>
          </AppleStaggerChild>
          <AppleStaggerChild>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#A1A1A1] md:text-lg">
              Each engagement is measured by clarity, speed, and conversion — the
              interface is simply where it becomes visible.
            </p>
          </AppleStaggerChild>
          <AppleStaggerChild className="relative left-1/2 mt-12 w-screen max-w-[100vw] -translate-x-1/2 md:mt-14">
            <ClientTicker />
          </AppleStaggerChild>
        </AppleStaggerRoot>

        <motion.ul
          className="mt-14 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-8"
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -12% 0px" }}
        >
          {caseStudies.map((project) => (
            <WorkProjectRow key={project.slug} project={project} variants={listItem} />
          ))}
        </motion.ul>

        <motion.div
          className="mt-14"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduce ? 0 : 0.85, ease: appleEase }}
        >
          <Link
            href="/work"
            className="text-sm text-[#39ff88] underline-offset-4 transition-opacity hover:opacity-80"
          >
            Browse the full work index
          </Link>
        </motion.div>
      </div>
    </ScrollSection>
  );
}
