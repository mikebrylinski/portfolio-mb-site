"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

type MountainBackdropProps = {
  className?: string;
  /** Soften the photo so form UI stays readable */
  intensity?: "hero" | "section";
};

/** Shared mountain atmosphere — matches home hero / header slate base. */
export function MountainBackdrop({
  className,
  intensity = "section",
}: MountainBackdropProps) {
  const bright = intensity === "hero";

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      <Image
        src="/hero-mountain.jpg"
        alt=""
        fill
        priority={bright}
        quality={bright ? 90 : 80}
        sizes="100vw"
        className={cn(
          "object-cover object-[center_50%] saturate-[0.75] contrast-[1.05]",
          bright ? "scale-105 brightness-[0.88]" : "scale-105 brightness-[0.72]",
        )}
      />
      <div className="absolute inset-0 bg-[#020617]/30 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c4a6e]/20 via-transparent to-[#020617]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/65 via-[#020617]/25 to-[#020617]/35" />
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#020617] via-[#020617]/55 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#020617]/80 to-transparent" />
      <div className="absolute inset-x-0 top-[30%] h-36 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent blur-2xl" />
    </div>
  );
}
