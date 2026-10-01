"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { HeroDevAnimation } from "@/components/sections/HeroDevAnimation";
import { appleEase } from "@/lib/motion";
import { siteContainerClass } from "@/lib/site";

export function HeroHomeSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const reduceBool = Boolean(reduce);

  const heroContainer = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduceBool ? 0 : 0.1,
          delayChildren: reduceBool ? 0 : 0.08,
        },
      },
    }),
    [reduceBool],
  );

  const heroItem = useMemo(
    () => ({
      hidden: { opacity: reduceBool ? 1 : 0, y: reduceBool ? 0 : 28 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: reduceBool ? 0 : 0.9, ease: appleEase },
      },
    }),
    [reduceBool],
  );

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 36]);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative scroll-mt-24 overflow-hidden bg-[#020617] lg:min-h-[100dvh]"
    >
      <motion.div className="absolute inset-0" style={{ y: imageY }} aria-hidden>
        <Image
          src="/hero-mountain.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={90}
          sizes="100vw"
          className="scale-105 object-cover object-[center_50%] saturate-[0.78] contrast-[1.05] brightness-[0.82]"
        />
        <div className="absolute inset-0 bg-[#020617]/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c4a6e]/25 via-transparent to-[#020617]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/60 via-[#020617]/20 to-[#020617]/25" />
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#020617]/80 via-[#020617]/35 to-transparent" />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#020617]/45 via-[#020617]/12 to-transparent"
        aria-hidden
      />

      <div
        className={`${siteContainerClass} relative z-10 flex flex-col justify-center py-16 sm:py-20 lg:min-h-[100dvh] lg:py-24`}
      >
        <div className="grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          <motion.div
            className="mx-auto w-full max-w-xl shrink-0 text-center lg:mx-0 lg:max-w-none lg:text-left"
            variants={heroContainer}
            initial={false}
            animate="visible"
          >
            <motion.p
              variants={heroItem}
              className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#3B8CFF]/80"
            >
              Michael Brylinski
            </motion.p>

            <motion.h1
              variants={heroItem}
              className="mt-4 text-[clamp(1.85rem,5.6vw,4.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]"
            >
              <span className="block text-white">Senior</span>
              <span className="block text-[#3B8CFF]">Full-Stack / Product Engineer</span>
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg lg:mx-0"
            >
              I build and ship production SaaS, web applications, and
              AI-powered products—from UX and frontend architecture through
              APIs, databases, cloud infrastructure, and deployment.
            </motion.p>

            <motion.p
              variants={heroItem}
              className="mt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#3B8CFF]/85 sm:text-[11px] sm:tracking-[0.14em]"
            >
              React · Next.js · TypeScript · Node.js · PostgreSQL · AWS · AI
            </motion.p>

            <motion.p
              variants={heroItem}
              className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70"
            >
              Remote · Full-Time · W-2
            </motion.p>

            <motion.div
              variants={heroItem}
              className="mt-6 flex justify-center lg:justify-start"
            >
              <Link
                href="/#contact"
                onClick={(e) => {
                  const el = document.getElementById("contact");
                  if (!el) return;
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-md border border-[#3B8CFF] bg-[#3B8CFF]/10 px-7 py-3 text-sm font-medium uppercase tracking-[0.12em] text-white transition-[background-color] hover:bg-[#3B8CFF]/20"
              >
                Get in touch
                <span aria-hidden className="text-[#3B8CFF]">
                  →
                </span>
              </Link>
            </motion.div>

            <motion.div variants={heroItem} className="mt-8">
              <ul className="grid grid-cols-2 items-stretch gap-1.5 md:grid-cols-4">
                {[
                  "15+ Years Experience",
                  "End-to-End Product Ownership",
                  "SaaS + AI + Ecommerce",
                  "Remote / US",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex h-full items-center justify-center border border-[#3B8CFF]/30 bg-[#020617]/35 px-2 py-2 text-center font-mono text-[8px] uppercase leading-snug tracking-[0.08em] text-[#c8dff7] sm:text-[9px] sm:tracking-[0.1em]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

          </motion.div>

          <motion.div
            className="mt-2 w-full max-w-sm shrink-0 justify-self-center sm:mt-0 sm:max-w-md lg:max-w-none lg:justify-self-end"
            aria-hidden
            initial={reduceBool ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceBool ? 0 : 0.85, ease: appleEase, delay: 0.18 }}
          >
            <HeroDevAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
