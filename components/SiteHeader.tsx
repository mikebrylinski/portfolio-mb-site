"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { siteContainerClass } from "@/lib/site";

const SECTION_IDS = ["work", "about", "services", "contact"] as const;

type NavItem = {
  id: (typeof SECTION_IDS)[number];
  label: string;
};

const navItems: NavItem[] = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const onHome = pathname === "/";
  const navActive = onHome ? active : null;

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

  const handleNavClick = useCallback(
    (item: NavItem, e: React.MouseEvent) => {
      if (!onHome) return;
      e.preventDefault();
      scrollToId(item.id);
      setOpen(false);
    },
    [onHome],
  );

  const workHref = onHome ? "/#work" : "/work";

  return (
    <header
      className="sticky inset-x-0 top-0 z-50 border-b border-white/10 bg-[#020617]"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div
        className={cn(
          siteContainerClass,
          "flex min-h-[3.75rem] items-center justify-between sm:min-h-16",
        )}
      >
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center py-2 text-[clamp(0.95rem,2.4vw,1.15rem)] font-bold uppercase leading-none tracking-[-0.03em] transition-opacity hover:opacity-90"
          aria-label="mikebweb.com home"
        >
          <span className="text-white">mikeb</span>
          <span className="text-[#3B8CFF]">web.com</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navItems.map((item) => {
            const href =
              item.id === "work"
                ? workHref
                : onHome
                  ? `/#${item.id}`
                  : `/#${item.id}`;
            return (
              <Link
                key={item.id}
                href={href}
                onClick={(e) => handleNavClick(item, e)}
                className={cn(
                  "px-3 py-2 text-[11px] font-medium uppercase tracking-[0.24em] transition-colors",
                  navActive === item.id
                    ? "text-white"
                    : "text-white/70 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center text-white md:hidden"
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
          className="fixed inset-0 top-[calc(env(safe-area-inset-top,0px)+3.75rem)] z-50 flex flex-col bg-[#020617]/95 px-7 backdrop-blur-md md:hidden"
          style={{
            paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
          }}
        >
          <nav className="flex w-full flex-col items-center gap-2 pt-10" aria-label="Mobile">
            {navItems.map((item) => {
              const href =
                item.id === "work"
                  ? workHref
                  : item.id === "contact" && !onHome
                    ? "/contact"
                    : `/#${item.id}`;
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
          </nav>
        </div>
      )}
    </header>
  );
}
