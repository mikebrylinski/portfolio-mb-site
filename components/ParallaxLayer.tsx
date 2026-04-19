"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

type ParallaxLayerProps = {
  children: React.ReactNode;
  className?: string;
  /** Max vertical shift in px (subtle) */
  y?: number;
};

/**
 * Very subtle scroll-linked parallax (GSAP ScrollTrigger).
 */
export function ParallaxLayer({
  children,
  className,
  y = 16,
}: ParallaxLayerProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const inner = root.querySelector<HTMLElement>("[data-parallax-inner]");
    if (!inner) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { y: 0 },
        {
          y: -y,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [y]);

  return (
    <div ref={rootRef} className={cn("overflow-hidden", className)}>
      <div
        data-parallax-inner
        className="relative h-full w-full will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
