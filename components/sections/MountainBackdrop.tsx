"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

type MountainBackdropProps = {
  className?: string;
  /** hero = boldest; section = readable behind forms */
  intensity?: "hero" | "section";
};

/** Shared mountain atmosphere — contact and other sections. */
export function MountainBackdrop({
  className,
  intensity = "section",
}: MountainBackdropProps) {
  const hero = intensity === "hero";

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      <Image
        src="/hero-mountain.jpg"
        alt=""
        fill
        priority={hero}
        quality={hero ? 90 : 80}
        sizes="100vw"
        className={cn(
          "scale-105 object-cover object-[center_50%] saturate-[0.78] contrast-[1.05]",
          hero ? "brightness-[0.82]" : "brightness-[0.72]",
        )}
      />
      <div className="absolute inset-0 bg-[#020617]/30 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c4a6e]/20 via-transparent to-[#020617]/65" />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r",
          hero
            ? "from-[#020617]/60 via-[#020617]/20 to-[#020617]/25"
            : "from-[#020617]/65 via-[#020617]/25 to-[#020617]/35",
        )}
      />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent",
          hero
            ? "h-[42%] from-[#020617]/80 via-[#020617]/35"
            : "h-[45%] from-[#020617] via-[#020617]/55",
        )}
      />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#020617]/75 to-transparent" />
    </div>
  );
}
