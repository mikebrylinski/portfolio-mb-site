"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { FrameCorners } from "@/components/ui/FieldNotes";

function MediaLightbox({
  caption,
  onClose,
  children,
}: {
  caption: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[220] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#020617]/92"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-auto border border-[#3B8CFF]/40 bg-[#030910] p-3 sm:p-4">
        <FrameCorners />
        <div className="mb-3 flex items-center justify-between gap-4">
          <p
            id={titleId}
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/80"
          >
            {caption}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 border border-[#3B8CFF]/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white transition-colors hover:border-[#3B8CFF]"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}

const thumbButtonClass =
  "group relative block w-full border border-[#3B8CFF]/30 bg-[#030910] p-1.5 text-left transition-colors hover:border-[#3B8CFF]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B8CFF]";

function ThumbCaption({ caption }: { caption: string }) {
  return (
    <span className="mt-1.5 block font-mono text-[9px] uppercase leading-snug tracking-[0.14em] text-[#3B8CFF]/70">
      {caption}
    </span>
  );
}

export function AboutPhoto({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <figure className="w-full">
      <button
        type="button"
        className={thumbButtonClass}
        onClick={() => setOpen(true)}
        aria-label={`Open ${caption}`}
      >
        <FrameCorners size="sm" />
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          sizes="(max-width: 768px) 90vw, 560px"
          className="h-auto w-full"
        />
        <ThumbCaption caption={caption} />
      </button>
      {open ? (
        <MediaLightbox caption={caption} onClose={() => setOpen(false)}>
          <div className="relative mx-auto h-[min(76vh,860px)] w-full">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 896px) 92vw, 860px"
              className="object-contain"
            />
          </div>
        </MediaLightbox>
      ) : null}
    </figure>
  );
}

export function AboutClip({
  src,
  poster,
  caption,
}: {
  src: string;
  poster: string;
  caption: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <figure className="w-full">
      <button
        type="button"
        className={thumbButtonClass}
        onClick={() => setOpen(true)}
        aria-label={`Play ${caption}`}
      >
        <FrameCorners size="sm" />
        <span className="relative block">
          <Image
            src={poster}
            alt=""
            width={1280}
            height={720}
            sizes="(max-width: 768px) 90vw, 560px"
            className="aspect-video h-auto w-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="border border-[#3B8CFF]/70 bg-[#020617]/75 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white">
              Play
            </span>
          </span>
        </span>
        <ThumbCaption caption={caption} />
      </button>
      {open ? (
        <MediaLightbox caption={caption} onClose={() => setOpen(false)}>
          <video
            className="aspect-video w-full bg-black"
            controls
            playsInline
            autoPlay
            poster={poster}
          >
            <source src={src} type="video/mp4" />
          </video>
        </MediaLightbox>
      ) : null}
    </figure>
  );
}
