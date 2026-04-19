"use client";

import Image from "next/image";
import type { CaseStudy } from "@/content/case-studies";

function isVideo(study: Pick<CaseStudy, "visualType">) {
  return study.visualType === "video";
}

/** Card / grid thumbnail — video shows poster + paused first frame; image uses Next/Image */
export function CaseStudyThumbMedia({ project }: { project: CaseStudy }) {
  const video = isVideo(project);

  if (video) {
    return (
      <>
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-95 transition-transform duration-500 group-hover:scale-[1.02]"
          src={project.visualSrc}
          poster={project.visualPoster}
          muted
          playsInline
          preload="metadata"
          aria-label={project.visualAlt}
        />
        <span
          className="pointer-events-none absolute bottom-2.5 right-2.5 rounded border border-white/15 bg-black/55 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/85"
          aria-hidden
        >
          Video
        </span>
      </>
    );
  }

  return (
    <Image
      src={project.visualSrc}
      alt=""
      fill
      className="object-cover object-center opacity-90 saturate-[0.85] transition-transform duration-500 group-hover:scale-[1.02]"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      unoptimized={project.visualSrc.endsWith(".svg")}
    />
  );
}

/** Full-bleed case study visual — video gets native controls */
export function CaseStudyHeroMedia({ study }: { study: CaseStudy }) {
  const video = isVideo(study);

  if (video) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover saturate-[0.85] contrast-[1.02]"
        src={study.visualSrc}
        poster={study.visualPoster}
        controls
        playsInline
        preload="metadata"
      />
    );
  }

  return (
    <Image
      src={study.visualSrc}
      alt={study.visualAlt}
      fill
      sizes="100vw"
      className="object-cover object-center saturate-[0.72] contrast-[1.02]"
      priority={false}
      unoptimized={study.visualSrc.endsWith(".svg")}
    />
  );
}
