"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { appleEase, staggerViewport } from "@/lib/motion";

type AppleStaggerRootProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Staggered children reveal (headline rhythm) — runs once when scrolled into view.
 */
export function AppleStaggerRoot({ children, className }: AppleStaggerRootProps) {
  const reduce = Boolean(useReducedMotion());

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={staggerViewport}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : 0.1,
            delayChildren: reduce ? 0 : 0.06,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type AppleStaggerChildProps = {
  children: React.ReactNode;
  className?: string;
};

export function AppleStaggerChild({ children, className }: AppleStaggerChildProps) {
  const reduce = Boolean(useReducedMotion());

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: {
          opacity: reduce ? 1 : 0,
          y: reduce ? 0 : 40,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduce ? 0 : 1,
            ease: appleEase,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
