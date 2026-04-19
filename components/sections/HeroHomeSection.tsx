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
import { appleEase } from "@/lib/motion";

export function HeroHomeSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const reduceBool = Boolean(reduce);

  const heroContainer = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduceBool ? 0 : 0.11,
          delayChildren: reduceBool ? 0 : 0.12,
        },
      },
    }),
    [reduceBool],
  );

  const heroItem = useMemo(
    () => ({
      hidden: { opacity: reduceBool ? 1 : 0, y: reduceBool ? 0 : 36 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: reduceBool ? 0 : 1, ease: appleEase },
      },
    }),
    [reduceBool],
  );
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 14]);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative min-h-[100dvh] scroll-mt-24 overflow-hidden border-b border-[#39ff88]/10 bg-[#000000]"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY }}
        aria-hidden
      >
        <Image
          src="/hero-michael-brylinski.png"
          alt="Michael Brylinski — developer and UX engineer, professional portrait"
          fill
          priority
          fetchPriority="high"
          quality={96}
          sizes="100vw"
          className="object-cover object-[72%_28%] sm:object-[68%_center] lg:object-[65%_center]"
        />
        {/* Lighter read-side scrim so the photo stays sharp and premium */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/15 sm:from-black/90 sm:via-black/50 sm:to-transparent" />
        <div className="absolute inset-0 bg-black/20 sm:bg-black/[0.06]" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[1100px] flex-col justify-center px-7 py-24 sm:px-8 lg:px-10">
        <motion.div
          className="mx-auto w-full max-w-xl text-center"
          variants={heroContainer}
          initial={reduceBool ? false : "hidden"}
          animate="visible"
        >
          <motion.p
            variants={heroItem}
            className="text-sm font-medium text-white/90 md:text-[15px]"
          >
            Developer &amp; UX Engineer
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="mt-4 text-[clamp(2.1rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-white"
          >
            High-performance web experiences for brands that expect more
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="mx-auto mt-6 max-w-md text-base leading-relaxed text-[#A1A1A1] md:text-lg"
          >
            Systems, interfaces, and performance — engineered with the same care
            as a product launch.
          </motion.p>
          <motion.div
            variants={heroItem}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
          >
            <Link
              href="/work"
              className="inline-flex min-h-[48px] min-w-[180px] items-center justify-center rounded-full bg-[#39ff88] px-8 py-3 text-sm font-semibold text-[#050505] transition-opacity duration-300 hover:opacity-90"
            >
              View Work
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] min-w-[180px] items-center justify-center rounded-full border border-[#39ff88]/45 px-8 py-3 text-sm font-medium text-[#39ff88] transition-opacity duration-300 hover:opacity-85"
            >
              Start a Project
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
