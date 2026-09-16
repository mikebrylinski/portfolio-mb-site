"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AppleStaggerChild, AppleStaggerRoot } from "@/components/layout/AppleStagger";
import { ScrollSection } from "@/components/layout/ScrollSection";
import { AboutPortrait } from "@/components/sections/AboutPortrait";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { appleEase } from "@/lib/motion";
import { siteContainerClass } from "@/lib/site";

const whatIDo = [
  {
    title: "Full-Stack Development",
    body: "Modern web applications, SaaS platforms, APIs, databases, authentication, payments, and cloud infrastructure.",
  },
  {
    title: "AI & Automation",
    body: "AI-powered applications, LLM integrations, intelligent workflows, AI assistants, data-driven features, and automation.",
  },
  {
    title: "Product Development",
    body: "Taking ideas from early concepts and prototypes through architecture, development, deployment, and iteration.",
  },
  {
    title: "Web & Digital Experiences",
    body: "High-performance websites, custom CMS platforms, e-commerce, SEO, analytics, and conversion-focused experiences.",
  },
  {
    title: "Design + Development",
    body: "Bridging the gap between how something looks and how it actually works.",
  },
  {
    title: "Motion Graphics / Video Production",
    body: "Motion design, video production, and animated storytelling for brands, products, and digital experiences.",
  },
] as const;

const pipelineSteps = [
  "Idea",
  "Design",
  "Architecture",
  "Development",
  "AI Integration",
  "Deployment",
  "Growth",
] as const;

function FrameCorners() {
  return (
    <>
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
    </>
  );
}

function SheetLabel({
  code,
  children,
}: {
  code: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-[#3B8CFF]">
        {code}
      </span>
      <span className="h-px w-8 bg-[#3B8CFF]/40" aria-hidden />
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#3B8CFF]/90">
        {children}
      </p>
    </div>
  );
}

function PipelineLine() {
  const reduce = Boolean(useReducedMotion());

  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-sm font-medium uppercase tracking-[0.06em] text-white md:text-[15px]">
      {pipelineSteps.map((step, i) => (
        <motion.span
          key={step}
          className="inline-flex items-center gap-x-2"
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: reduce ? 0 : 0.45,
            delay: reduce ? 0 : 0.08 + i * 0.06,
            ease: appleEase,
          }}
        >
          <span className="border border-[#3B8CFF]/25 px-2 py-0.5">{step}</span>
          {i < pipelineSteps.length - 1 ? (
            <span className="text-[#3B8CFF]/70" aria-hidden>
              →
            </span>
          ) : null}
        </motion.span>
      ))}
    </p>
  );
}

