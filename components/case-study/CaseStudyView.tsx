"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  CaseStudyDeviceMockups,
  CaseStudyHeroMedia,
} from "@/components/case-study/CaseStudyMedia";
import { CaseStudyLayout } from "@/components/layout/CaseStudyLayout";
import { ParallaxLayer } from "@/components/ParallaxLayer";
import type { CaseStudy } from "@/content/case-studies";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.85, delay: reduce ? 0 : delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function SheetLabel({
  code,
  children,
}: {
  code: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-[#3B8CFF]">
        {code}
      </span>
      <span className="h-px flex-1 max-w-[3rem] bg-[#3B8CFF]/40" aria-hidden />
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#3B8CFF]/90">
        {children}
      </p>
    </div>
  );
}

function FrameCorners({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#3B8CFF]/80" />
      <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#3B8CFF]/80" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#3B8CFF]/80" />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#3B8CFF]/80" />
    </div>
  );
}

export function CaseStudyView({
  study,
  nextTitle,
}: {
  study: CaseStudy;
  nextTitle?: string;
}) {
  const reduce = useReducedMotion();
  const next = study.nextSlug;
  const sheetId = study.slug.slice(0, 8).toUpperCase().replace(/-/g, "");

  return (
    <CaseStudyLayout>
      {/* Outer drawing border */}
      <div className="relative overflow-hidden border border-[#3B8CFF]/35 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
        <FrameCorners />

        {/* Title block / legend */}
        <header className="relative grid gap-0 border border-[#3B8CFF]/30 md:grid-cols-[1fr_minmax(220px,280px)]">
          <FadeIn className="border-b border-[#3B8CFF]/30 p-5 md:border-b-0 md:border-r md:p-7">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#3B8CFF]/75">
                Project drawing
              </span>
              <span className="font-mono text-[10px] tracking-[0.16em] text-[#3B8CFF]/45">
                REV.01
              </span>
            </div>
            <h1 className="mt-4 text-[clamp(1.85rem,4.5vw,3.15rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
              {study.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
              {study.statement}
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-[#3B8CFF]/70">
              {study.meta}
            </p>
            {study.liveUrl ? (
              <div className="mt-7">
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 border border-[#3B8CFF] bg-[#3B8CFF]/10 px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#3B8CFF]/20"
                >
                  View live site
                  <span aria-hidden>↗</span>
                </a>
              </div>
            ) : null}
          </FadeIn>

          <FadeIn
            delay={0.08}
            className="grid grid-rows-[auto_1fr_auto] font-mono text-[10px] uppercase tracking-[0.16em] text-[#3B8CFF]/80"
          >
            <div className="border-b border-[#3B8CFF]/30 p-4 md:p-5">
              <p className="text-[#3B8CFF]/45">Sheet</p>
              <p className="mt-1 text-lg tracking-[0.08em] text-white">A-{sheetId.slice(0, 4)}</p>
            </div>
            <div className="border-b border-[#3B8CFF]/30 p-4 md:p-5">
              <p className="text-[#3B8CFF]/45">Drawn by</p>
              <p className="mt-1 text-[11px] tracking-[0.12em] text-[#c8dff7]">
                Mike Brylinski
              </p>
              <p className="mt-3 text-[#3B8CFF]/45">Scale</p>
              <p className="mt-1 text-[11px] tracking-[0.12em] text-[#c8dff7]">
                1 : 1 — End to end
              </p>
            </div>
            <div className="p-4 md:p-5">
              <p className="text-[#3B8CFF]/45">Status</p>
              <p className="mt-1 flex items-center gap-2 text-[11px] tracking-[0.12em] text-[#c8dff7]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#3B8CFF]" aria-hidden />
                Built / shipped
              </p>
            </div>
          </FadeIn>
        </header>

        {/* Overview + key results */}
        <section className="mt-6 grid gap-0 border border-[#3B8CFF]/30 md:mt-8 md:grid-cols-2">
          <FadeIn delay={0.05} className="border-b border-[#3B8CFF]/30 p-5 md:border-b-0 md:border-r md:p-7">
            <SheetLabel code="01">Overview</SheetLabel>
            <p className="mt-5 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
              {study.summary}
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="p-5 md:p-7">
            <SheetLabel code="02">Key results</SheetLabel>
            <ul className="mt-5 space-y-0">
              {study.keyResults.map((line, i) => (
                <li
                  key={line}
                  className="blueprint-dash flex gap-3 py-3 text-sm leading-relaxed text-[#9cb6d4] first:border-t-0 first:pt-0 md:text-[15px]"
                >
                  <span className="shrink-0 font-mono text-[10px] tracking-[0.14em] text-[#3B8CFF]/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </section>

        {/* Visual plate */}
        {study.mockups && study.mockups.length > 0 ? (
          <section className="relative mt-6 overflow-hidden border border-[#3B8CFF]/30 md:mt-8">
            <div className="flex items-center justify-between border-b border-[#3B8CFF]/30 px-5 py-3 md:px-7">
              <SheetLabel code="03">Visual plate</SheetLabel>
              <span className="font-mono text-[10px] tracking-[0.16em] text-[#3B8CFF]/50">
                FIG. A–{study.mockups.length}
              </span>
            </div>
            <CaseStudyDeviceMockups mockups={study.mockups} />
          </section>
        ) : (
          <section className="relative mt-6 overflow-hidden border border-[#3B8CFF]/30 md:mt-8">
            <div className="flex items-center justify-between border-b border-[#3B8CFF]/30 px-5 py-3 md:px-7">
              <SheetLabel code="03">Visual plate</SheetLabel>
              <span className="font-mono text-[10px] tracking-[0.16em] text-[#3B8CFF]/50">
                FIG. A
              </span>
            </div>
            <div className="relative h-[min(55vh,560px)] w-full max-w-full overflow-hidden">
              <ParallaxLayer className="relative h-full w-full">
                <CaseStudyHeroMedia study={study} />
                {study.visualType !== "video" ? (
                  <div className="absolute inset-0 bg-[#06101c]/25" aria-hidden />
                ) : (
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#06101c]/70 to-transparent"
                    aria-hidden
                  />
                )}
              </ParallaxLayer>
            </div>
          </section>
        )}

        {/* Process */}
        <section className="mt-6 border border-[#3B8CFF]/30 md:mt-8">
          <div className="border-b border-[#3B8CFF]/30 px-5 py-3 md:px-7">
            <SheetLabel code="04">Process</SheetLabel>
          </div>
          <div className="divide-y divide-[#3B8CFF]/20">
            {study.process.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px", amount: 0.25 }}
                transition={{
                  duration: reduce ? 0 : 0.75,
                  delay: reduce ? 0 : i * 0.05,
                  ease,
                }}
                className="grid w-full items-center gap-3 px-5 py-6 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-6 md:px-7 md:py-7"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/70 sm:self-center">
                  <p>Step</p>
                  <p className="mt-1 text-2xl tracking-[0.06em] text-[#3B8CFF]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <div className="min-w-0 w-full">
                  <h3 className="text-base font-medium uppercase tracking-tight text-white md:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 w-full text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Challenge / Solution */}
        <section className="mt-6 grid gap-0 border border-[#3B8CFF]/30 md:mt-8 md:grid-cols-2">
          <div className="border-b border-[#3B8CFF]/30 p-5 md:border-b-0 md:border-r md:p-7">
            <SheetLabel code="05">Challenge</SheetLabel>
            <p className="mt-5 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
              {study.challenge}
            </p>
          </div>
          <div className="p-5 md:p-7">
            <SheetLabel code="06">Solution</SheetLabel>
            <p className="mt-5 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
              {study.solution}
            </p>
          </div>
        </section>

        {/* Takeaway */}
        <section className="mt-6 border border-[#3B8CFF]/30 p-5 md:mt-8 md:p-7">
          <SheetLabel code="07">Takeaway</SheetLabel>
          <p className="mt-5 w-full text-base leading-relaxed text-white md:text-lg">
            {study.takeaway}
          </p>
        </section>

        {/* Next / revision block */}
        <footer className="mt-6 grid gap-0 border border-[#3B8CFF]/30 md:mt-8 md:grid-cols-[1fr_auto]">
          <div className="border-b border-[#3B8CFF]/30 p-5 md:border-b-0 md:border-r md:p-7">
            <SheetLabel code="08">Next sheet</SheetLabel>
            <div className="mt-5 flex flex-col gap-3 font-mono text-[12px] uppercase tracking-[0.16em]">
              {next ? (
                <Link
                  href={`/work/${next}`}
                  className="w-fit text-[#3B8CFF] transition-opacity hover:opacity-80"
                >
                  → {nextTitle ?? "Next project"}
                </Link>
              ) : null}
              <Link
                href="/work"
                className="w-fit text-[#3B8CFF]/70 transition-opacity hover:opacity-100"
              >
                → All work
              </Link>
            </div>
          </div>
          <div className="flex items-end p-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/45 md:p-7">
            <p>
              End of drawing
              <span className="mt-1 block text-[#3B8CFF]/70">MB / {sheetId}</span>
            </p>
          </div>
        </footer>
      </div>
    </CaseStudyLayout>
  );
}
