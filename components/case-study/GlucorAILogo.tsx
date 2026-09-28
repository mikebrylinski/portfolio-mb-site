import { cn } from "@/lib/cn";

export function GlucorAILogo({ size = "card" }: { size?: "card" | "hero" | "title" }) {
  const title = size === "title";
  const hero = size === "hero";

  return (
    <span
      className={cn(
        "glucor-logo inline-flex items-baseline whitespace-nowrap",
        title
          ? "text-[clamp(1.85rem,4.5vw,3.15rem)]"
          : hero
            ? "text-[1.85rem] sm:text-[2.15rem]"
            : "text-xl sm:text-2xl",
      )}
    >
      <span className="text-white">Glucor</span>
      <span className="glucor-logo__ai">AI</span>
    </span>
  );
}
