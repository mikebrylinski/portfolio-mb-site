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
      r={1.2}
      fill="white"
      fillOpacity={frozen ? 0.4 : 0.45}
      initial={false}
      animate={
        frozen
          ? undefined
          : { opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.25, 0.8] }
      }
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

export function ContactRocket({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const reduce = Boolean(reduceMotion);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35, margin: "0px 0px -10% 0px" });
  const active = inView && !reduce;

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative flex w-full max-w-[min(100%,320px)] items-center justify-center lg:max-w-[380px] lg:justify-end",
        className,
      )}
      aria-hidden
    >
      <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[300px]">
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[#3B8CFF]/[0.04] blur-2xl" />

        <svg
          className="absolute inset-[8%] h-[84%] w-[84%] text-white/10"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M20 180 Q100 120 180 40"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="4 8"
            opacity="0.5"
          />
        </svg>

        <Twinkle cx={42} cy={48} delay={0} frozen={reduce} />
        <Twinkle cx={158} cy={62} delay={0.4} frozen={reduce} />
        <Twinkle cx={128} cy={36} delay={0.9} frozen={reduce} />
        <Twinkle cx={72} cy={28} delay={1.2} frozen={reduce} />

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={
            reduce
              ? { x: 0, y: 0, rotate: -6, scale: 1 }
              : inView
                ? {
                    x: [0, 32, 10, 0],
                    y: [0, -38, -12, 0],
                    rotate: [-6, -18, -10, -6],
                    scale: [1, 1.08, 1.02, 1],
                  }
                : { x: 0, y: 0, rotate: -6, scale: 1 }
          }
          transition={{
            duration: 4.5,
            repeat: active ? Infinity : 0,
            ease: [0.45, 0.05, 0.55, 0.95],
            times: [0, 0.18, 0.32, 1],
          }}
        >
          <svg viewBox="0 0 120 200" className="h-[78%] w-auto drop-shadow-[0_0_24px_rgba(59,140,255,0.15)]">
            <motion.g
              animate={
                active
                  ? { scaleY: [1, 1.35, 1.05, 1], opacity: [0.75, 1, 0.85, 0.75] }
                  : reduce
                    ? { scaleY: 1, opacity: 0.75 }
                    : { scaleY: 1, opacity: 0.75 }
              }
              transition={{ duration: 0.45, repeat: active ? Infinity : 0, ease: "easeInOut" }}
              style={{ transformOrigin: "60px 178px" }}
            >
              <path
                d="M52 168 L60 198 L68 168 Q60 188 52 168Z"
                fill={accent}
                fillOpacity={0.55}
              />
              <path
                d="M56 168 L60 192 L64 168 Q60 182 56 168Z"
                fill="#b8ffd9"
                fillOpacity={0.5}
              />
            </motion.g>

            <path
              d="M38 120 L18 150 L38 145 Z"
              fill="white"
              fillOpacity={0.12}
              stroke="white"
              strokeOpacity={0.2}
              strokeWidth="0.5"
            />
            <path
              d="M82 120 L102 150 L82 145 Z"
              fill="white"
              fillOpacity={0.12}
              stroke="white"
              strokeOpacity={0.2}
              strokeWidth="0.5"
            />

            <path
              d="M60 28 L72 52 L78 120 L72 168 L48 168 L42 120 L48 52 Z"
              fill="white"
              fillOpacity={0.08}
              stroke={accent}
              strokeWidth={1.2}
              strokeOpacity={0.85}
            />
            <path d="M60 12 L74 44 L46 44 Z" fill={accent} fillOpacity={0.35} stroke={accent} strokeWidth={0.8} />
            <circle cx="60" cy="72" r="10" fill="#0a0a0a" stroke={accent} strokeOpacity={0.7} strokeWidth={1} />
            <circle cx="60" cy="72" r="5" fill={accent} fillOpacity={0.25} />

            <motion.g
              opacity={0.35}
              animate={
                active
                  ? { opacity: [0.15, 0.45, 0.2], x: [0, -6, 0] }
                  : { opacity: 0.25, x: 0 }
              }
              transition={{ duration: 4.5, repeat: active ? Infinity : 0, times: [0, 0.18, 1], ease: "easeOut" }}
            >
              <line x1="24" y1="100" x2="8" y2="108" stroke={accent} strokeWidth="1.2" strokeLinecap="round" />
              <line x1="20" y1="124" x2="4" y2="132" stroke={accent} strokeWidth="1" strokeLinecap="round" />
              <line x1="28" y1="148" x2="12" y2="158" stroke={accent} strokeWidth="0.9" strokeLinecap="round" />
            </motion.g>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
