"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FrameCorners } from "@/components/ui/FieldNotes";
import { cn } from "@/lib/cn";
import { appleEase } from "@/lib/motion";

export function BrandMark({ className }: { className?: string }) {
  const reduce = Boolean(useReducedMotion());

  return (
    <a
      href="https://mikebweb.dev"
      aria-label="MIKEBWEB.dev"
      className={cn(
        "group relative inline-flex min-h-[44px] items-center gap-1.5 border border-[#3B8CFF]/40 bg-[#06101c]/80 font-bold leading-none tracking-[-0.03em] transition-[border-color,background-color] hover:border-[#3B8CFF]/70 hover:bg-[#06101c]",
        className,
      )}
    >
      <FrameCorners size="sm" />

      <motion.span
        className="inline-flex items-center font-mono text-[0.95em] font-medium tracking-[0.08em] text-[#3B8CFF]"
        aria-hidden
        initial={reduce ? false : { opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: reduce ? 0 : 0.5, ease: appleEase }}
      >
        <span>&lt;</span>
        <motion.span
          className="inline-block"
          animate={reduce ? undefined : { opacity: [1, 0.28, 1] }}
          transition={
            reduce
              ? undefined
              : { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          /
        </motion.span>
        <span>&gt;</span>
      </motion.span>

      <motion.span
        className="inline-flex items-baseline"
        initial={reduce ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : 0.12, ease: appleEase }}
      >
        <span className="text-white">MIKEBWEB</span>
        <span className="text-[#3B8CFF]">.dev</span>
      </motion.span>
    </a>
  );
}
