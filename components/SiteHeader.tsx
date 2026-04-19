"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useIntro } from "@/components/providers/IntroProvider";
import { cn } from "@/lib/cn";

const SECTION_IDS = ["work", "services", "process", "about", "contact"] as const;

type NavItem = {
  id: (typeof SECTION_IDS)[number];
  label: string;
};

const navItems: NavItem[] = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteHeader() {
  const pathname = usePathname();
  const { shellReady, introOpen } = useIntro();
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
        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
      },
      { root: null, rootMargin: "-42% 0px -42% 0px", threshold: [0.08, 0.22, 0.45] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome]);

  const headerVisible = !shellReady || !introOpen;

  const workHref = onHome ? "/#work" : "/work";

  const handleNavClick = useCallback(
    (item: NavItem, e: React.MouseEvent) => {
      if (!onHome) return;
      if (item.id === "work") return;
      e.preventDefault();
      scrollToId(item.id);
      setOpen(false);
    },
    [onHome],
  );

  const linkClass = useMemo(
    () =>
      "rounded-md px-2.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#A1A1A1] transition-colors duration-300 hover:text-[#39ff88] sm:px-3 sm:text-[11px] sm:tracking-[0.22em]",
    [],
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-[#39ff88]/22 bg-[#030303]/95 shadow-[inset_0_0_48px_rgba(57,255,136,0.05)] backdrop-blur-md supports-[backdrop-filter]:bg-[#030303]/88",
        headerVisible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.065]"
        aria-hidden
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57,255,136,0.35) 2px, rgba(57,255,136,0.35) 3px)",
        }}
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-12 bg-gradient-to-r from-[#030303] to-transparent sm:w-16" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-12 bg-gradient-to-l from-[#030303] to-transparent sm:w-16" aria-hidden />

      <div className="relative z-[2] mx-auto flex min-h-[3.5rem] max-w-[1100px] items-center justify-between px-7 sm:min-h-16 sm:px-8 lg:px-10">
        <Link
          href="/"
          className={cn(
            "min-h-[44px] min-w-0 max-w-[calc(100%-3.75rem)] shrink truncate py-2 pr-2 font-mono text-[11px] font-semibold uppercase leading-none tracking-[0.1em] text-white transition-colors duration-300 hover:text-[#39ff88] sm:max-w-[calc(100%-4.25rem)] sm:text-xs md:max-w-none md:overflow-visible md:pr-4 md:text-sm lg:text-[15px] lg:tracking-[0.2em]",
            "whitespace-nowrap",
          )}
        >
          Michael Brylinski
        </Link>

        <div className="hidden items-center gap-5 md:flex lg:gap-7">
          <div className="hidden shrink-0 items-center gap-2 border-r border-[#39ff88]/25 pr-4 md:flex md:pr-5">
            <span className="relative flex h-2 w-2 shrink-0 rounded-full bg-[#39ff88]" aria-hidden>
              <span className="absolute inset-0 animate-ping rounded-full bg-[#39ff88] opacity-35" />
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#39ff88]">
                Nav feed
              </span>
              <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                Live index
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-0.5 lg:gap-1" aria-label="Main">
            <Link
              href={workHref}
              className={cn(
                linkClass,
                navActive === "work" ? "text-white" : "text-[#A1A1A1]/90",
              )}
            >
              <span className="relative inline-block pb-0.5">
                Work
                <span
                  className={cn(
                    "pointer-events-none absolute -bottom-0.5 left-0 h-[2px] w-full origin-left rounded-[1px] bg-[#39ff88] transition-transform duration-500",
                    navActive === "work" ? "scale-x-100" : "scale-x-0",
                  )}
                  aria-hidden
                />
              </span>
            </Link>
            {navItems.slice(1).map((item) => (
              <Link
                key={item.id}
                href={onHome ? `/#${item.id}` : `/#${item.id}`}
                onClick={(e) => handleNavClick(item, e)}
                className={cn(
                  linkClass,
                  navActive === item.id ? "text-white" : "text-[#A1A1A1]/90",
                )}
              >
                <span className="relative inline-block pb-0.5">
                  {item.label}
                  <span
                    className={cn(
                      "pointer-events-none absolute -bottom-0.5 left-0 h-[2px] w-full origin-left rounded-[1px] bg-[#39ff88] transition-transform duration-500",
                      navActive === item.id ? "scale-x-100" : "scale-x-0",
                    )}
                    aria-hidden
                  />
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-[#39ff88]/25 bg-black/40 text-white shadow-[inset_0_0_20px_rgba(57,255,136,0.04)] transition-[border-color,opacity] hover:border-[#39ff88]/45 hover:opacity-90 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Close" : "Menu"}</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
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
          className="fixed inset-0 top-[calc(env(safe-area-inset-top,0px)+3.5rem)] z-50 flex flex-col border-t border-[#39ff88]/20 bg-[#030303] px-7 sm:top-[calc(env(safe-area-inset-top,0px)+4rem)] md:hidden"
          style={{
            paddingTop: "max(1rem, env(safe-area-inset-top))",
            paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
          }}
        >
          <nav className="flex w-full flex-col items-center gap-3 pt-6" aria-label="Mobile">
            <Link
              href={workHref}
              className="w-full max-w-sm rounded-xl border border-[#39ff88]/18 bg-black/55 px-5 py-3.5 text-center font-mono text-sm font-medium uppercase tracking-[0.28em] text-[#A1A1A1] shadow-[inset_0_0_32px_rgba(57,255,136,0.05)] backdrop-blur-sm transition-colors hover:border-[#39ff88]/35 hover:text-[#39ff88]"
              onClick={() => setOpen(false)}
            >
              Work
            </Link>
            {navItems.slice(1).map((item) => {
              const href =
                item.id === "contact" && !onHome
                  ? "/contact"
                  : item.id === "contact"
                    ? "/#contact"
                    : `/#${item.id}`;
              return (
                <Link
                  key={item.id}
                  href={href}
                  className="w-full max-w-sm rounded-xl border border-[#39ff88]/18 bg-black/55 px-5 py-3.5 text-center font-mono text-sm font-medium uppercase tracking-[0.28em] text-[#A1A1A1] shadow-[inset_0_0_32px_rgba(57,255,136,0.05)] backdrop-blur-sm transition-colors hover:border-[#39ff88]/35 hover:text-[#39ff88]"
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
