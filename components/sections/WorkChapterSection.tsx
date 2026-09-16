"use client";

import Link from "next/link";
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
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { caseStudies } from "@/content/case-studies";
import { clients } from "@/content/clients";
import { appleEase } from "@/lib/motion";
import { siteContainerClass } from "@/lib/site";

const listContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.04 },
  },
};

const ROTATE_MS = 2200;

function TrustMark({ pulseKey, reduce }: { pulseKey: number; reduce: boolean }) {
  return (
    <div
      className="relative flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center md:h-[5.25rem] md:w-[5.25rem]"
      aria-hidden
    >
      {!reduce && (
        <>
          <motion.span
            key={`ring-a-${pulseKey}`}
            className="absolute inset-0 rounded-full border border-[#3B8CFF]/35"
            initial={{ scale: 0.72, opacity: 0.55 }}
            animate={{ scale: 1.35, opacity: 0 }}
            transition={{ duration: 1.35, ease: appleEase }}
          />
          <motion.span
            className="absolute inset-[10%] rounded-full border border-[#3B8CFF]/20"
            animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative flex h-[3.15rem] w-[3.15rem] items-center justify-center rounded-full border border-[#3B8CFF]/45 bg-[#3B8CFF]/10 md:h-[3.5rem] md:w-[3.5rem]">
        <motion.span
          className="absolute inset-0 rounded-full bg-[#3B8CFF]/15"
          animate={
            reduce
              ? undefined
              : { opacity: [0.25, 0.55, 0.25], scale: [1, 1.04, 1] }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <svg
          viewBox="0 0 48 48"
          className="relative h-7 w-7 text-[#3B8CFF] md:h-8 md:w-8"
          fill="none"
        >
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
            transition={{
              duration: reduce ? 0 : 0.45,
              delay: reduce ? 0 : 0.08,
              ease: appleEase,
            }}
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
      className="flex min-w-0 items-start gap-5 lg:gap-6 lg:pt-10"
      aria-live="polite"
      aria-atomic="true"
    >
      <TrustMark pulseKey={index} reduce={reduce} />

      <div className="min-w-0 flex-1 pt-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#3B8CFF]">
          Trusted by
        </p>
        <div className="relative mt-4 h-[2.75rem] overflow-hidden md:h-[3.25rem]">
          {reduce ? (
            <p className="text-lg font-medium uppercase tracking-[0.06em] text-white/80 md:text-xl">
              {clients.slice(0, 4).join(" · ")}
              <span className="text-white/40"> · +{clients.length - 4} more</span>
            </p>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={name}
                className="absolute inset-x-0 top-0 text-lg font-medium uppercase tracking-[0.06em] text-white/85 md:text-xl"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: appleEase }}
              >
                {name}
              </motion.p>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

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

  const featured = caseStudies.slice(0, 3);

  return (
    <ScrollSection
      id="work"
      className="relative overflow-hidden border-white/10 bg-[#020617]"
    >
      <div
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_10%,rgba(59,140,255,0.05),transparent_50%)]"
        aria-hidden
      />

      <div className={`relative z-[1] ${siteContainerClass} text-left`}>
        <div className="relative border border-[#3B8CFF]/25 px-5 py-8 sm:px-7 sm:py-10 md:px-8">
          <span
            className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#3B8CFF]/80"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#3B8CFF]/80"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#3B8CFF]/80"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#3B8CFF]/80"
            aria-hidden
          />

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#3B8CFF]/75">
              Sheet A — Selected work
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/45">
              Scale 1 : 1 · End to end
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <AppleStaggerRoot>
              <AppleStaggerChild>
                <SectionEyebrow>Work</SectionEyebrow>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
                  Selected work
                  <span className="mt-1 block text-[#3B8CFF]">built end to end.</span>
                </h2>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
                  Selected work spanning cinematic portfolios, membership platforms,
                  and AI-powered products — design, development, and systems in one
                  thread.
                </p>
              </AppleStaggerChild>
            </AppleStaggerRoot>

            <TrustedByRotator />
          </div>
        </div>

        <motion.ul
          className="mt-10 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 lg:gap-6"
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -12% 0px" }}
        >
          {featured.map((project, index) => (
            <WorkProjectRow
              key={project.slug}
              project={project}
              index={index}
              variants={listItem}
            />
          ))}
        </motion.ul>

        <motion.div
          className="mt-12 flex flex-wrap items-center justify-between gap-4 border border-[#3B8CFF]/20 px-5 py-4"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduce ? 0 : 0.85, ease: appleEase }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/50">
            Continue → Full drawing set
          </p>
          <Link
            href="/work"
            className="inline-flex min-h-[44px] items-center gap-2.5 border border-[#3B8CFF] bg-[#3B8CFF]/10 px-6 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-[background-color] hover:bg-[#3B8CFF]/20"
          >
            View all case studies
            <span aria-hidden className="text-[#3B8CFF]">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </ScrollSection>
  );
}
