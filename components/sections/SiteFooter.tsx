"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { sectionRevealTransition, sectionRevealViewport } from "@/lib/motion";

export function SiteFooter() {
  const reduce = Boolean(useReducedMotion());

  return (
    <motion.footer
      className="border-t border-[#39ff88]/12 bg-[#000000] py-14 text-left"
      style={{ paddingBottom: "max(3.5rem, env(safe-area-inset-bottom))" }}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={sectionRevealViewport}
      transition={sectionRevealTransition(reduce)}
    >
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-7 sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:px-10">
        <div>
          <p className="text-sm text-[#A1A1A1]">Michael Brylinski</p>
          <p className="mt-2 max-w-sm text-sm text-white/45">
            Developer &amp; UX engineer — performance, systems, and product craft.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#A1A1A1]">
          <Link href="/work" className="text-[#39ff88] transition-opacity hover:opacity-80">
            Work
          </Link>
          <Link href="/contact" className="text-[#39ff88] transition-opacity hover:opacity-80">
            Contact
          </Link>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-[1100px] px-7 text-xs text-white/35 sm:px-8 lg:px-10">
        © {new Date().getFullYear()} Michael Brylinski
      </p>
    </motion.footer>
  );
}
