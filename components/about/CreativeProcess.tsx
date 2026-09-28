"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FrameCorners } from "@/components/ui/FieldNotes";
import { appleEase } from "@/lib/motion";

const STEPS = [
  { code: "01", label: "Start with the idea.", prompt: "idea" },
  { code: "02", label: "Understand the problem.", prompt: "problem" },
  { code: "03", label: "Build something.", prompt: "build" },
  { code: "04", label: "Test it.", prompt: "test" },
  { code: "05", label: "Listen.", prompt: "listen" },
  { code: "06", label: "Find what's wrong.", prompt: "diagnose" },
  { code: "07", label: "Iterate.", prompt: "iterate" },
  { code: "08", label: "Make it better.", prompt: "refine" },
  { code: "09", label: "Then ship it.", prompt: "ship" },
] as const;

const ROW = 44;

export function CreativeProcess() {
  const reduce = Boolean(useReducedMotion());
  const rootRef = useRef<HTMLOListElement>(null);
  const inView = useInView(rootRef, { amount: 0.45 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % STEPS.length);
    }, 980);
    return () => window.clearInterval(timer);
  }, [reduce, inView]);

  const step = STEPS[reduce ? STEPS.length - 1 : active];

  return (
    <div className="relative overflow-hidden border border-[#3B8CFF]/30 bg-[#030910]">
      <FrameCorners size="sm" />
      <div className="flex items-center justify-between border-b border-[#3B8CFF]/20 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/70">
        <span>Creative process</span>
        <span className="flex items-center gap-2">
          <motion.span
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#3B8CFF]"
            animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          {reduce ? "Ready" : "In motion"}
        </span>
      </div>

      <div className="flex items-center gap-2 border-b border-[#3B8CFF]/20 px-4 py-3 font-mono text-[12px] text-[#9cb6d4] sm:text-[13px]">
        <span className="text-[#3B8CFF]">$</span>
        <motion.span
          key={step.prompt}
          className="text-white/85"
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.28, ease: appleEase }}
        >
          {step.prompt}
        </motion.span>
        {reduce ? null : (
          <motion.span
            className="inline-block h-[1em] w-[7px] translate-y-[1px] bg-[#3B8CFF]"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            aria-hidden
          />
        )}
      </div>

      <ol ref={rootRef} className="relative">
        {reduce ? null : (
          <motion.div
            className="pointer-events-none absolute inset-x-1 top-0 border border-[#3B8CFF]/45 bg-[#3B8CFF]/10"
            style={{ height: ROW }}
            animate={{ y: active * ROW }}
            transition={{ duration: 0.42, ease: appleEase }}
            aria-hidden
          />
        )}
        {STEPS.map((item, index) => {
          const on = reduce || index === active;
          const passed = !reduce && index < active;
          return (
            <li
              key={item.code}
              className="relative grid items-center gap-3 px-4"
              style={{ height: ROW, gridTemplateColumns: "2.25rem minmax(0,1fr)" }}
            >
              <span
                className={`font-mono text-[10px] tracking-[0.16em] ${
                  on ? "text-[#3B8CFF]" : passed ? "text-[#3B8CFF]/55" : "text-[#3B8CFF]/30"
                }`}
              >
                {item.code}
              </span>
              <span
                className={`text-sm font-medium md:text-[15px] ${
                  on ? "text-white" : passed ? "text-[#9cb6d4]" : "text-[#9cb6d4]/35"
                }`}
              >
                {item.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
