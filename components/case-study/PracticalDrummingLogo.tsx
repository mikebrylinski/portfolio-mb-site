import Image from "next/image";
import { cn } from "@/lib/cn";

export function PracticalDrummingLogo({
  size = "card",
}: {
  size?: "card" | "hero" | "title";
}) {
  const title = size === "title";
  const hero = size === "hero";

  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center",
        title ? "gap-3.5" : hero ? "gap-3" : "gap-2",
      )}
    >
      <Image
        src="/case-studies/logos/practical-drumming-mark.png"
        alt=""
        width={512}
        height={512}
        className={cn(
          "shrink-0 object-contain",
          title
            ? "h-14 w-14 sm:h-16 sm:w-16"
            : hero
              ? "h-12 w-12 sm:h-14 sm:w-14"
              : "h-8 w-8 sm:h-9 sm:w-9",
        )}
      />
      <span
        className={cn(
          "font-[family-name:var(--font-bebas)] uppercase leading-none tracking-[0.05em] text-[#e8e4dc]",
          title
            ? "text-[clamp(1.7rem,4vw,2.6rem)]"
            : hero
              ? "text-[1.7rem] sm:text-[1.85rem]"
              : "text-xl sm:text-[1.35rem]",
        )}
      >
        Practical Drumming
      </span>
    </span>
  );
}
