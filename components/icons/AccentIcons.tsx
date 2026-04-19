"use client";

import { motion, useReducedMotion } from "framer-motion";

const accent = "#39ff88";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Pulsing dot for section labels */
export function EyebrowPulse({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={`relative inline-flex h-2 w-2 shrink-0 ${className ?? ""}`}>
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: accent, opacity: 0.35 }}
        animate={reduce ? undefined : { scale: [1, 1.65, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <span
        className="absolute inset-[2px] rounded-full"
        style={{ backgroundColor: accent }}
      />
    </span>
  );
}

/** Mini chart bars — work / dashboard context */
export function ChartBarsIcon({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const heights = [40, 65, 48, 72, 55];
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
    >
      {heights.map((h, i) => (
        <motion.rect
          key={i}
          x={6 + i * 6}
          y={34 - h * 0.34}
          width="4"
          height={h * 0.34}
          rx="1"
          fill={accent}
          fillOpacity={0.75}
          initial={false}
          animate={reduce ? undefined : { opacity: [0.45, 1, 0.45] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.12,
          }}
        />
      ))}
    </svg>
  );
}

/** Store / cart mark */
export function StorefrontIcon({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M6 14h28l-2 16H8L6 14z"
        stroke={accent}
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="none"
        opacity="0.9"
      />
      <path d="M12 14V10a8 8 0 0 1 16 0v4" stroke={accent} strokeWidth="1.8" opacity="0.7" />
      <motion.circle
        cx="14"
        cy="34"
        r="2.5"
        fill={accent}
        fillOpacity={0.5}
        animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease }}
      />
    </motion.svg>
  );
}

/** Subtle orbit for hero row */
export function OrbitGlyph({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="20" cy="20" r="14" stroke={accent} strokeOpacity="0.25" strokeWidth="1.2" />
      <circle cx="20" cy="6" r="3" fill={accent} fillOpacity="0.7" />
    </motion.svg>
  );
}

/** Process step icons by index */
export function ProcessStepIcon({
  index,
  className,
}: {
  index: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const pulse = reduce ? {} : { opacity: [0.55, 1, 0.55] };
  const t = { duration: 2 + index * 0.15, repeat: Infinity, ease: "easeInOut" as const };

  const shapes = [
    // search / discovery
    <motion.circle
      key="d"
      cx="20"
      cy="20"
      r="9"
      stroke={accent}
      strokeWidth="1.6"
      fill="none"
      animate={pulse}
      transition={t}
    />,
    // strategy — diamond
    <motion.path
      key="u"
      d="M20 9 L29 20 L20 31 L11 20 Z"
      stroke={accent}
      strokeWidth="1.5"
      fill="none"
      animate={pulse}
      transition={t}
    />,
    // system — grid
    <motion.g key="s" animate={pulse} transition={t}>
      <rect x="11" y="11" width="6" height="6" rx="1" stroke={accent} strokeWidth="1.2" fill="none" />
      <rect x="23" y="11" width="6" height="6" rx="1" stroke={accent} strokeWidth="1.2" fill="none" />
      <rect x="11" y="23" width="6" height="6" rx="1" stroke={accent} strokeWidth="1.2" fill="none" />
      <rect x="23" y="23" width="6" height="6" rx="1" stroke={accent} strokeWidth="1.2" fill="none" />
    </motion.g>,
    // dev — code brackets
    <motion.path
      key="c"
      d="M14 14l-5 6 5 6M26 14l5 6-5 6"
      stroke={accent}
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
      animate={pulse}
      transition={t}
    />,
    // optimize — bolt
    <motion.path
      key="o"
      d="M22 8 L14 22h6l-2 10 10-16h-7l1-8z"
      fill={accent}
      fillOpacity="0.85"
      animate={pulse}
      transition={t}
    />,
  ];

  return (
    <svg className={className} width="40" height="40" viewBox="0 0 40 40" aria-hidden>
      {shapes[index % shapes.length]}
    </svg>
  );
}

/** Arrow hint for links */
export function ArrowNudge({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={`inline-flex ${className ?? ""}`}
      aria-hidden
      animate={reduce ? undefined : { x: [0, 3, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12h12m-4-4l4 4-4 4"
          stroke={accent}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
      </svg>
    </motion.span>
  );
}
