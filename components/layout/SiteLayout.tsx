import { cn } from "@/lib/cn";

type SiteLayoutProps = {
  children: React.ReactNode;
  className?: string;
  /** When false, children span full width (e.g. hero bleed) */
  contained?: boolean;
  as?: "div" | "main";
  id?: string;
};

export function SiteLayout({
  children,
  className,
  contained = true,
  as: Comp = "div",
  id,
}: SiteLayoutProps) {
  return (
    <Comp
      id={id}
      className={cn("min-h-0 bg-[#000000] text-white antialiased", className)}
    >
      {contained ? (
        <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-8">
          {children}
        </div>
      ) : (
        children
      )}
    </Comp>
  );
}
