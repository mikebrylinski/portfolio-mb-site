"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { appleEase } from "@/lib/motion";

type Stage = "code" | "components" | "database" | "webpage";

const SNIPPET = [
  { t: "keyword", v: "const" },
  { t: "space", v: " " },
  { t: "ident", v: "build" },
  { t: "punct", v: " = " },
  { t: "keyword", v: "async" },
  { t: "space", v: " " },
  { t: "punct", v: "() => {" },
] as const;

const LINES = [
  "  const stack = ['React', 'Node', 'AWS'];",
  "  const ui = await craft({ perf: 95 });",
  "  return deploy(ui, { scale: true });",
  "};",
] as const;

const STAGE_META: Record<
  Stage,
  { title: string; status: string; label: string }
> = {
  code: { title: "deploy.ts", status: "compiling", label: "TypeScript" },
  components: { title: "components.tsx", status: "assembling", label: "React" },
  database: { title: "db.client.ts", status: "connecting", label: "MySQL" },
  webpage: { title: "mikebweb.dev", status: "live", label: "Browser" },
};

function tokenClass(kind: string) {
  switch (kind) {
    case "keyword":
      return "text-[#7CB5FF]";
    case "ident":
      return "text-[#E8F3FF]";
    case "punct":
      return "text-white/55";
    default:
      return "text-white/70";
  }
}

function CodeStage({
  reduce,
  lineIndex,
  charIndex,
  typing,
}: {
  reduce: boolean;
  lineIndex: number;
  charIndex: number;
  typing: boolean;
}) {
  return (
    <div className="relative flex h-full flex-col justify-start gap-0 overflow-hidden px-4 py-4 font-mono text-[12px] leading-7 sm:px-5 sm:text-[13px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,140,255,0.45) 2px, rgba(59,140,255,0.45) 3px)",
        }}
      />

      <p className="relative flex h-7 shrink-0 items-center text-white/35">
        <span className="mr-3 inline-block w-4 shrink-0 text-right text-white/25">
          1
        </span>
        <span className="min-w-0 truncate">
          {SNIPPET.map((tok, i) => (
            <span key={i} className={tokenClass(tok.t)}>
              {tok.v}
            </span>
          ))}
        </span>
      </p>

      {LINES.map((line, i) => {
        const isActive = typing && !reduce && i === lineIndex;
        const shown = reduce
          ? line
          : i < lineIndex
            ? line
            : i === lineIndex
              ? line.slice(0, charIndex)
              : "";
        return (
          <p
            key={line}
            className="relative flex h-7 shrink-0 items-center text-white/80"
          >
            <span className="mr-3 inline-block w-4 shrink-0 text-right text-white/25">
              {i + 2}
            </span>
            <span className="min-w-0 truncate text-[#A5D0FF]">
              {shown || "\u00a0"}
              {isActive && (
                <motion.span
                  className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.12em] bg-[#3B8CFF] align-middle"
                  animate={{ opacity: [1, 0.15, 1] }}
                  transition={{ duration: 0.85, repeat: Infinity }}
                />
              )}
            </span>
          </p>
        );
      })}

      <p className="relative mt-auto flex h-7 shrink-0 items-center text-[11px] text-[#3B8CFF]/90">
        <span className="text-white/35">// </span>
        ship → measure → refine
      </p>
    </div>
  );
}

