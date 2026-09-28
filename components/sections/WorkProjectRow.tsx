"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, type RefObject } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";
import { AndyEbertLogo } from "@/components/case-study/AndyEbertLogo";
import { CaseStudyLogo } from "@/components/case-study/CaseStudyLogo";
import { GlucorAILogo } from "@/components/case-study/GlucorAILogo";
import { PracticalDrummingLogo } from "@/components/case-study/PracticalDrummingLogo";
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
  const label = `${project.code} — ${project.category}`;
  const itemRef = useRef<HTMLLIElement>(null);
  useEqualCardHeights(itemRef);

  return (
    <motion.li
      ref={itemRef}
      className={cn("h-full min-w-0 list-none", className)}
      {...motionProps}
    >
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
            "relative flex flex-1 flex-col gap-4 overflow-hidden p-5 md:p-7 lg:p-8",
            reverse && "md:order-1",
          )}
        >
          {project.heroBgSrc ? (
            <>
              <Image
                src={project.heroBgSrc}
                alt=""
                fill
                className="object-cover object-center opacity-40 transition-transform duration-500 group-hover:scale-[1.03] group-hover:opacity-50"
                sizes="(max-width: 768px) 100vw, 45vw"
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#06101c]/92 via-[#06101c]/82 to-[#06101c]/70"
                aria-hidden
              />
            </>
          ) : null}
          <div className="relative z-[1] flex flex-wrap items-center justify-between gap-3">
            <FieldLabel>{label}</FieldLabel>
            {project.slug !== "andy-ebert" &&
            project.slug !== "practical-drumming" &&
            project.slug !== "glucorai" &&
            project.logoSrc ? (
              <CaseStudyLogo
                src={project.logoSrc}
                alt={project.logoAlt ?? `${project.title} logo`}
                size="card"
              />
            ) : null}
          </div>
          <div className="relative z-[1] min-w-0">
            {project.slug === "andy-ebert" ? (
              <h3 className="mt-1">
                <AndyEbertLogo size="hero" />
              </h3>
            ) : project.slug === "practical-drumming" ? (
              <h3 className="mt-1">
                <PracticalDrummingLogo size="hero" />
              </h3>
            ) : project.slug === "glucorai" ? (
              <h3 className="mt-1">
                <GlucorAILogo size="hero" />
              </h3>
            ) : (
              <h3 className="text-[clamp(1.35rem,2.4vw,2rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white transition-colors group-hover:text-[#3B8CFF]">
                {project.title}
              </h3>
            )}
            <p className="mt-3 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
              {project.homepageSummary}
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-[#3B8CFF]/80">
              {project.techLine}
            </p>
          </div>

          <p className="relative z-[1] mt-auto flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#3B8CFF]">
            <span>View case study</span>
            <ArrowNudge className="opacity-80 group-hover:opacity-100" />
          </p>
        </div>
      </Link>
    </motion.li>
  );
}

function useEqualCardHeights(itemRef: RefObject<HTMLLIElement | null>) {
  useLayoutEffect(() => {
    const list = itemRef.current?.parentElement;
    if (!list || list.dataset.equalCards === "on") return;
    list.dataset.equalCards = "on";

    const cards = () => [...list.querySelectorAll<HTMLElement>(":scope > li > a")];
    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      observer.disconnect();
      const nodes = cards();
      if (nodes.length < 2) return;
      nodes.forEach((node) => {
        node.style.minHeight = "";
      });
      const max = Math.ceil(
        Math.max(...nodes.map((node) => node.getBoundingClientRect().height)),
      );
      nodes.forEach((node) => {
        node.style.minHeight = `${max}px`;
      });
      observer.observe(list);
    };

    const observer = new ResizeObserver(measure);
    measure();
    window.addEventListener("resize", measure);
    void document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("resize", measure);
      delete list.dataset.equalCards;
      cards().forEach((node) => {
        node.style.minHeight = "";
      });
    };
  }, [itemRef]);
}
