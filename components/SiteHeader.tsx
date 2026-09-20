"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { ResumeCta } from "@/components/ResumeCta";
import { cn } from "@/lib/cn";
import { siteContainerClass } from "@/lib/site";

const SECTION_IDS = ["work", "experience", "about", "skills", "contact"] as const;

type SectionNavItem = {
  kind: "section";
  id: (typeof SECTION_IDS)[number];
  label: string;
};

type RouteNavItem = {
  kind: "route";
  href: string;
  label: string;
};

type NavItem = SectionNavItem | RouteNavItem;

const navItems: NavItem[] = [
  { kind: "section", id: "work", label: "Work" },
  { kind: "section", id: "experience", label: "Experience" },
  { kind: "section", id: "about", label: "About" },
  { kind: "section", id: "skills", label: "Skills" },
  { kind: "section", id: "contact", label: "Contact" },
  { kind: "route", href: "/recruiters", label: "Recruiters" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function sectionHref(id: SectionNavItem["id"], onHome: boolean) {
  if (id === "work") return onHome ? "/#work" : "/work";
  if (id === "contact" && !onHome) return "/contact";
  return `/#${id}`;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const onHome = pathname === "/";
  const navActive = onHome ? active : null;
  const recruitersActive = pathname === "/recruiters";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!onHome) return;

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, rootMargin: "-42% 0px -42% 0px", threshold: [0.08, 0.22, 0.45] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome]);

  const handleSectionClick = useCallback(
    (id: SectionNavItem["id"], e: React.MouseEvent) => {
      if (!onHome) return;
      e.preventDefault();
      scrollToId(id);
      setOpen(false);
    },
    [onHome],
  );

  return (
    <header
      className="sticky inset-x-0 top-0 z-50 border-b border-white/10 bg-[#020617]"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div
        className={cn(
          siteContainerClass,
          "flex min-h-[3.75rem] items-center justify-between gap-3 sm:min-h-16",
        )}
      >
        <BrandMark className="text-[clamp(1.15rem,2.8vw,1.4rem)]" />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {navItems.map((item) => {
            if (item.kind === "route") {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-2 py-2 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors xl:px-2.5 xl:tracking-[0.2em]",
                    recruitersActive
                      ? "text-white"
                      : "text-white/70 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            }

            const href = sectionHref(item.id, onHome);
            return (
              <Link
                key={item.id}
                href={href}
                onClick={(e) => handleSectionClick(item.id, e)}
                className={cn(
                  "px-2 py-2 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors xl:px-2.5 xl:tracking-[0.2em]",
                  navActive === item.id
                    ? "text-white"
                    : "text-white/70 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <ResumeCta variant="compact" className="ml-2" />
        </nav>

        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 top-[calc(env(safe-area-inset-top,0px)+3.75rem)] z-50 flex flex-col bg-[#020617]/95 px-7 backdrop-blur-md lg:hidden"
          style={{
            paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
          }}
        >
          <nav className="flex w-full flex-col items-center gap-1 pt-8" aria-label="Mobile">
            {navItems.map((item) => {
              if (item.kind === "route") {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="w-full max-w-sm py-3.5 text-center text-sm font-medium uppercase tracking-[0.28em] text-white/85 transition-colors hover:text-[#3B8CFF]"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              }

              const href = sectionHref(item.id, onHome);
              return (
                <Link
                  key={item.id}
                  href={href}
                  className="w-full max-w-sm py-3.5 text-center text-sm font-medium uppercase tracking-[0.28em] text-white/85 transition-colors hover:text-[#3B8CFF]"
                  onClick={(e) => {
                    if (onHome) {
                      e.preventDefault();
                      scrollToId(item.id);
                    }
                    setOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4">
              <ResumeCta variant="compact" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
