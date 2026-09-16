"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudy, CaseStudyMockup } from "@/content/case-studies";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

/** Full-width case study visual — video gets native controls */
export function CaseStudyHeroMedia({ study }: { study: CaseStudy }) {
  const video = isVideo(study);

  if (video) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-contain saturate-[0.85] contrast-[1.02]"
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
      sizes="(max-width: 1100px) 100vw, 1100px"
      className="object-contain object-center"
      priority={false}
      unoptimized={study.visualSrc.endsWith(".svg")}
    />
  );
}

function MockupFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full max-w-full overflow-hidden border border-[#3B8CFF]/35 bg-[#030910] ${className ?? ""}`}
    >
      <span
        className="pointer-events-none absolute left-0 top-0 z-10 h-2.5 w-2.5 border-l border-t border-[#3B8CFF]"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute right-0 top-0 z-10 h-2.5 w-2.5 border-r border-t border-[#3B8CFF]"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-2.5 w-2.5 border-b border-l border-[#3B8CFF]"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute bottom-0 right-0 z-10 h-2.5 w-2.5 border-b border-r border-[#3B8CFF]"
        aria-hidden
      />
      {children}
    </div>
  );
}

/** Device mockups — framed as blueprint plates, contained in parent */
export function CaseStudyDeviceMockups({ mockups }: { mockups: CaseStudyMockup[] }) {
  const reduce = useReducedMotion();

  if (mockups.length === 0) return null;

  if (mockups.length > 2) {
    return (
      <div className="relative min-w-0 overflow-hidden bg-[#06101c]/80">
        <div
          className="pointer-events-none absolute inset-0 blueprint-grid opacity-60"
          aria-hidden
        />
        <div className="relative grid min-w-0 gap-8 px-5 py-10 sm:grid-cols-2 md:gap-8 md:px-7 md:py-12">
          {mockups.map((item, i) => {
            const tall =
              Boolean(item.src?.includes("iphone") || item.src?.includes("ipad")) ||
              /9\/16|portrait/i.test(item.label);
            return (
              <motion.figure
                key={`${item.label}-${i}`}
                initial={{ opacity: 0, y: reduce ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: reduce ? 0 : 0.9,
                  delay: reduce ? 0 : i * 0.08,
                  ease,
                }}
                className="relative min-w-0"
              >
                <MockupFrame
                  className={
                    tall
                      ? "mx-auto aspect-[9/16] max-h-[min(70vh,520px)] max-w-[min(100%,280px)]"
                      : "aspect-[16/10] max-h-[min(55vh,420px)]"
                  }
                >
                  {item.placeholder || !item.src ? (
                    <MockupPlaceholder label={item.label} />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-contain object-center p-2"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      priority={i < 2}
                    />
                  )}
                </MockupFrame>
                <figcaption className="mt-4 flex flex-col gap-1">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#3B8CFF]">
                    Fig. {String.fromCharCode(65 + i)} — {item.label}
                  </span>
                  {item.caption ? (
                    <span className="max-w-md text-sm leading-relaxed text-[#9cb6d4]">
                      {item.caption}
                    </span>
                  ) : null}
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    );
  }

  const desktop = mockups[0];
  const mobile = mockups[1] ?? mockups[0];
  if (!desktop) return null;

  return (
    <div className="relative min-w-0 overflow-hidden bg-[#06101c]/80">
      <div
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-60"
        aria-hidden
      />

      <div className="relative grid min-w-0 items-end gap-8 px-5 py-10 md:grid-cols-[1.35fr_0.65fr] md:gap-6 md:px-7 md:py-12 lg:gap-8">
        <motion.figure
          initial={{ opacity: 0, y: reduce ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reduce ? 0 : 0.95, ease }}
          className="relative min-w-0"
        >
          <MockupFrame className="aspect-[16/10] max-h-[min(50vh,440px)]">
            {desktop.placeholder || !desktop.src ? (
              <MockupPlaceholder label={desktop.label} />
            ) : (
              <Image
                src={desktop.src}
                alt={desktop.alt}
                fill
                className="object-contain object-center p-2 sm:p-3"
                sizes="(max-width: 768px) 100vw, 65vw"
                priority
              />
            )}
          </MockupFrame>
          <figcaption className="mt-5 flex flex-col gap-1">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#3B8CFF]">
              Fig. A — {desktop.label}
            </span>
            {desktop.caption ? (
              <span className="max-w-md text-sm leading-relaxed text-[#9cb6d4]">
                {desktop.caption}
              </span>
            ) : null}
          </figcaption>
        </motion.figure>

        <motion.figure
          initial={{ opacity: 0, y: reduce ? 0 : 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.12, ease }}
          className="relative mx-auto w-full min-w-0 max-w-[240px] md:mb-8 md:max-w-none"
        >
          <MockupFrame className="mx-auto aspect-[9/16] max-h-[min(60vh,480px)] w-full max-w-[240px] md:max-w-[260px]">
            {mobile.placeholder || !mobile.src ? (
              <MockupPlaceholder label={mobile.label} />
            ) : (
              <Image
                src={mobile.src}
                alt={mobile.alt}
                fill
                className="object-contain object-center p-2"
                sizes="(max-width: 768px) 70vw, 260px"
              />
            )}
          </MockupFrame>
          <figcaption className="mt-5 flex flex-col gap-1 text-center md:text-left">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#3B8CFF]">
              Fig. B — {mobile.label}
            </span>
            {mobile.caption ? (
              <span className="text-sm leading-relaxed text-[#9cb6d4]">{mobile.caption}</span>
            ) : null}
          </figcaption>
        </motion.figure>
      </div>
    </div>
  );
}

function MockupPlaceholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#030910] p-6 text-center">
      <div
        className="pointer-events-none absolute inset-3 border border-dashed border-[#3B8CFF]/30"
        aria-hidden
      />
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#3B8CFF]/70">
        Photo placeholder
      </span>
      <span className="max-w-[14rem] font-mono text-xs uppercase tracking-[0.14em] text-white/70">
        {label}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#3B8CFF]/40">
        Screenshot pending
      </span>
    </div>
  );
}
