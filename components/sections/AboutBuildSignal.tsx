"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  { prompt: "studio", text: "facility · production · signal path" },
  { prompt: "road", text: "playback · redundancy · live" },
  { prompt: "stack", text: "next.js · node · database · cloud · ai" },
  { prompt: "ship", text: "build complete" },
] as const;

const STAGES = ["Spec", "Build", "Test", "Ship"] as const;

export function AboutBuildSignal() {
  const reduce = Boolean(useReducedMotion());
  const [count, setCount] = useState(reduce ? LINES.length : 0);
  const [typed, setTyped] = useState(reduce ? LINES[LINES.length - 1].text : "");
  const [stage, setStage] = useState(reduce ? STAGES.length - 1 : 0);

  useEffect(() => {
    if (reduce) return;

    let cancelled = false;
    let timer = 0;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms);
      });

    const run = async () => {
      while (!cancelled) {
        for (let i = 0; i < LINES.length; i += 1) {
          if (cancelled) return;
          setCount(i);
          setStage(Math.min(i, STAGES.length - 1));
          const text = LINES[i].text;
          for (let n = 0; n <= text.length; n += 1) {
            if (cancelled) return;
            setTyped(text.slice(0, n));
            await wait(n === text.length ? 720 : 28);
          }
        }
        setCount(LINES.length);
        setStage(STAGES.length - 1);
        await wait(1400);
        setCount(0);
        setTyped("");
        setStage(0);
        await wait(420);
      }
    };

    void run();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reduce]);

  const visible = LINES.slice(0, reduce ? LINES.length : count);
  const active = reduce ? null : LINES[Math.min(count, LINES.length - 1)];

  return (
    <div
      className="relative overflow-hidden border border-[#3B8CFF]/30 bg-[#030910]"
      aria-hidden
    >
      <div className="flex items-center justify-between border-b border-[#3B8CFF]/20 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/70">
        <span>Build signal</span>
        <span className="flex items-center gap-2">
          <motion.span
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#3B8CFF]"
            animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          Compiling
        </span>
      </div>

      <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_220px]">
        <div className="min-h-[9.5rem] px-4 py-4 font-mono text-[12px] leading-relaxed text-[#9cb6d4] sm:text-[13px]">
          {visible.map((line) => (
            <p key={line.prompt}>
              <span className="text-[#3B8CFF]">$</span>{" "}
              <span className="text-white/80">{line.prompt}</span>{" "}
              <span>{line.text}</span>
            </p>
          ))}
          {!reduce && active && count < LINES.length ? (
            <p>
              <span className="text-[#3B8CFF]">$</span>{" "}
              <span className="text-white/80">{active.prompt}</span>{" "}
              <span>{typed}</span>
              <motion.span
                className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] bg-[#3B8CFF]"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              />
            </p>
          ) : null}
        </div>

        <ol className="flex border-t border-[#3B8CFF]/20 md:flex-col md:border-t-0 md:border-l">
          {STAGES.map((label, index) => {
            const on = index <= stage;
            return (
              <li
                key={label}
                className="flex flex-1 items-center gap-2 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em]"
              >
                <span
                  className={
                    on
                      ? "h-1.5 w-1.5 rounded-full bg-[#3B8CFF]"
                      : "h-1.5 w-1.5 rounded-full bg-[#3B8CFF]/25"
                  }
                />
                <span className={on ? "text-[#c8dff7]" : "text-[#3B8CFF]/40"}>
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
