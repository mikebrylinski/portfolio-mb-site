"use client";

import { clients } from "@/content/clients";

export function ClientTicker() {
  const items = clients as readonly string[];

  return (
    <div
      className="group-ticker relative overflow-hidden border-y border-[#39ff88]/20 bg-[#030303]/95 py-3 shadow-[inset_0_0_60px_rgba(57,255,136,0.04)] backdrop-blur-sm md:py-3.5"
      aria-label="Selected clients and partners"
    >
      {/* Edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#030303] to-transparent md:w-24"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#030303] to-transparent md:w-24"
        aria-hidden
      />

      {/* Scan-line texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57,255,136,0.35) 2px, rgba(57,255,136,0.35) 3px)",
        }}
        aria-hidden
      />

      <div className="relative z-[1] flex items-center gap-4 px-7 md:gap-6 md:px-8">
        <div className="hidden shrink-0 items-center gap-2 border-r border-[#39ff88]/25 pr-4 sm:flex md:pr-6">
          <span
            className="relative flex h-2 w-2 shrink-0 rounded-full bg-[#39ff88]"
            aria-hidden
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[#39ff88] opacity-40" />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#39ff88]">
              Client feed
            </span>
            <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
              Live channel
            </span>
          </div>
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="client-ticker-track flex w-max">
            <ul className="flex shrink-0 list-none items-stretch p-0">
              {items.map((name) => (
                <li
                  key={name}
                  className="flex items-center border-l border-white/[0.08] first:border-l-0"
                >
                  <span className="flex items-center gap-2.5 whitespace-nowrap px-6 py-1 md:px-8">
                    <span
                      className="font-mono text-[9px] text-[#39ff88]/55 md:text-[10px]"
                      aria-hidden
                    >
                      ◆
                    </span>
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white/88 md:text-xs">
                      {name}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <ul className="flex shrink-0 list-none items-stretch p-0" aria-hidden>
              {items.map((name) => (
                <li
                  key={`dup-${name}`}
                  className="flex items-center border-l border-white/[0.08] first:border-l-0"
                >
                  <span className="flex items-center gap-2.5 whitespace-nowrap px-6 py-1 md:px-8">
                    <span className="font-mono text-[9px] text-[#39ff88]/55 md:text-[10px]" aria-hidden>
                      ◆
                    </span>
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white/88 md:text-xs">
                      {name}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
