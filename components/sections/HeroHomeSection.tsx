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
              className="mt-4 text-[clamp(2.15rem,7.2vw,4.75rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]"
            >
              <span className="block text-white">Senior</span>
              <span className="block text-[#3B8CFF]">Full-Stack Developer</span>
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/75 md:text-lg lg:mx-0"
            >
              I build production web applications from frontend to backend,
              database, cloud infrastructure, and AI.
            </motion.p>

            <motion.p
              variants={heroItem}
              className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#3B8CFF]/85 sm:text-[11px] sm:tracking-[0.18em]"
            >
              React · Next.js · Node.js · TypeScript · AWS · SQL · AI
            </motion.p>

            <motion.div
              variants={heroItem}
              className="mt-8 flex justify-center lg:justify-start"
            >
              <Link
                href="/#contact"
                onClick={(e) => {
                  const el = document.getElementById("contact");
                  if (!el) return;
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-md border border-[#3B8CFF] bg-[#3B8CFF]/10 px-7 py-3 text-sm font-medium text-white transition-[background-color] hover:bg-[#3B8CFF]/20"
              >
                Get in touch
                <span aria-hidden className="text-[#3B8CFF]">
                  →
                </span>
              </Link>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="mt-8 space-y-2"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
                Remote · Full-Time · W-2
              </p>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#3B8CFF]/70">
                Open to remote full-time W-2 opportunities
              </p>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
                15+ years building digital products
              </p>
            </motion.div>

            <motion.p
              variants={heroItem}
              className="mt-6 hidden font-mono text-[9px] uppercase tracking-[0.18em] text-[#3B8CFF]/35 sm:block"
              aria-hidden
            >
              LAT / 34.0928 · LONG / -118.3287 · REV / 2026.09
            </motion.p>
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