function ComponentsStage({ reduce }: { reduce: boolean }) {
  const cards = [
    { name: "Hero", w: "col-span-2", h: "h-10" },
    { name: "Nav", w: "col-span-1", h: "h-16" },
    { name: "Card", w: "col-span-1", h: "h-16" },
    { name: "CTA", w: "col-span-2", h: "h-9" },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden px-3 py-3 sm:px-4">
      <p className="mb-2 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-[#3B8CFF]/80">
        Building UI primitives
      </p>
      <div className="grid min-h-0 flex-1 grid-cols-2 content-start gap-2 overflow-hidden">
        {cards.map((card, i) => (
          <motion.div
            key={card.name}
            className={cn(
              "rounded-lg border border-[#3B8CFF]/25 bg-gradient-to-b from-[#3B8CFF]/15 to-white/[0.03] px-3 py-2",
              card.w,
              card.h,
            )}
            initial={reduce ? false : { opacity: 0, scale: 0.86, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : 0.45,
              ease: appleEase,
              delay: reduce ? 0 : 0.08 + i * 0.12,
            }}
          >
            <div className="flex h-full flex-col justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                {card.name}
              </span>
              <div className="mt-1 h-1.5 w-2/3 rounded-full bg-[#3B8CFF]/35" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DatabaseStage({ reduce }: { reduce: boolean }) {
  const rows = [
    { id: "01", label: "users", meta: "1.2k rows" },
    { id: "02", label: "orders", meta: "synced" },
    { id: "03", label: "analytics", meta: "live" },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden px-3 py-3 sm:px-4">
      <p className="mb-2 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-[#3B8CFF]/80">
        Database integration
      </p>

      <div className="flex min-h-0 shrink-0 items-center gap-2 sm:gap-3">
        <motion.div
          className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg border border-[#3B8CFF]/30 bg-[#3B8CFF]/10 sm:h-16 sm:w-16"
          initial={reduce ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduce ? 0 : 0.4, ease: appleEase }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/80 sm:text-[10px]">
            API
          </span>
          <span className="mt-0.5 font-mono text-[8px] text-[#3B8CFF]/90 sm:text-[9px]">
            Node
          </span>
        </motion.div>

        <div className="relative h-8 min-w-0 flex-1">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-[#3B8CFF]/20 via-[#3B8CFF]/70 to-[#3B8CFF]/20" />
          <motion.span
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#3B8CFF] shadow-[0_0_12px_rgba(59,140,255,0.9)]"
            animate={reduce ? { left: "50%" } : { left: ["0%", "calc(100% - 8px)", "0%"] }}
            transition={
              reduce
                ? undefined
                : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </div>

        <motion.div
          className="relative flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16"
          initial={reduce ? false : { opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduce ? 0 : 0.45, ease: appleEase, delay: 0.1 }}
        >
          <div className="absolute inset-x-1 top-0.5 h-3 rounded-full border border-[#3B8CFF]/45 bg-[#3B8CFF]/25" />
          <div className="absolute inset-x-1 top-2 bottom-2 border-x border-[#3B8CFF]/35 bg-gradient-to-b from-[#3B8CFF]/15 to-[#05070c]/80" />
          <div className="absolute inset-x-1 bottom-0.5 h-3 rounded-full border border-[#3B8CFF]/45 bg-[#0b1a33]" />
          <span className="relative z-[1] font-mono text-[9px] uppercase tracking-[0.12em] text-white/85 sm:text-[10px]">
            MySQL
          </span>
        </motion.div>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-end gap-1 overflow-hidden">
        {rows.map((row, i) => (
          <motion.div
            key={row.id}
            className="flex h-6 shrink-0 items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-2 font-mono text-[9px] sm:h-7 sm:text-[10px]"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : 0.35,
              ease: appleEase,
              delay: reduce ? 0 : 0.25 + i * 0.12,
            }}
          >
            <span className="text-white/35">{row.id}</span>
            <span className="text-[#A5D0FF]">{row.label}</span>
            <span className="text-[#3B8CFF]/90">{row.meta}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function WebpageStage({ reduce }: { reduce: boolean }) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex h-8 shrink-0 items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3">
        <div className="flex h-5 flex-1 items-center rounded-md border border-white/10 bg-black/40 px-2 font-mono text-[10px] text-white/50">
          <span className="text-[#3B8CFF]">https://</span>
          mikebweb.dev
        </div>
      </div>

      <motion.div
        className="flex min-h-0 flex-1 flex-col gap-2 p-3"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.5, ease: appleEase }}
      >
        <div className="flex items-center justify-between">
          <div className="h-2 w-16 rounded-full bg-white/80" />
          <div className="flex gap-1.5">
            <span className="h-1.5 w-6 rounded-full bg-white/25" />
            <span className="h-1.5 w-6 rounded-full bg-white/25" />
            <span className="h-1.5 w-6 rounded-full bg-[#3B8CFF]/70" />
          </div>
        </div>

        <div className="mt-1 space-y-1.5">
          <div className="h-3 w-28 rounded-sm bg-white" />
          <div className="h-3 w-36 rounded-sm bg-[#3B8CFF]" />
          <div className="h-1.5 w-40 rounded-full bg-white/30" />
          <div className="h-1.5 w-32 rounded-full bg-white/20" />
        </div>

        <div className="mt-1 inline-flex h-6 w-20 items-center justify-center rounded border border-[#3B8CFF] bg-[#3B8CFF]/15">
          <span className="h-1 w-10 rounded-full bg-white/80" />
        </div>

        <div className="mt-auto grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-12 rounded-md border border-white/10 bg-white/[0.04]"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduce ? 0 : 0.4,
                ease: appleEase,
                delay: reduce ? 0 : 0.2 + i * 0.08,
              }}
            >
              <div className="h-5 rounded-t-md bg-[#3B8CFF]/20" />
              <div className="space-y-1 p-1.5">
                <div className="h-1 w-3/4 rounded-full bg-white/35" />
                <div className="h-1 w-1/2 rounded-full bg-white/20" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function HeroDevAnimation({ className }: { className?: string }) {
  const reduce = Boolean(useReducedMotion());
  const [stage, setStage] = useState<Stage>("code");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(!reduce);

  useEffect(() => {
    if (reduce) {
      setStage("webpage");
      return;
    }

    if (stage !== "code") return;

    if (!typing) {
      const t = window.setTimeout(() => setStage("components"), 700);
      return () => window.clearTimeout(t);
    }

    const current = LINES[lineIndex] ?? "";
    if (charIndex < current.length) {
      const t = window.setTimeout(() => setCharIndex((c) => c + 1), 26);
      return () => window.clearTimeout(t);
    }

    if (lineIndex < LINES.length - 1) {
      const t = window.setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, 280);
      return () => window.clearTimeout(t);
    }

    const t = window.setTimeout(() => setTyping(false), 500);
    return () => window.clearTimeout(t);
  }, [reduce, stage, typing, lineIndex, charIndex]);

  useEffect(() => {
    if (reduce) return;
    if (stage === "components") {
      const t = window.setTimeout(() => setStage("database"), 2000);
      return () => window.clearTimeout(t);
    }
    if (stage === "database") {
      const t = window.setTimeout(() => setStage("webpage"), 2400);
      return () => window.clearTimeout(t);
    }
    if (stage === "webpage") {
      const t = window.setTimeout(() => {
        setLineIndex(0);
        setCharIndex(0);
        setTyping(true);
        setStage("code");
      }, 2800);
      return () => window.clearTimeout(t);
    }
  }, [reduce, stage]);

  const meta = STAGE_META[stage];

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-md shrink-0 lg:mx-0 lg:max-w-none",
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[#3B8CFF]/20 blur-3xl" />

      <motion.div
        className="relative flex h-[240px] flex-col overflow-hidden rounded-2xl border border-[#3B8CFF]/30 bg-[#05070c]/88 shadow-[0_0_60px_-12px_rgba(59,140,255,0.45)] backdrop-blur-md sm:h-[280px] lg:h-[300px]"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.85, ease: appleEase, delay: 0.2 }}
      >
        <div className="flex h-11 shrink-0 items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <AnimatePresence mode="wait">
            <motion.span
              key={meta.title}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="ml-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45"
            >
              {meta.title}
            </motion.span>
          </AnimatePresence>
          <span className="ml-auto font-mono text-[10px] text-[#3B8CFF]/80">
            {stage === "webpage" ? "live" : "build"}
          </span>
        </div>

        <div className="relative min-h-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 1.02 }}
              transition={{ duration: reduce ? 0 : 0.4, ease: appleEase }}
            >
              {stage === "code" && (
                <CodeStage
                  reduce={reduce}
                  lineIndex={lineIndex}
                  charIndex={charIndex}
                  typing={typing}
                />
              )}
              {stage === "components" && <ComponentsStage reduce={reduce} />}
              {stage === "database" && <DatabaseStage reduce={reduce} />}
              {stage === "webpage" && <WebpageStage reduce={reduce} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex h-9 shrink-0 items-center justify-between border-t border-white/10 bg-[#3B8CFF]/10 px-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#9EC5FF]">
          <AnimatePresence mode="wait">
            <motion.span
              key={meta.label}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
            >
              {meta.label}
            </motion.span>
          </AnimatePresence>
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#3B8CFF] opacity-50" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#3B8CFF]" />
            </span>
            {meta.status}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
