import Image from "next/image";
import { cn } from "@/lib/cn";

type AboutPortraitProps = {
  className?: string;
};

/**
 * Editorial portrait treatment: generous radius, hairline edge, soft depth (Apple-style restraint).
 */
export function AboutPortrait({ className }: AboutPortraitProps) {
  return (
    <figure className={cn("relative w-full", className)}>
      <div
        className={cn(
          "relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-[#141414]",
          "border border-white/[0.08]",
          "shadow-[0_32px_90px_-28px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.04)_inset]",
        )}
      >
        <Image
          src="/about-portrait.png"
          alt="Michael Brylinski in his workspace"
          fill
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 400px"
          className="object-cover object-[22%_center] sm:object-[28%_center]"
          quality={92}
        />
      </div>
    </figure>
  );
}
