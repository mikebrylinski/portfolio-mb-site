"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { sectionRevealTransition, sectionRevealViewport } from "@/lib/motion";

type ScrollSectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Extra vertical padding (chapter rhythm) */
  spacing?: "chapter" | "tight";
};

export function ScrollSection({
  id,
  children,
  className,
  spacing = "chapter",
}: ScrollSectionProps) {
  const reduce = Boolean(useReducedMotion());

  const py =
    spacing === "chapter"
      ? "py-[120px] md:py-[160px] lg:py-[200px]"
      : "py-20 md:py-28";

  return (
    <section
      id={id}
      className={cn("scroll-mt-24 border-b border-[#3B8CFF]/10", py, className)}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 48 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={sectionRevealViewport}
        transition={sectionRevealTransition(reduce)}
      >
        {children}
      </motion.div>
    </section>
  );
}
