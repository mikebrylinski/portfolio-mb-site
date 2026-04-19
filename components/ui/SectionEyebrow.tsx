"use client";

import { EyebrowPulse } from "@/components/icons/AccentIcons";

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-[#39ff88]">
      <EyebrowPulse />
      <span>{children}</span>
    </p>
  );
}
