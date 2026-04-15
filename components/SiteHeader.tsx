"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#results", label: "Results" },
  { href: "/#tech", label: "Tech" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

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

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/80 backdrop-blur-md supports-[backdrop-filter]:bg-[#050505]/60"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/#hero"
          className="min-h-[44px] min-w-[44px] py-2 pr-4 text-sm font-semibold tracking-tight text-white transition-colors hover:text-[#39ff88] sm:text-base"
        >
          Michael Brylinski
        </Link>
        <nav className="hidden items-center gap-1 md:flex md:gap-2" aria-label="Main">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:text-[#39ff88] sm:px-3"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 rounded-md bg-[#39ff88] px-4 py-2 text-sm font-medium text-[#050505] transition-opacity hover:opacity-90"
          >
            Contact
          </Link>
        </nav>
        <button
          type="button"
          className="md:hidden flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-white/15 text-white hover:bg-white/5"
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
          className="fixed inset-0 top-14 z-50 flex flex-col bg-black px-4 md:hidden"
          style={{
            paddingTop: "max(1rem, env(safe-area-inset-top))",
            paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
          }}
        >
          <nav
            className="flex w-full flex-col items-center gap-1 pt-4"
            aria-label="Mobile"
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="w-full max-w-xs py-3 text-center text-lg text-white hover:text-[#39ff88]"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 w-full max-w-xs rounded-lg bg-[#39ff88] px-6 py-3 text-center text-lg font-medium text-black"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
