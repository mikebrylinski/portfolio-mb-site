"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CaseStudyHeroMedia } from "@/components/case-study/CaseStudyMedia";
import { CaseStudyLayout } from "@/components/layout/CaseStudyLayout";
import { ParallaxLayer } from "@/components/ParallaxLayer";
import { ProcessStepIcon } from "@/components/icons/AccentIcons";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import type { CaseStudy } from "@/content/case-studies";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.95, delay: reduce ? 0 : delay, ease }}
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

  return (
    <CaseStudyLayout>
      <header className="border-b border-[#39ff88]/10 pb-20 pt-28 md:pb-28 md:pt-36">
        <FadeIn>
          <SectionEyebrow>Case study</SectionEyebrow>
          <h1 className="mt-5 text-[clamp(2.1rem,5vw,3.5rem)] font-medium tracking-tight text-white">
            {study.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#A1A1A1] md:text-xl">
            {study.statement}
          </p>
          <p className="mt-6 text-sm text-[#39ff88]/80">{study.meta}</p>
        </FadeIn>
      </header>

      <section className="grid gap-12 border-b border-[#39ff88]/10 py-20 md:grid-cols-2 md:gap-16 md:py-28">
        <FadeIn delay={0.05}>
          <SectionEyebrow>Overview</SectionEyebrow>
          <p className="mt-5 text-base leading-relaxed text-[#A1A1A1] md:text-lg">
            {study.summary}
          </p>
        </FadeIn>
        <FadeIn delay={0.12}>
          <SectionEyebrow>Key results</SectionEyebrow>
          <ul className="mt-5 space-y-4 text-base leading-relaxed text-[#A1A1A1] md:text-lg">
            {study.keyResults.map((line) => (
              <li key={line} className="border-t border-[#39ff88]/12 pt-4 first:border-t-0 first:pt-0">
                {line}
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      <div className="relative left-1/2 my-20 w-screen max-w-[100vw] -translate-x-1/2 md:my-28">
        <ParallaxLayer className="relative h-[min(78vh,920px)] w-full">
          <CaseStudyHeroMedia study={study} />
          {study.visualType !== "video" ? (
            <div className="absolute inset-0 bg-black/20" aria-hidden />
          ) : (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" aria-hidden />
          )}
        </ParallaxLayer>
      </div>

      <section className="border-b border-[#39ff88]/10 py-20 md:py-28">
        <SectionEyebrow>Process</SectionEyebrow>
        <div className="mt-12 space-y-12 md:mt-16 md:space-y-14">
          {study.process.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px", amount: 0.25 }}
              transition={{ duration: reduce ? 0 : 0.85, delay: reduce ? 0 : i * 0.06, ease }}
              className="flex flex-col gap-4 sm:flex-row sm:items-start"
            >
              <div className="shrink-0 pt-1">
                <ProcessStepIcon index={i} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white md:text-xl">{step.title}</h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#A1A1A1]">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="grid gap-12 border-b border-[#39ff88]/10 py-20 md:grid-cols-2 md:gap-16 md:py-28">
        <div>
          <SectionEyebrow>Challenge</SectionEyebrow>
          <p className="mt-5 text-base leading-relaxed text-[#A1A1A1] md:text-lg">
            {study.challenge}
          </p>
        </div>
        <div>
          <SectionEyebrow>Solution</SectionEyebrow>
          <p className="mt-5 text-base leading-relaxed text-[#A1A1A1] md:text-lg">
            {study.solution}
          </p>
        </div>
      </section>

      <section className="border-b border-[#39ff88]/10 py-20 md:py-28">
        <SectionEyebrow>Results</SectionEyebrow>
        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {study.metrics.map((m) => (
            <div key={m.label} className="border-t border-[#39ff88]/15 pt-8 md:border-t-0 md:pt-0">
              <p className="text-[clamp(2.1rem,4vw,3rem)] font-medium tracking-tight text-[#39ff88]">
                {m.value}
              </p>
              <p className="mt-3 text-sm text-[#A1A1A1]">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <SectionEyebrow>Takeaway</SectionEyebrow>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white md:text-xl">
          {study.takeaway}
        </p>
      </section>

      <footer className="border-t border-[#39ff88]/10 py-16 md:py-20">
        <SectionEyebrow>Next</SectionEyebrow>
        <div className="mt-6 flex flex-col gap-4 text-base">
          {next ? (
            <Link
              href={`/work/${next}`}
              className="w-fit text-[#39ff88] transition-opacity hover:opacity-80"
            >
              {nextTitle ?? "Next project"}
            </Link>
          ) : null}
          <Link href="/work" className="w-fit text-[#39ff88] transition-opacity hover:opacity-80">
            All work
          </Link>
        </div>
      </footer>
    </CaseStudyLayout>
  );
}
