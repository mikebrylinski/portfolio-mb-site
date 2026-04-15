import { TechOverlay } from "@/components/TechOverlay";
import { cn } from "@/lib/cn";

type SectionShellProps = {
  id?: string;
  variant?: number;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
  as?: "section" | "div";
};

export function SectionShell({
  id,
  variant = 0,
  className,
  contentClassName,
  children,
  as: Comp = "section",
}: SectionShellProps) {
  return (
    <Comp
      id={id}
      className={cn(
        "relative overflow-hidden border-b border-white/[0.06] py-16 md:py-24 lg:py-28",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden
      >
        <TechOverlay variant={variant} />
      </div>
      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8",
          contentClassName,
        )}
      >
        {children}
      </div>
    </Comp>
  );
}
