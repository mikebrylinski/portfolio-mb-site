"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";
import { CaseStudyThumbMedia } from "@/components/case-study/CaseStudyMedia";
import { ArrowNudge } from "@/components/icons/AccentIcons";
import { FieldLabel, FrameCorners } from "@/components/ui/FieldNotes";
import { cn } from "@/lib/cn";

export type WorkProjectRowProps = {
  project: CaseStudy;
  /** Image on the right / copy on the left (desktop) */
  reverse?: boolean;
} & Omit<HTMLMotionProps<"li">, "children">;

export function WorkProjectRow({
  project,
  reverse = false,
  className,
  ...motionProps
}: WorkProjectRowProps) {
  const label = `PROJECT ${project.code} / ${project.systemType.split(" / ")[0].toUpperCase()}`;

  return (
    <motion.li className={cn("h-full min-w-0 list-none", className)} {...motionProps}>
      <Link
        href={`/work/${project.slug}`}
        className={cn(
          "group relative flex h-full min-h-[100%] flex-col overflow-hidden border border-[#3B8CFF]/25 bg-[#06101c]/70 transition-[border-color,background-color] duration-300 hover:border-[#3B8CFF]/55 hover:bg-[#06101c]/90 md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]",
          reverse && "md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]",
        )}
      >
        <FrameCorners size="sm" />

        <div
          className={cn(
            "relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-[#3B8CFF]/20 bg-[#030910] md:aspect-auto md:min-h-[280px] md:border-b-0 lg:min-h-[320px]",
            reverse
              ? "md:order-2 md:border-l"
              : "md:border-r",
          )}
        >
          <CaseStudyThumbMedia project={project} />
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col gap-4 p-5 md:p-7 lg:p-8",
            reverse && "md:order-1",
          )}
        >
          <FieldLabel>{label}</FieldLabel>
          <div className="min-w-0">
            <h3 className="text-[clamp(1.35rem,2.4vw,2rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white transition-colors group-hover:text-[#3B8CFF]">
              {project.title}
            </h3>
            <p className="mt-3 text-sm font-medium leading-snug text-white/90 md:text-base">
              {project.headline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
              {project.outcome}
            </p>
          </div>

          <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
            {project.tags.map((tag) => (
              <li key={tag}>
                <span className="inline-flex border border-[#3B8CFF]/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#3B8CFF]/80">
                  {tag}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-auto flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#3B8CFF]">
            <span>View case study</span>
            <ArrowNudge className="opacity-80 group-hover:opacity-100" />
          </p>
        </div>
      </Link>
    </motion.li>
  );
}
