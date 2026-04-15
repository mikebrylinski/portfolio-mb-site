import Image from "next/image";
import { cn } from "@/lib/cn";

type SectionImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  aspectClassName?: string;
};

export function SectionImage({
  src,
  alt,
  priority = false,
  className,
  aspectClassName,
}: SectionImageProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-white/10 ring-1 ring-white/5",
        aspectClassName ?? "aspect-[16/9] sm:aspect-[21/9]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1280px) 100vw, min(1280px, 100vw)"
        className="object-cover object-center"
        priority={priority}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-black/20"
        aria-hidden
      />
    </div>
  );
}
