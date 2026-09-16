import Image from "next/image";
import { cn } from "@/lib/cn";

type AboutPortraitProps = {
  className?: string;
};

/**
 * Portrait plate — blueprint-adjacent frame for About.
 */
export function AboutPortrait({ className }: AboutPortraitProps) {
  return (
    <figure className={cn("relative w-full", className)}>
      <div
        className={cn(
          "relative aspect-[4/5] w-full overflow-hidden bg-[#030910]",
          "border border-[#3B8CFF]/25",
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
