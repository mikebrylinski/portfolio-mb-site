import { SiteLayout } from "@/components/layout/SiteLayout";
import { cn } from "@/lib/cn";
import { siteContainerClass } from "@/lib/site";

type CaseStudyLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Blueprint sheet shell — grid paper, cyan construction lines.
 */
export function CaseStudyLayout({ children, className }: CaseStudyLayoutProps) {
  return (
    <article
      className={cn(
        "blueprint-sheet relative overflow-hidden bg-[#06101c] text-[#c8dff7]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-100"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,140,255,0.08),transparent_55%)]"
        aria-hidden
      />
      <SiteLayout as="div" contained={false}>
        <div className={`relative z-[1] ${siteContainerClass} py-2 md:py-4`}>
          {children}
        </div>
      </SiteLayout>
    </article>
  );
}
