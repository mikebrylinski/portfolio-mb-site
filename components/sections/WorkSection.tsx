"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { SectionShell } from "@/components/SectionShell";
import type { WorkItem } from "@/content/work";
import { workItems } from "@/content/work";

function canOpenInViewer(item: WorkItem) {
  if (item.type === "image") return Boolean(item.src);
  return item.type === "video" && Boolean(item.src);
}

function WorkMediaPreview({
  item,
  isClickable,
}: {
  item: WorkItem;
  isClickable: boolean;
}) {
  if (item.type === "image" && item.src) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-white/5">
        <Image
          src={item.src}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className={`object-cover object-center transition-transform duration-300 ${isClickable ? "group-hover:scale-[1.02]" : ""}`}
          aria-hidden={isClickable}
        />
        {isClickable && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/25 group-hover:opacity-100">
            <span className="rounded-full bg-[#3B8CFF] px-4 py-2 text-sm font-medium text-[#050505] shadow-lg">
              View larger
            </span>
          </div>
        )}
      </div>
    );
  }

  if (item.type === "video" && item.src) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-black">
        <video
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="metadata"
          poster={item.poster}
          aria-hidden={isClickable}
        >
          <source src={item.src} type="video/mp4" />
        </video>
        {isClickable && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
            <span className="rounded-full bg-[#3B8CFF]/90 px-4 py-2 text-sm font-medium text-[#050505]">
              Open viewer
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex aspect-[16/10] flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/[0.03] px-4 text-center">
      <p className="text-sm font-medium text-white/70">Video slot</p>
      <p className="mt-2 text-xs text-white/45">
        Add an MP4 to{" "}
        <code className="rounded bg-white/10 px-1 py-0.5 text-[#3B8CFF]">
          public/work/
        </code>{" "}
        and set <code className="rounded bg-white/10 px-1 py-0.5">src</code> in{" "}
        <code className="rounded bg-white/10 px-1 py-0.5">content/work.ts</code>
      </p>
    </div>
  );
}

function WorkLightbox({
  item,
  onClose,
}: {
  item: WorkItem;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    closeRef.current?.focus();
  }, [item]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        aria-label="Close viewer"
        onClick={onClose}
      />
      <div
        className="relative z-10 flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
          <h3 id={titleId} className="text-left text-lg font-semibold text-[#fafafa]">
            {item.title}
          </h3>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/20"
          >
            Close
          </button>
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center p-4 sm:p-6">
          {item.type === "image" && item.src && (
            <div className="relative h-[min(75vh,800px)] w-full max-w-5xl">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 95vw, 1024px"
                priority
              />
            </div>
          )}
          {item.type === "video" && item.src && (
            <video
              className="max-h-[75vh] w-full max-w-5xl rounded-lg"
              controls
              playsInline
              autoPlay
              poster={item.poster}
            >
              <source src={item.src} type="video/mp4" />
            </video>
          )}
        </div>
        {item.caption && (
          <p className="border-t border-white/10 px-4 py-3 text-center text-sm text-white/65 sm:px-6">
            {item.caption}
          </p>
        )}
      </div>
    </div>
  );
}

export function WorkSection() {
  const [openItem, setOpenItem] = useState<WorkItem | null>(null);

  const close = useCallback(() => setOpenItem(null), []);

  return (
    <SectionShell id="work" variant={3}>
      <p className="mx-auto max-w-3xl text-sm font-medium uppercase tracking-widest text-[#3B8CFF]">
        Work
      </p>
      <h2 className="mx-auto mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-[#fafafa] md:text-3xl lg:text-4xl">
        Selected builds & demos
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base text-white/65">
        Screenshots, UI captures, and video walkthroughs — tap an item to view
        it larger.
      </p>

      <div className="mx-auto mt-12 grid w-full max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {workItems.map((item) => {
          const openable = canOpenInViewer(item);
          return (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] text-center transition-colors hover:border-[#3B8CFF]/35"
            >
              <div className="p-2">
                {openable ? (
                  <button
                    type="button"
                    onClick={() => setOpenItem(item)}
                    className="group w-full cursor-zoom-in overflow-hidden rounded-xl border-0 bg-transparent p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B8CFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
                    aria-label={`Open ${item.title} in viewer`}
                  >
                    <WorkMediaPreview item={item} isClickable />
                  </button>
                ) : (
                  <WorkMediaPreview item={item} isClickable={false} />
                )}
              </div>
              <div className="flex flex-1 flex-col px-4 pb-5 pt-2">
                <h3 className="text-lg font-semibold text-[#fafafa]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{item.caption}</p>
              </div>
            </article>
          );
        })}
      </div>

      {openItem && <WorkLightbox item={openItem} onClose={close} />}
    </SectionShell>
  );
}
