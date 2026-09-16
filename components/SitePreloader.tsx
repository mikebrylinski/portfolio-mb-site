"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { FrameCorners } from "@/components/ui/FieldNotes";
import { appleEase } from "@/lib/motion";

const MIN_MS = 900;
const MAX_MS = 2400;

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

          <div className="relative z-[1] w-[min(92vw,22rem)] border border-[#3B8CFF]/35 bg-[#06101c]/90 px-6 py-8 text-center">
            <FrameCorners />

            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#3B8CFF]/75">
              System boot
            </p>

            <p className="mt-5 inline-flex items-baseline gap-1 text-[clamp(1.15rem,4vw,1.45rem)] font-bold uppercase leading-none tracking-[-0.03em]">
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
              <span className="text-white">mikeb</span>
              <span className="text-[#3B8CFF]">web.com</span>
            </p>

            <div className="mx-auto mt-8 h-px w-full overflow-hidden bg-[#3B8CFF]/15">
              <motion.div
                className="h-full bg-[#3B8CFF]"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: reduce ? 0 : 0.2, ease: "linear" }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/60">
              <span>Drawing</span>
              <span>{String(progress).padStart(3, "0")}%</span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
