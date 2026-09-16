"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { appleEase } from "@/lib/motion";

export function FrameCorners({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3";
  const w = size === "sm" ? "border" : "border-2";
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      <span className={`absolute left-0 top-0 ${dim} ${w} border-b-0 border-r-0 border-[#3B8CFF]/80`} />
      <span className={`absolute right-0 top-0 ${dim} ${w} border-b-0 border-l-0 border-[#3B8CFF]/80`} />
      <span className={`absolute bottom-0 left-0 ${dim} ${w} border-t-0 border-r-0 border-[#3B8CFF]/80`} />
      <span className={`absolute bottom-0 right-0 ${dim} ${w} border-t-0 border-l-0 border-[#3B8CFF]/80`} />
    </div>
  );
}

export function SheetLabel({
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
      <span className="h-px max-w-[3rem] flex-1 bg-[#3B8CFF]/40" aria-hidden />
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#3B8CFF]/90">
        {children}
      </p>
    </div>
  );
}

export function FieldLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#3B8CFF]/85",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Decorative coordinates / drawing marks — not presented as facts. */
export function AestheticNote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "hidden font-mono text-[9px] uppercase tracking-[0.18em] text-[#3B8CFF]/40 sm:block",
        className,
      )}
      aria-hidden
    >
      {children}
    </p>
  );
}

export function BlueprintPath({
  steps,
  className,
}: {
  steps: readonly string[];
  className?: string;
}) {
  const reduce = Boolean(useReducedMotion());

  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-white sm:text-xs",
        className,
      )}
    >
      {steps.map((step, i) => (
        <motion.li
          key={step}
          className="inline-flex items-center gap-x-2"
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: reduce ? 0 : 0.45,
            delay: reduce ? 0 : 0.06 + i * 0.05,
            ease: appleEase,
          }}
        >
          <span className="border border-[#3B8CFF]/30 px-2 py-0.5">{step}</span>
          {i < steps.length - 1 ? (
            <span className="text-[#3B8CFF]/70" aria-hidden>
              →
            </span>
          ) : null}
        </motion.li>
      ))}
    </ol>
  );
}
