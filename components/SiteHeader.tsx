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
      "rounded-md px-3 py-2 text-sm text-[#A1A1A1] transition-colors duration-300 hover:text-[#39ff88]",
    [],
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-white/[0.08] bg-[#000000]/70 backdrop-blur-md supports-[backdrop-filter]:bg-[#000000]/55",
        headerVisible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-5 sm:h-16 sm:px-8">
        <Link
          href="/"
          className="min-h-[44px] min-w-[44px] py-2 pr-4 text-sm font-medium tracking-tight text-white transition-colors duration-300 hover:text-[#39ff88] sm:text-[15px]"
        >
          Michael Brylinski
        </Link>
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
          <Link
            href={workHref}
            className={cn(
              linkClass,
              navActive === "work" ? "text-white opacity-100" : "opacity-80",
            )}
          >
            <span className="relative inline-block">
              Work
              <span
                className={cn(
                  "pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left bg-[#39ff88] transition-transform duration-500",
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
                navActive === item.id ? "text-white opacity-100" : "opacity-80",
              )}
            >
              <span className="relative inline-block">
                {item.label}
                <span
                  className={cn(
                    "pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left bg-white transition-transform duration-500",
                    navActive === item.id ? "scale-x-100" : "scale-x-0",
                  )}
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-white/[0.12] text-white transition-opacity hover:opacity-80 md:hidden"
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
          className="fixed inset-0 top-14 z-50 flex flex-col bg-black px-5 md:hidden"
          style={{
            paddingTop: "max(1rem, env(safe-area-inset-top))",
            paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
          }}
        >
          <nav className="flex w-full flex-col items-center gap-1 pt-6" aria-label="Mobile">
            <Link
              href={workHref}
              className="w-full max-w-xs py-3 text-center text-lg text-[#A1A1A1] transition-colors hover:text-[#39ff88]"
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
                  className="w-full max-w-xs py-3 text-center text-lg text-[#A1A1A1] transition-colors hover:text-[#39ff88]"
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
