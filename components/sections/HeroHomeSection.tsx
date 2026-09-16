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
      className="relative min-h-[100dvh] scroll-mt-24 overflow-hidden bg-[#020617]"
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
          className="scale-105 object-cover object-[center_45%] saturate-[0.75] contrast-[1.05] brightness-[0.88]"
        />
        <div className="absolute inset-0 bg-[#020617]/25 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c4a6e]/20 via-transparent to-[#020617]/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/55 via-[#020617]/15 to-[#020617]/20" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#020617]/75 via-[#020617]/35 to-transparent" />
        <div className="absolute inset-x-0 top-[28%] h-40 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent blur-2xl" />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#020617]/50 via-[#020617]/15 to-transparent lg:via-[#020617]/10"
        aria-hidden
      />

      <div
        className={`${siteContainerClass} relative z-10 flex min-h-[100dvh] flex-col justify-center py-24 lg:min-h-[100dvh]`}
      >
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          <motion.div
            className="w-full max-w-xl shrink-0 text-left lg:max-w-none"
            variants={heroContainer}
            initial={reduceBool ? false : "hidden"}
            animate="visible"
          >
            <motion.h1
              variants={heroItem}
              className="text-[clamp(2.75rem,9vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]"
            >
              <span className="block text-white">Mike</span>
              <span className="block text-[#3B8CFF]">Brylinski</span>
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mt-6 text-[11px] font-medium uppercase tracking-[0.28em] text-white/90 sm:text-xs sm:tracking-[0.32em]"
            >
              Full Stack Developer{" "}
              <span className="text-white/40" aria-hidden>
                /
              </span>{" "}
              Creative
            </motion.p>

            <motion.p
              variants={heroItem}
              className="mt-6 max-w-md text-base leading-relaxed text-white/80 md:text-lg"
            >
              I build modern web applications, create digital experiences, and help
              ideas become real.
            </motion.p>

            <motion.div variants={heroItem} className="mt-10">
              <Link
                href="/#work"
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-md border border-[#3B8CFF] bg-transparent px-7 py-3 text-sm font-medium text-white transition-[background-color,border-color] hover:bg-[#3B8CFF]/10"
              >
                View Work
                <span aria-hidden className="text-[#3B8CFF]">
                  →
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full shrink-0 justify-self-center lg:justify-self-end"
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
