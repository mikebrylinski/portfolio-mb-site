"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";
import { CaseStudyThumbMedia } from "@/components/case-study/CaseStudyMedia";
import { ArrowNudge } from "@/components/icons/AccentIcons";
import { cn } from "@/lib/cn";

export type WorkProjectRowProps = {
  project: CaseStudy;
  index?: number;
} & Omit<HTMLMotionProps<"li">, "children">;

export function WorkProjectRow({
  project,
  index,
  className,
  ...motionProps
}: WorkProjectRowProps) {
  const number =
    typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

  return (
    <motion.li className={cn("h-full min-w-0 list-none", className)} {...motionProps}>
      <Link
        href={`/work/${project.slug}`}
        className="group relative flex h-full min-h-[100%] flex-col overflow-hidden border border-[#3B8CFF]/25 bg-[#06101c]/70 transition-[border-color,background-color] duration-300 hover:border-[#3B8CFF]/55 hover:bg-[#06101c]/90"
      >
        <span
          className="pointer-events-none absolute left-0 top-0 z-20 h-2.5 w-2.5 border-l border-t border-[#3B8CFF]/80"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute right-0 top-0 z-20 h-2.5 w-2.5 border-r border-t border-[#3B8CFF]/80"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute bottom-0 left-0 z-20 h-2.5 w-2.5 border-b border-l border-[#3B8CFF]/80"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute bottom-0 right-0 z-20 h-2.5 w-2.5 border-b border-r border-[#3B8CFF]/80"
          aria-hidden
        />

        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-[#3B8CFF]/20 bg-[#030910]">
          <CaseStudyThumbMedia project={project} />
          {number ? (
            <span
              className="pointer-events-none absolute left-3 top-3 border border-[#3B8CFF]/35 bg-[#06101c]/85 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#3B8CFF]"
              aria-hidden
            >
              Fig. {number}
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#3B8CFF]/85 line-clamp-2">
              {project.meta.split(" · ").slice(0, 3).join(" · ")}
            </p>
            <h3 className="mt-3 text-lg font-medium uppercase leading-snug tracking-tight text-white transition-colors group-hover:text-[#3B8CFF] md:text-xl">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
              {project.outcome}
            </p>
          </div>

          <p className="mt-auto flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#3B8CFF]">
            <span>View drawing</span>
            <ArrowNudge className="opacity-80 group-hover:opacity-100" />
          </p>
        </div>
      </Link>
    </motion.li>
  );
}
