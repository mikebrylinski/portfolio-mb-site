"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { FrameCorners } from "@/components/ui/FieldNotes";
import { appleEase } from "@/lib/motion";

const MIN_MS = 900;
const MAX_MS = 2400;

const STAGES = [
  { at: 12, code: "00", label: "Canvas" },
  { at: 32, code: "01", label: "Interface" },
  { at: 52, code: "02", label: "Services" },
  { at: 72, code: "03", label: "Data" },
  { at: 90, code: "04", label: "Signal" },
] as const;

const METER_TICKS = 24;

export function SitePreloader() {
  const reduce = Boolean(useReducedMotion());
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(reduce ? 100 : 0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem("mb-preloader-done") === "1") {
      setVisible(false);
      return;
    }

    if (reduce) {
      sessionStorage.setItem("mb-preloader-done", "1");
      const t = window.setTimeout(() => setVisible(false), 120);
      return () => window.clearTimeout(t);
    }

    const start = performance.now();
    let frame = 0;
    let done = false;

    const tick = (now: number) => {
      const elapsed = now - start;
      const eased = Math.min(0.92, elapsed / MIN_MS);
      setProgress(Math.round(eased * 100));
      if (!done) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(frame);
      setProgress(100);
      sessionStorage.setItem("mb-preloader-done", "1");
      window.setTimeout(() => setVisible(false), 280);
    };

    const onLoad = () => {
      const wait = Math.max(0, MIN_MS - (performance.now() - start));
      window.setTimeout(finish, wait);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    const failsafe = window.setTimeout(finish, MAX_MS);

    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
      window.clearTimeout(failsafe);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#020617]"
          initial={false}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.55, ease: appleEase }}
          aria-hidden
        >
          <div
            className="pointer-events-none absolute inset-0 blueprint-grid opacity-50"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(59,140,255,0.12),transparent_55%)]"
            aria-hidden
          />

          <div className="relative z-[1] w-[min(92vw,26rem)] border border-[#3B8CFF]/35 bg-[#06101c]/92 px-5 py-6 text-left sm:px-6 sm:py-7">
            <FrameCorners />
            {!reduce ? (
              <motion.div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#3B8CFF]/70"
                animate={{ top: ["8%", "92%", "8%"], opacity: [0.15, 0.7, 0.15] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
            ) : null}

            <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#3B8CFF]/75">
              <span className="flex items-center gap-2">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-[#3B8CFF]"
                  animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                Fig. 00 — Boot
              </span>
              <span>Rev / 2026.09</span>
            </div>

            <p className="mt-5 inline-flex items-baseline gap-1 text-[clamp(1.15rem,4vw,1.5rem)] font-bold leading-none tracking-[-0.03em]">
              <span className="font-mono text-[0.9em] font-medium tracking-[0.08em] text-[#3B8CFF]">
                &lt;
                <motion.span
                  className="inline-block"
                  animate={reduce ? undefined : { opacity: [1, 0.28, 1] }}
                  transition={
                    reduce
                      ? undefined
                      : { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                  }
                >
                  /
                </motion.span>
                &gt;
              </span>
              <span className="text-white">MIKEBWEB</span>
              <span className="text-[#3B8CFF]">.dev</span>
            </p>

            <ul className="mt-5 space-y-1.5 border-y border-[#3B8CFF]/15 py-3">
              {STAGES.map((stage) => {
                const live = progress >= stage.at;
                return (
                  <li
                    key={stage.code}
                    className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em]"
                  >
                    <span className={live ? "text-[#3B8CFF]" : "text-white/25"}>
                      {stage.code}
                      <span className="ml-3 tracking-[0.14em]">{stage.label}</span>
                    </span>
                    <span className={live ? "text-[#c8dff7]" : "text-white/20"}>
                      {live ? "Online" : "Standby"}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex gap-1" aria-hidden>
              {Array.from({ length: METER_TICKS }, (_, index) => {
                const filled = progress >= ((index + 1) / METER_TICKS) * 100;
                return (
                  <span
                    key={index}
                    className={
                      filled
                        ? "h-2 flex-1 bg-[#3B8CFF]"
                        : "h-2 flex-1 bg-[#3B8CFF]/15"
                    }
                  />
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/70">
              <span>{progress >= 100 ? "Live" : "Drawing"}</span>
              <span>Lat 34.0928 · Long -118.3287</span>
              <span>{String(progress).padStart(3, "0")}%</span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
