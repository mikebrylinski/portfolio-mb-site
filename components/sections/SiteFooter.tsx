"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BrandMark } from "@/components/BrandMark";
import { sectionRevealTransition, sectionRevealViewport } from "@/lib/motion";
import { siteContainerClass } from "@/lib/site";

const footerNav = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#contact", label: "Contact" },
] as const;

export function SiteFooter() {
  const reduce = Boolean(useReducedMotion());

  return (
    <motion.footer
      className="border-t border-white/10 bg-[#020617] text-center sm:text-left"
      style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={sectionRevealViewport}
      transition={sectionRevealTransition(reduce)}
    >
      <div className={`${siteContainerClass} flex flex-col gap-10 py-12 md:py-14`}>
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col items-center sm:items-start">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center text-[clamp(1.05rem,2.6vw,1.25rem)] font-bold uppercase leading-none tracking-[-0.03em] transition-opacity hover:opacity-90"
              aria-label="Mike Brylinski home"
            >
              <span className="text-white">Mike</span>
              <span className="ml-1.5 text-[#3B8CFF]">Brylinski</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              Digital Product Designer & Full-Stack Developer. I design and
              build SaaS platforms, AI applications, and high-performance
              digital experiences.
            </p>
            <p
              className="mt-3 hidden font-mono text-[9px] uppercase tracking-[0.16em] text-[#3B8CFF]/35 sm:block"
              aria-hidden
            >
              LAT / 34.0928 · LONG / -118.3287
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:items-end">
            <nav
              className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 sm:justify-end"
              aria-label="Footer"
            >
              {footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <nav
              className="flex flex-wrap justify-center gap-x-3 gap-y-1 px-3 sm:justify-end"
              aria-label="Engagement pages"
            >
              <Link
                href="/saas-product-development"
                className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-[#3B8CFF]"
              >
                SaaS
              </Link>
              <Link
                href="/ai-product-development"
                className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-[#3B8CFF]"
              >
                AI
              </Link>
              <Link
                href="/membership-platforms"
                className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-[#3B8CFF]"
              >
                Membership
              </Link>
              <Link
                href="/hire"
                className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-[#3B8CFF]"
              >
                Hire
              </Link>
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Mike Brylinski. All Rights Reserved.
            Please Respect IP.
          </p>
          <BrandMark className="px-2.5 py-1.5 text-sm tracking-[-0.03em]" />
        </div>
      </div>
    </motion.footer>
  );
}
