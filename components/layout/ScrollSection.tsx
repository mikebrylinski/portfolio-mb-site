"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, {
    margin: "0px 0px -12% 0px",
    amount: 0.18,
  });

  const py =
    spacing === "chapter"
      ? "py-[120px] md:py-[160px] lg:py-[200px]"
      : "py-20 md:py-28";

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn("scroll-mt-24 border-b border-[#39ff88]/10", py, className)}
      initial={false}
      animate={{
        opacity: reduce ? 1 : inView ? 1 : 0.38,
        y: reduce ? 0 : inView ? 0 : 12,
      }}
      transition={{ duration: reduce ? 0 : 0.85, ease }}
    >
      {children}
    </motion.section>
  );
}
