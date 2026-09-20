import Link from "next/link";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

type ResumeCtaProps = {
  variant?: "primary" | "secondary" | "compact" | "footer";
  className?: string;
};

const variantClass: Record<NonNullable<ResumeCtaProps["variant"]>, string> = {
  primary:
    "min-h-[48px] gap-2.5 rounded-md border border-[#3B8CFF] bg-[#3B8CFF]/10 px-7 py-3 text-sm font-medium text-white hover:bg-[#3B8CFF]/20",
  secondary:
    "min-h-[48px] gap-2.5 rounded-md border border-white/25 bg-transparent px-7 py-3 text-sm font-medium text-white hover:border-[#3B8CFF]/50 hover:bg-[#3B8CFF]/10",
  compact:
    "min-h-[44px] gap-2 border border-[#3B8CFF] bg-[#3B8CFF]/10 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white hover:bg-[#3B8CFF]/20 xl:px-4",
  footer:
    "min-h-[44px] gap-2 border border-[#3B8CFF] bg-[#3B8CFF]/10 px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white hover:bg-[#3B8CFF]/20",
};

export function ResumeCta({ variant = "secondary", className }: ResumeCtaProps) {
  return (
    <Link
      href={siteConfig.resumeHref}
      className={cn(
        "inline-flex items-center justify-center transition-[background-color,border-color]",
        variantClass[variant],
        className,
      )}
    >
      Download Resume
      {variant !== "compact" ? (
        <span aria-hidden className="text-[#3B8CFF]">
          →
        </span>
      ) : null}
    </Link>
  );
}
