"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Step = "idle" | "name" | "role" | "tagline" | "exit";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function KeynoteIntro({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>("idle");
  const completedRef = useRef(false);

  useEffect(() => {
    if (reduce) {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
      return;
    }

    let cancelled = false;

    const run = async () => {
      await sleep(520);
      if (cancelled) return;
      setStep("name");
      await sleep(1280);
      if (cancelled) return;
      setStep("role");
      await sleep(1100);
      if (cancelled) return;
      setStep("tagline");
      await sleep(1500);
      if (cancelled) return;
      setStep("exit");
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [onComplete, reduce]);

  useEffect(() => {
    if (step !== "exit" || reduce) return;
    const id = window.setTimeout(() => {
      if (completedRef.current) return;
      completedRef.current = true;
      onComplete();
    }, 1180);
    return () => window.clearTimeout(id);
  }, [onComplete, reduce, step]);

  if (reduce) {
    return null;
  }

  const showName = step !== "idle";
  const showRole = step === "role" || step === "tagline" || step === "exit";
  const showTag = step === "tagline" || step === "exit";

  return (
    <motion.div
      className="fixed inset-0 z-[500] flex items-center justify-center bg-[#000000] px-6"
      role="presentation"
      aria-hidden
      initial={{ opacity: 1 }}
      animate={{ opacity: step === "exit" ? 0 : 1 }}
      transition={{ duration: 1.05, ease }}
    >
      <div className="mx-auto max-w-[1100px] text-center">
        <motion.p
          className="text-[clamp(1.75rem,5vw,3.25rem)] font-medium tracking-tight text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: showName ? 1 : 0,
            y: showName ? 0 : 20,
          }}
          transition={{ duration: 1.05, ease }}
        >
          Michael Brylinski
        </motion.p>

        <motion.p
          className="mt-5 text-lg text-[#A1A1A1] md:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: showRole ? 1 : 0,
            y: showRole ? 0 : 16,
          }}
          transition={{ duration: 0.95, ease }}
        >
          Developer &amp; UX Engineer
        </motion.p>

        <motion.p
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-[#A1A1A1] md:text-lg"
          initial={{ opacity: 0, y: 14 }}
          animate={{
            opacity: showTag ? 1 : 0,
            y: showTag ? 0 : 14,
          }}
          transition={{ duration: 1.05, ease }}
        >
          High-performance web experiences for brands that expect more
        </motion.p>
      </div>
    </motion.div>
  );
}
