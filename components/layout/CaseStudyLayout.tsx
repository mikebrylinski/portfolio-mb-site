import { SiteLayout } from "@/components/layout/SiteLayout";
import { cn } from "@/lib/cn";

type CaseStudyLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Apple-style case study shell: generous measure, editorial rhythm.
 */
export function CaseStudyLayout({ children, className }: CaseStudyLayoutProps) {
  return (
    <article className={cn("bg-[#000000] text-white", className)}>
      <SiteLayout as="div" contained={false}>
        <div className="mx-auto w-full max-w-[1100px] px-7 sm:px-8 lg:px-10">{children}</div>
      </SiteLayout>
    </article>
  );
}
