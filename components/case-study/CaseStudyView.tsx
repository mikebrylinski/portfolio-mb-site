"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CaseStudyLogo } from "@/components/case-study/CaseStudyLogo";
import {
  CaseStudyDeviceMockups,
  CaseStudyHeroMedia,
} from "@/components/case-study/CaseStudyMedia";
import { CaseStudyLayout } from "@/components/layout/CaseStudyLayout";
import { ContactChapterSection } from "@/components/sections/ContactChapterSection";
import {
  BlueprintPath,
  FieldLabel,
  FrameCorners,
  SheetLabel,
} from "@/components/ui/FieldNotes";
import type { CaseStudy } from "@/content/case-studies";
import { cn } from "@/lib/cn";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BUILD_STAGES = [
  "Concept",
  "Architecture",
  "Implementation",
  "Deployment",
] as const;

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
    <>
      <CaseStudyLayout>
        <div className="relative overflow-hidden border border-[#3B8CFF]/35 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
          <FrameCorners />

        <header className="relative grid gap-0 overflow-hidden border border-[#3B8CFF]/30 md:grid-cols-[1fr_minmax(220px,280px)]">
          {study.heroBgSrc ? (
            <>
              <Image
                src={study.heroBgSrc}
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1100px"
                className="object-cover object-center"
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-[#06101c]/78 md:bg-[#06101c]/72"
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#06101c]/90 via-[#06101c]/55 to-[#06101c]/75"
                aria-hidden
              />
            </>
          ) : null}

          <FadeIn
            className={cn(
              "relative z-[1] border-b border-[#3B8CFF]/30 p-5 md:border-b-0 md:border-r md:p-7",
              study.heroBgSrc && "backdrop-blur-[1px]",
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <FieldLabel>Case study {study.code}</FieldLabel>
              {study.logoSrc ? (
                <CaseStudyLogo
                  src={study.logoSrc}
                  alt={study.logoAlt ?? `${study.title} logo`}
                  size="hero"
                />
              ) : null}
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/80">
              {study.category}
            </p>
            <h1 className="mt-4 text-[clamp(1.85rem,4.5vw,3.15rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
              {study.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-white/90 md:text-[15px]">
              {study.headline}
            </p>
            <p className="mt-4 max-w-xl font-mono text-[10px] uppercase tracking-[0.14em] text-[#9cb6d4]">
              {study.techLine}
            </p>
          </FadeIn>

          <FadeIn
            delay={0.08}
            className={cn(
              "relative z-[1] grid font-mono text-[10px] uppercase tracking-[0.16em] text-[#3B8CFF]/80",
              study.heroBgSrc && "bg-[#06101c]/55 backdrop-blur-[2px]",
            )}
          >
            <div className="border-b border-[#3B8CFF]/30 p-4 md:p-5">
              <p className="text-[#3B8CFF]/45">System type</p>
              <p className="mt-1 text-[11px] tracking-[0.1em] text-[#c8dff7]">
                {study.systemType}
              </p>
            </div>
            <div className="border-b border-[#3B8CFF]/30 p-4 md:p-5">
              <p className="text-[#3B8CFF]/45">Role</p>
              <p className="mt-1 text-[11px] tracking-[0.1em] text-[#c8dff7]">
                {study.role}
              </p>
            </div>
            <div className="p-4 md:p-5">
              <p className="text-[#3B8CFF]/45">Status</p>
              <p className="mt-1 flex items-center gap-2 text-[11px] tracking-[0.12em] text-[#c8dff7]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#3B8CFF]" aria-hidden />
                {study.status}
              </p>
            </div>
          </FadeIn>
        </header>

        <section className="mt-6 border border-[#3B8CFF]/30 p-5 md:mt-8 md:p-7">
          <SheetLabel code="01">The challenge</SheetLabel>
          <h2 className="mt-4 text-xl font-medium uppercase tracking-tight text-white md:text-2xl">
            The challenge
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
            {study.challenge}
          </p>
        </section>

        <section className="mt-6 border border-[#3B8CFF]/30 md:mt-8">
          <div className="border-b border-[#3B8CFF]/30 px-5 py-3 md:px-7">
            <SheetLabel code="02">What I built</SheetLabel>
          </div>
          <div className="px-5 py-5 md:px-7">
            <h2 className="text-xl font-medium uppercase tracking-tight text-white md:text-2xl">
              What I built
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
              {study.solution}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
              {study.summary}
            </p>
            <BlueprintPath steps={[...BUILD_STAGES]} className="mt-5" />
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
                className="grid w-full items-start gap-3 px-5 py-6 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-6 md:px-7 md:py-7"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/70">
                  <p>Spec</p>
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

        <section className="mt-6 border border-[#3B8CFF]/30 p-5 md:mt-8 md:p-7">
          <SheetLabel code="03">My role</SheetLabel>
          <h2 className="mt-4 text-xl font-medium uppercase tracking-tight text-white md:text-2xl">
            My role
          </h2>
          <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.16em] text-[#c8dff7]">
            {study.role}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
            End-to-end ownership from concept through architecture, implementation,
            and production deployment — {study.meta.toLowerCase()}.
          </p>
        </section>

        {study.stack.length > 0 ? (
          <section className="mt-6 border border-[#3B8CFF]/30 p-5 md:mt-8 md:p-7">
            <SheetLabel code="04">Technology</SheetLabel>
            <h2 className="mt-4 text-xl font-medium uppercase tracking-tight text-white md:text-2xl">
              Technology
            </h2>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[#3B8CFF]/80">
              {study.techLine}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {study.stack.map((group) => (
                <article
                  key={group.label}
                  className="relative border border-[#3B8CFF]/25 p-4"
                >
                  <FrameCorners size="sm" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]">
                    {group.label}
                  </p>
                  <p className="mt-2 text-sm text-[#c8dff7]">{group.items}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-6 border border-[#3B8CFF]/30 p-5 md:mt-8 md:p-7">
          <SheetLabel code="05">Architecture</SheetLabel>
          <h2 className="mt-4 text-xl font-medium uppercase tracking-tight text-white md:text-2xl">
            Architecture
          </h2>
          <ol className="mt-6 flex w-full flex-col items-stretch gap-0">
            {study.architecture.map((node, i) => (
              <li key={node} className="flex w-full flex-col items-center">
                <span className="flex w-full items-center justify-center border border-[#3B8CFF]/35 bg-[#06101c] px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-white sm:py-3.5 sm:text-xs">
                  {node}
                </span>
                {i < study.architecture.length - 1 ? (
                  <span
                    className="h-6 w-px shrink-0 bg-[#3B8CFF]/40"
                    aria-hidden
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-6 border border-[#3B8CFF]/30 p-5 md:mt-8 md:p-7">
          <SheetLabel code="06">Key features</SheetLabel>
          <h2 className="mt-4 text-xl font-medium uppercase tracking-tight text-white md:text-2xl">
            Key features
          </h2>
          <ul className="mt-6 space-y-0">
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
        </section>

        <section className="mt-6 border border-[#3B8CFF]/30 p-5 md:mt-8 md:p-7">
          <SheetLabel code="07">Result / Outcome</SheetLabel>
          <h2 className="mt-4 text-xl font-medium uppercase tracking-tight text-white md:text-2xl">
            Result / Outcome
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
            {study.outcome}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {study.metrics.map((metric) => (
              <div key={metric.label} className="border border-[#3B8CFF]/20 p-4">
                <p className="text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#3B8CFF]/70">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-base leading-relaxed text-white md:text-lg">
            {study.takeaway}
          </p>
        </section>

        <section className="relative mt-6 overflow-hidden border border-[#3B8CFF]/30 md:mt-8">
          <div className="flex items-center justify-between border-b border-[#3B8CFF]/30 px-5 py-3 md:px-7">
            <SheetLabel code="08">The build</SheetLabel>
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#3B8CFF]/50">
              FIG. A
            </span>
          </div>
          <h2 className="px-5 pt-5 text-xl font-medium uppercase tracking-tight text-white md:px-7 md:text-2xl">
            Screenshots
          </h2>
          <div className="relative mt-4 aspect-[16/10] w-full md:aspect-[21/9]">
            <CaseStudyHeroMedia study={study} />
          </div>
          {study.mockups && study.mockups.length > 0 ? (
            <CaseStudyDeviceMockups mockups={study.mockups} />
          ) : null}
        </section>

        <footer className="mt-6 grid gap-0 border border-[#3B8CFF]/30 md:mt-8 md:grid-cols-[1fr_auto]">
          <div className="border-b border-[#3B8CFF]/30 p-5 md:border-b-0 md:border-r md:p-7">
            <SheetLabel code="09">Next sheet</SheetLabel>
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
      <ContactChapterSection />
    </>
  );
}
