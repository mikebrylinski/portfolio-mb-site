import Image from "next/image";
import { cn } from "@/lib/cn";

type CaseStudyLogoProps = {
  src: string;
  alt: string;
  /** Compact mark for preview cards; wider mark for case study headers */
  size?: "card" | "hero";
  className?: string;
};

export function CaseStudyLogo({
  src,
  alt,
  size = "card",
  className,
}: CaseStudyLogoProps) {
  const isSvg = src.endsWith(".svg");
  const isWide = /wordmark/i.test(src);

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden border border-[#3B8CFF]/20 bg-[#030910]",
        size === "card" &&
          (isWide
            ? "h-10 w-[min(100%,11rem)] sm:h-11 sm:w-48"
            : "h-11 w-11 sm:h-12 sm:w-12"),
        size === "hero" &&
          (isWide
            ? "h-12 w-[min(100%,16rem)] sm:h-14 sm:w-64"
            : "h-14 w-14 sm:h-16 sm:w-16"),
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "object-center",
          isWide ? "object-contain p-2 sm:p-2.5" : "object-contain p-1.5",
        )}
        sizes={
          size === "hero"
            ? isWide
              ? "256px"
              : "64px"
            : isWide
              ? "192px"
              : "48px"
        }
        unoptimized={isSvg}
      />
    </div>
  );
}
