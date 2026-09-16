"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

const accent = "#3B8CFF";

function Twinkle({
  cx,
  cy,
  delay,
  frozen,
}: {
  cx: number;
  cy: number;
  delay: number;
  frozen: boolean;
}) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={1.1}
      fill="white"
      fillOpacity={frozen ? 0.35 : 0.4}
      initial={false}
      animate={
        frozen
          ? undefined
          : { opacity: [0.15, 0.95, 0.15], scale: [0.85, 1.2, 0.85] }
      }
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

const CODE_LINES: { key: string; parts: readonly { text: string; dim?: boolean }[] }[] = [
  {
    key: "l1",
    parts: [
      { text: "const ", dim: true },
      { text: "intent" },
      { text: " = ", dim: true },
      { text: "await " },
      { text: "discover", dim: true },
      { text: "(users);" },
    ],
  },
  {
    key: "l2",
    parts: [
      { text: "await ", dim: true },
      { text: "craft" },
      { text: "(intent, ", dim: true },
      { text: "{ perf: 95 }" },
      { text: ");", dim: true },
    ],
  },
  {
    key: "l3",
    parts: [
      { text: "metrics.", dim: true },
      { text: "refineUntil" },
      { text: "(intent); ", dim: true },
    ],
  },
];

export function ProcessCodeEditor({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const reduce = Boolean(reduceMotion);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, {
    amount: 0.08,
    margin: "0px 0px -18% 0px",
  });
  const active = inView && !reduce;

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative flex w-full max-w-[min(100%,340px)] items-center justify-center sm:max-w-[360px] lg:max-w-[400px] lg:justify-end",
        className,
      )}
      aria-hidden
    >
      <div className="relative aspect-[5/4] w-full min-w-[260px] max-w-[300px] sm:min-w-[280px] sm:max-w-[320px]">
        <div className="pointer-events-none absolute inset-0 rounded-[1.25rem] bg-[#3B8CFF]/[0.05] blur-2xl" />

        <svg
          className="absolute inset-[6%] h-[88%] w-[88%] text-white/[0.09]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M28 168 Q100 100 172 36"
            stroke="currentColor"
            strokeWidth="0.45"
            strokeDasharray="3 10"
            opacity={0.6}
          />
        </svg>

        <Twinkle cx={36} cy={44} delay={0} frozen={reduce} />
        <Twinkle cx={164} cy={56} delay={0.35} frozen={reduce} />
        <Twinkle cx={124} cy={32} delay={0.8} frozen={reduce} />

        <motion.div
          className="absolute inset-[10%] flex items-center justify-center"
          animate={
            reduce
              ? { x: 0, y: 0, rotate: 0, scale: 1 }
              : inView
                ? {
                    x: [0, 10, 4, 0],
                    y: [0, -12, -4, 0],
                    rotate: [0, -1.2, -0.4, 0],
                    scale: [1, 1.03, 1.01, 1],
                  }
                : { x: 0, y: 0, rotate: 0, scale: 1 }
          }
          transition={{
            duration: 4.8,
            repeat: active ? Infinity : 0,
            ease: [0.45, 0.05, 0.55, 0.95],
            times: [0, 0.2, 0.38, 1],
          }}
        >
          <div
            className="relative w-full overflow-hidden rounded-2xl border border-[#3B8CFF]/25 bg-[#050505]/90 shadow-[0_0_36px_-10px_rgba(59,140,255,0.22)] backdrop-blur-md"
            style={{ boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.04)` }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,140,255,0.5) 2px, rgba(59,140,255,0.5) 3px)",
              }}
              animate={active ? { y: [0, 8, 0] } : { y: 0 }}
              transition={{ duration: 3.2, repeat: active ? Infinity : 0, ease: "linear" }}
            />

            <div className="relative flex items-center gap-2 border-b border-white/[0.08] px-3 py-2 sm:px-4">
              <span className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/[0.12]" />
                <span className="h-2 w-2 rounded-full bg-white/[0.12]" />
                <span className="h-2 w-2 rounded-full bg-[#3B8CFF]/35" />
              </span>
              <span className="ml-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 sm:text-[10px]">
                process.ts
              </span>
            </div>

            <div className="relative space-y-2.5 px-3 py-3.5 font-mono text-[11px] leading-relaxed tracking-tight text-[#d4d4d4] sm:space-y-3 sm:px-4 sm:py-4 sm:text-xs md:text-[13px] md:leading-relaxed">
              {CODE_LINES.map((line, lineIndex) => (
                <div key={line.key} className="flex min-h-[1.25em] items-start gap-2 sm:gap-2.5">
                  <span className="w-4 shrink-0 select-none text-right text-white/25 sm:w-5">
                    {lineIndex + 1}
                  </span>
                  <motion.div
                    className="min-w-0 flex-1"
                    animate={
                      reduce
                        ? { opacity: 0.9 }
                        : active
                          ? {
                              opacity: [0.35, 1, 1, 0.42],
                            }
                          : { opacity: 0.55 }
                    }
                    transition={{
                      duration: 3.6,
                      repeat: active ? Infinity : 0,
                      ease: "easeInOut",
                      delay: reduce ? 0 : lineIndex * 0.38,
                      times: [0, 0.12, 0.55, 1],
                    }}
                  >
                    <motion.span
                      className="block overflow-hidden rounded-sm"
                      animate={
                        reduce || !active
                          ? {}
                          : {
                              boxShadow: [
                                "0 0 0 0 rgba(59,140,255,0)",
                                "0 0 20px -2px rgba(59,140,255,0.12)",
                                "0 0 0 0 rgba(59,140,255,0)",
                              ],
                            }
                      }
                      transition={{
                        duration: 3.6,
                        repeat: active ? Infinity : 0,
                        delay: lineIndex * 0.38,
                      }}
                    >
                      {line.parts.map((part, pi) => (
                        <span
                          key={pi}
                          className={part.dim ? "text-white/38" : undefined}
                          style={!part.dim ? { color: accent } : undefined}
                        >
                          {part.text}
                        </span>
                      ))}
                    </motion.span>
                  </motion.div>
                </div>
              ))}

              <div className="flex items-start gap-2 sm:gap-2.5">
                <span className="w-4 shrink-0 sm:w-5" />
                <span className="flex items-center gap-0.5 pt-0.5 font-mono text-[10px] sm:text-[11px] md:text-xs">
                  <motion.span
                    className="inline-block h-3.5 w-[2px] rounded-[1px] sm:h-4"
                    style={{ backgroundColor: accent }}
                    animate={
                      active
                        ? { opacity: [1, 1, 0, 0, 1] }
                        : reduce
                          ? { opacity: 0.85 }
                          : { opacity: [1, 0.3, 1] }
                    }
                    transition={
                      active
                        ? { duration: 1.05, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                    }
                  />
                  <span className="text-white/25"> </span>
                </span>
              </div>
            </div>

            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#3B8CFF]/40 to-transparent"
              animate={active ? { opacity: [0.25, 0.85, 0.25], scaleX: [0.92, 1, 0.92] } : { opacity: 0.35 }}
              transition={{ duration: 2.4, repeat: active ? Infinity : 0, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
