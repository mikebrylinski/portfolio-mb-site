"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { apiFetch, formatTimestamp } from "@/components/mission-control/api-client";
import { McButton } from "@/components/mission-control/ui";

const NAV = [
  { href: "/admin/mission-control", label: "Overview", exact: true },
  { href: "/admin/mission-control/roadmap", label: "Roadmap" },
  { href: "/admin/mission-control/today", label: "Today" },
  { href: "/admin/mission-control/pipeline", label: "Pipeline" },
  { href: "/admin/mission-control/recruiters", label: "Recruiters" },
  { href: "/admin/mission-control/goals", label: "Goals" },
  { href: "/admin/mission-control/interviews", label: "Interviews" },
  { href: "/admin/mission-control/finances", label: "Finances" },
  { href: "/admin/mission-control/rv", label: "RV Ready" },
  { href: "/admin/mission-control/data", label: "Data" },
];

export function MissionNav({ lastSaved }: { lastSaved?: string | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    setLoggingOut(true);
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
      router.replace("/admin/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#3B8CFF]/20 bg-[#020617]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <Link
            href="/admin/mission-control"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#3B8CFF]"
          >
            Mission Control
          </Link>
          <p className="truncate text-xs text-[#9cb6d4]">
            Last saved: {formatTimestamp(lastSaved)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <McButton
            type="button"
            variant="ghost"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            Menu
          </McButton>
          <McButton type="button" variant="outline" onClick={logout} disabled={loggingOut}>
            {loggingOut ? "…" : "Logout"}
          </McButton>
        </div>
      </div>
      <nav
        className={cn(
          "border-t border-[#3B8CFF]/15 bg-[#030910]",
          open ? "block" : "hidden lg:block",
        )}
      >
        <div className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-2 py-2 sm:px-4">
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "shrink-0 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors",
                  active
                    ? "border border-[#3B8CFF]/50 bg-[#3B8CFF]/15 text-white"
                    : "border border-transparent text-[#9cb6d4] hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
