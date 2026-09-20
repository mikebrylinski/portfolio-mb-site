"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BrandMark } from "@/components/BrandMark";
import { sectionRevealTransition, sectionRevealViewport } from "@/lib/motion";
import { siteContainerClass } from "@/lib/site";

const footerNav = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
  { href: "/recruiters", label: "Recruiters" },
] as const;

function FooterSystemAnimation({ reduce }: { reduce: boolean }) {
  const nodes = [
    { x: 42, y: 72, label: "UI" },
    { x: 118, y: 38, label: "API" },
    { x: 194, y: 72, label: "DATA" },
    { x: 270, y: 38, label: "CLOUD" },
    { x: 346, y: 72, label: "AI" },
  ] as const;

  return (
    <div
      className="relative w-full max-w-[430px] overflow-hidden border border-[#3B8CFF]/25 bg-[#06101c]/55 p-3 sm:p-4"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-30" />
      <div className="relative flex items-center justify-between border-b border-[#3B8CFF]/15 pb-2 font-mono text-[8px] uppercase tracking-[0.2em] text-[#3B8CFF]/55">
        <span>System signal</span>
        <span className="flex items-center gap-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#3B8CFF]"
            animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          Online
        </span>
      </div>

      <svg
        viewBox="0 0 388 112"
        className="relative mt-2 h-auto w-full"
        role="presentation"
      >
        <motion.path
          d="M42 72 L118 38 L194 72 L270 38 L346 72"
          fill="none"
          stroke="rgba(59,140,255,0.42)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {!reduce ? (
          <motion.circle
            r="3.5"
            fill="#3B8CFF"
            animate={{
              cx: nodes.map((node) => node.x),
              cy: nodes.map((node) => node.y),
              opacity: [0, 1, 1, 1, 0],
            }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
          />
        ) : null}

        {nodes.map((node, index) => (
          <g key={node.label}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="15"
              fill="rgba(6,16,28,0.95)"
              stroke="rgba(59,140,255,0.6)"
              strokeWidth="1"
              animate={
                reduce
                  ? undefined
                  : {
                      strokeOpacity: [0.35, 1, 0.35],
                      r: [15, 16.5, 15],
                    }
              }
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: index * 0.35,
                ease: "easeInOut",
              }}
            />
            <text
              x={node.x}
              y={node.y + 2.5}
              textAnchor="middle"
              fill="rgba(200,223,247,0.9)"
              fontSize="6.5"
              fontFamily="monospace"
              letterSpacing="0.8"
            >
              {node.label}
            </text>
          </g>
        ))}

        <motion.path
          d="M24 96 H364"
          stroke="rgba(59,140,255,0.16)"
          strokeWidth="1"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 1.2, delay: 0.2 }}
        />
        {[72, 148, 224, 300].map((x, index) => (
          <motion.rect
            key={x}
            x={x}
            y="102"
            width="40"
            height="2"
            fill="#3B8CFF"
            animate={reduce ? undefined : { opacity: [0.15, 0.7, 0.15] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function SiteFooter() {
  const reduce = Boolean(useReducedMotion());

  return (
    <motion.footer
      className="border-t border-white/10 bg-[#020617] text-center sm:text-left"
      style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={sectionRevealViewport}
      transition={sectionRevealTransition(reduce)}
    >
      <div className={`${siteContainerClass} flex flex-col gap-10 py-12 md:py-14`}>
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          <FooterSystemAnimation reduce={reduce} />

          <div className="flex flex-col items-center gap-3 sm:items-end">
            <nav
              className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 sm:justify-end"
              aria-label="Footer"
            >
              {footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Michael Brylinski. All Rights Reserved.
            Please Respect IP.
          </p>
          <BrandMark className="px-2.5 py-1.5 text-sm tracking-[-0.03em]" />
        </div>
      </div>
    </motion.footer>
  );
}
