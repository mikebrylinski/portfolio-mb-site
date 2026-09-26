"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { AppleStaggerChild, AppleStaggerRoot } from "@/components/layout/AppleStagger";
import { ScrollSection } from "@/components/layout/ScrollSection";
import { WorkProjectRow } from "@/components/sections/WorkProjectRow";
import { AestheticNote, FieldLabel, FrameCorners } from "@/components/ui/FieldNotes";
import { caseStudies } from "@/content/case-studies";
import { clients } from "@/content/clients";
import { appleEase } from "@/lib/motion";
import { siteContainerClass } from "@/lib/site";

const ROTATE_MS = 2200;

function TrustMark({ pulseKey, reduce }: { pulseKey: number; reduce: boolean }) {
  return (
    <div
      className="relative flex h-20 w-20 shrink-0 items-center justify-center"
      aria-hidden
    >
      {!reduce && (
        <motion.span
          key={`ring-${pulseKey}`}
          className="absolute inset-0 rounded-full border border-[#3B8CFF]/35"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1.3, opacity: 0 }}
          transition={{ duration: 1.2, ease: appleEase }}
        />
      )}
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#3B8CFF]/45 bg-[#3B8CFF]/10">
        <svg viewBox="0 0 48 48" className="h-8 w-8 text-[#3B8CFF]" fill="none">
          <motion.path
            d="M24 6.5 36 11.5v10.2c0 8.1-5.4 15.5-12 17.8-6.6-2.3-12-9.7-12-17.8V11.5L24 6.5Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.9, ease: appleEase }}
          />
          <motion.path
            key={`check-${pulseKey}`}
            d="M17.5 24.2 22 28.7 31 19.5"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.4, ease: appleEase }}
          />
        </svg>
      </div>
    </div>
  );
}

function TrustedByRotator() {
  const reduce = Boolean(useReducedMotion());
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % clients.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduce, inView]);

  const name = clients[index];

  return (
    <div
      ref={rootRef}
      className="relative flex min-w-0 flex-col gap-3 border border-[#3B8CFF]/25 px-4 py-3 sm:px-5 sm:py-4"
      aria-live="polite"
      aria-atomic="true"
    >
      <FrameCorners size="sm" />
      <div className="flex min-w-0 items-center gap-3">
        <TrustMark pulseKey={index} reduce={reduce} />
        <div className="min-w-0 flex-1 overflow-hidden">
          <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-[#3B8CFF]">
            Trusted by
          </p>
          <div className="relative mt-1.5 h-6 overflow-hidden">
            {reduce ? (
              <p className="truncate text-sm font-medium uppercase tracking-wide text-white/85">
                {clients.length}+ clients & partners
              </p>
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={name}
                  className="absolute inset-0 truncate text-sm font-medium uppercase tracking-wide text-white/85"
                  title={name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: appleEase }}
                >
                  {name}
                </motion.p>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
      <p className="border-t border-[#3B8CFF]/15 pt-3 text-center text-xs font-light leading-relaxed text-white/45 sm:text-[13px]">
        I&apos;ve had the opportunity to work with A-list musicians, top brands and
        startups.
      </p>
    </div>
  );
}

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
    <ScrollSection
      id="work"
      spacing="tight"
      className="relative overflow-hidden border-white/10 bg-[#020617]"
    >
      <div
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-40"
        aria-hidden
      />

      {!reduce ? (
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          <span className="shooting-star shooting-star--1" />
          <span className="shooting-star shooting-star--2" />
          <span className="shooting-star shooting-star--3" />
          <span className="shooting-star shooting-star--4" />
        </div>
      ) : null}

      <div className={`relative z-[1] ${siteContainerClass} text-left`}>
        <div className="relative border border-[#3B8CFF]/25 px-5 py-8 sm:px-7 sm:py-10 md:px-8">
          <FrameCorners />

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <FieldLabel>Basecamp — Selected projects</FieldLabel>
            <AestheticNote>SYSTEM / DIGITAL PRODUCT</AestheticNote>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <AppleStaggerRoot>
              <AppleStaggerChild>
                <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
                  Selected projects
                </h2>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
                  Products I&apos;ve designed, architected, and shipped.
                </p>
              </AppleStaggerChild>
            </AppleStaggerRoot>

            <div className="min-w-0">
              <TrustedByRotator />
            </div>
          </div>
        </div>

        <motion.ul
          className="mt-10 grid list-none grid-cols-1 gap-6 p-0 md:mt-12"
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08, margin: "0px 0px -12% 0px" }}
        >
          {caseStudies.map((project, index) => (
            <WorkProjectRow
              key={project.slug}
              project={project}
              reverse={index === 1}
              variants={listItem}
            />
          ))}
        </motion.ul>
      </div>
    </ScrollSection>
  );
}