function StaggerCopy({ children }: { children: ReactNode }) {
  const reduce = Boolean(useReducedMotion());

  return (
    <motion.div
      className="w-full space-y-5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduce ? 0 : 0.09,
            delayChildren: reduce ? 0 : 0.06,
          },
        },
      }}
    >
      {Children.map(children, (child, i) => (
        <motion.div
          key={i}
          className="w-full"
          variants={{
            hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 14 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: reduce ? 0 : 0.65, ease: appleEase },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

function AboutNarrativeBlock({
  title,
  children,
  index,
  code,
}: {
  title: string;
  children: ReactNode;
  index: number;
  code: string;
}) {
  const reduce = Boolean(useReducedMotion());

  return (
    <motion.article
      className="w-full border-t border-[#3B8CFF]/20 py-12 md:py-16"
      initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -6% 0px" }}
      transition={{
        duration: reduce ? 0 : 0.9,
        delay: reduce ? 0 : index * 0.05,
        ease: appleEase,
      }}
    >
      <div className={siteContainerClass}>
        <SheetLabel code={code}>{`Detail ${String(index + 1).padStart(2, "0")}`}</SheetLabel>
        <motion.h3
          className="mt-4 w-full text-[clamp(1.5rem,3.4vw,2.25rem)] font-medium uppercase tracking-tight text-white"
          initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: reduce ? 0 : 0.7, ease: appleEase }}
        >
          {title}
        </motion.h3>
        <div className="mt-5 w-full text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
          <StaggerCopy>{children}</StaggerCopy>
        </div>
      </div>
    </motion.article>
  );
}

export function AboutChapterSection() {
  const reduce = Boolean(useReducedMotion());

  return (
    <ScrollSection
      id="about"
      className="relative overflow-hidden border-white/10 bg-[#06101c]"
    >
      <div
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-70"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(59,140,255,0.07),transparent_50%)]"
        aria-hidden
      />

      <div className={`relative z-[1] ${siteContainerClass} text-left`}>
        <div className="relative border border-[#3B8CFF]/25 px-5 py-8 sm:px-7 sm:py-10 md:px-8">
          <FrameCorners />

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#3B8CFF]/75">
              Sheet B — About
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/45">
              Studio → Stack
            </p>
          </div>

          <AppleStaggerRoot>
            <AppleStaggerChild>
              <SectionEyebrow>About</SectionEyebrow>
            </AppleStaggerChild>
            <AppleStaggerChild>
              <h2 className="mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
                From the studio
                <span className="mt-1 block text-[#3B8CFF]">to the stack.</span>
              </h2>
            </AppleStaggerChild>
          </AppleStaggerRoot>

          <div className="mt-12 flex flex-col items-center gap-12 lg:mt-14 lg:flex-row lg:items-start lg:gap-14 xl:gap-16">
            <div className="relative mx-auto w-full max-w-[min(100%,300px)] shrink-0 sm:max-w-[340px] lg:mx-0 lg:sticky lg:top-28 lg:max-w-[min(38vw,360px)]">
              <div className="relative border border-[#3B8CFF]/30 p-2">
                <span
                  className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-[#3B8CFF]"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-[#3B8CFF]"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-[#3B8CFF]"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-[#3B8CFF]"
                  aria-hidden
                />
                <AboutPortrait className="w-full" />
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/60">
                  Fig. P — Portrait
                </p>
              </div>
            </div>

            <div className="min-w-0 w-full max-w-2xl flex-1 space-y-5 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px] lg:max-w-none">
              <SheetLabel code="01">Origin</SheetLabel>
              <p>
                I&apos;m a full-stack developer, designer, and builder with a background
                that started far away from traditional software development.
              </p>
              <p>
                Before writing production code, I spent years working in recording
                studios and touring the world with artists and production teams.
                I&apos;ve worked behind the scenes in music, built digital experiences
                for artists, managed studio environments, and learned what it takes to
                keep complex systems running when there&apos;s no room for things to
                break.
              </p>
              <p>That experience shaped the way I approach technology today.</p>
              <p className="border border-[#3B8CFF]/20 bg-[#3B8CFF]/5 px-4 py-3 text-white">
                I think in terms of{" "}
                <span className="text-[#3B8CFF]">systems, experiences, and outcomes</span>{" "}
                — not just code.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-[1] mt-10 border-y border-[#3B8CFF]/25 md:mt-12">
        <AboutNarrativeBlock
          title="Building for the web. Building with AI."
          index={0}
          code="02"
        >
          <p>
            Today, I focus on full-stack development, AI-powered products, SaaS
            platforms, and modern web experiences.
          </p>
          <p>
            I work across the stack, from{" "}
            <span className="text-white/90">
              React, Next.js, Node.js, and TypeScript
            </span>{" "}
            to cloud infrastructure, databases, APIs, authentication, payments,
            analytics, and AI integrations.
          </p>
          <p>
            I build products using technologies including{" "}
            <span className="text-white/90">
              AWS, Vercel, Supabase, Firebase, MongoDB, MySQL, OpenAI, Google
              Gemini, and AWS Bedrock
            </span>
            , while choosing the right tools for the problem rather than forcing
            every project into the same stack.
          </p>
          <p>
            I&apos;m particularly interested in the intersection of{" "}
            <span className="text-[#3B8CFF]">AI + product development</span> —
            taking an idea from concept to working product and finding practical
            ways AI can make software more useful, intelligent, and automated.
          </p>
        </AboutNarrativeBlock>

        <AboutNarrativeBlock title="More than a developer." index={1} code="03">
          <p>
            My background in design, UX, SEO, digital media, and production gives
            me a broader perspective than writing code alone.
          </p>
          <p>I can take a project from:</p>
          <PipelineLine />
          <p>
            That means I&apos;m comfortable jumping between strategy, UI, backend
            architecture, databases, APIs, infrastructure, content, and the
            details that make a product actually work.
          </p>
        </AboutNarrativeBlock>

        <AboutNarrativeBlock
          title="I like building things that are real."
          index={2}
          code="04"
        >
          <p>
            Some of my recent work includes building SaaS platforms with real-time
            video, AI coaching systems, custom dashboards, marketing websites,
            AI-powered applications, and tools designed around specific business
            problems.
          </p>
          <p>
            I&apos;m most interested in projects where technology isn&apos;t the
            end goal.
          </p>
          <p className="text-white">
            The goal is to build something{" "}
            <span className="text-[#3B8CFF]">useful</span>.
          </p>
          <p>
            Whether that means launching a new SaaS product, rebuilding an
            existing platform, adding AI to an established workflow, or turning an
            idea into a working MVP, I bring the same approach I learned in the
            studio and on the road:
          </p>
          <p className="border border-[#3B8CFF]/25 bg-[#3B8CFF]/5 px-4 py-3 font-mono text-sm font-medium uppercase tracking-[0.08em] text-white md:text-[15px]">
            Understand the system. Solve the problem. Build it well.
          </p>
        </AboutNarrativeBlock>
      </div>

      <div className={`relative z-[1] ${siteContainerClass} text-left`}>
        <motion.div
          className="relative mt-10 border border-[#3B8CFF]/25 px-5 py-8 sm:px-7 sm:py-10 md:mt-12 md:px-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: reduce ? 0 : 0.1,
                delayChildren: reduce ? 0 : 0.04,
              },
            },
          }}
        >
          <FrameCorners />

          <motion.div
            variants={{
              hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: reduce ? 0 : 0.7, ease: appleEase },
              },
            }}
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <SheetLabel code="05">What I Do</SheetLabel>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/45">
                Spec set · 06 items
              </p>
            </div>
            <SectionEyebrow>Capabilities</SectionEyebrow>
          </motion.div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {whatIDo.map((item, i) => (
              <motion.article
                key={item.title}
                className="group relative border border-[#3B8CFF]/20 bg-[#06101c]/60 p-5 transition-[border-color] hover:border-[#3B8CFF]/45"
                variants={{
                  hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 22 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: reduce ? 0 : 0.75, ease: appleEase },
                  },
                }}
              >
                <span
                  className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t border-[#3B8CFF]/70"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-[#3B8CFF]/70"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#3B8CFF]/70"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[#3B8CFF]/70"
                  aria-hidden
                />

                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] font-medium tabular-nums tracking-[0.18em] text-[#3B8CFF]/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-medium uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-[#3B8CFF] md:text-lg">
                    {item.title}
                  </h3>
                </div>

                <motion.p
                  className="mt-3 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]"
                  initial={{ opacity: reduce ? 1 : 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: reduce ? 0 : 0.6,
                    delay: reduce ? 0 : 0.2 + i * 0.05,
                    ease: appleEase,
                  }}
                >
                  {item.body}
                </motion.p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </ScrollSection>
  );
}
