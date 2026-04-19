"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";
import { CaseStudyThumbMedia } from "@/components/case-study/CaseStudyMedia";
import { ArrowNudge, ChartBarsIcon, StorefrontIcon } from "@/components/icons/AccentIcons";
import { cn } from "@/lib/cn";

function ProjectIcon({ slug }: { slug: string }) {
  if (slug === "shopify-storefront" || slug === "cp-commerce") {
    return <StorefrontIcon className="h-9 w-9 shrink-0 opacity-90" />;
  }
  return <ChartBarsIcon className="h-9 w-9 shrink-0 opacity-90" />;
}

export type WorkProjectRowProps = {
  project: CaseStudy;
} & Omit<HTMLMotionProps<"li">, "children">;

export function WorkProjectRow({ project, className, ...motionProps }: WorkProjectRowProps) {
  return (
    <motion.li className={cn("h-full min-w-0 list-none", className)} {...motionProps}>
      <Link
        href={`/work/${project.slug}`}
        className="group flex h-full min-h-[100%] flex-col overflow-hidden rounded-xl border border-[#39ff88]/15 bg-black/35 transition-[opacity,border-color] duration-300 hover:border-[#39ff88]/35 hover:opacity-95"
      >
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-[#39ff88]/10 bg-black/50">
          <CaseStudyThumbMedia project={project} />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-start gap-3">
            <ProjectIcon slug={project.slug} />
            <div className="min-w-0 flex-1">
              <p className="text-lg font-medium leading-snug tracking-tight text-white md:text-xl">
                {project.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#A1A1A1] md:text-[15px]">
                {project.outcome}
              </p>
            </div>
          </div>
          <p className="mt-auto flex items-center gap-2 text-sm text-[#39ff88]">
            <span>View case study</span>
            <ArrowNudge className="opacity-80 group-hover:opacity-100" />
          </p>
        </div>
      </Link>
    </motion.li>
  );
}
