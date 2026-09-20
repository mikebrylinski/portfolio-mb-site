import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { FrameCorners } from "@/components/ui/FieldNotes";

export function Panel({
  children,
  className,
  corners = true,
}: {
  children: ReactNode;
  className?: string;
  corners?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative border border-[#3B8CFF]/25 bg-[#06101c]/70 p-4 sm:p-5",
        className,
      )}
    >
      {corners ? <FrameCorners size="sm" /> : null}
      {children}
    </div>
  );
}

export function PanelTitle({
  code,
  children,
}: {
  code?: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center gap-3">
      {code ? (
        <span className="font-mono text-[10px] tracking-[0.2em] text-[#3B8CFF]">
          {code}
        </span>
      ) : null}
      <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#3B8CFF]/90">
        {children}
      </h2>
    </div>
  );
}

export function ProgressBar({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn("h-2 w-full overflow-hidden border border-[#3B8CFF]/30 bg-[#020617]", className)}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-[#3B8CFF]/80 transition-[width] duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <div className="border border-[#3B8CFF]/15 bg-[#020617]/60 p-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/75">
        {label}
      </p>
      <p className="mt-1 text-xl font-semibold tracking-tight text-white">{value}</p>
      {hint ? <p className="mt-1 text-xs text-[#9cb6d4]">{hint}</p> : null}
    </div>
  );
}

export function McButton({
  children,
  variant = "outline",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outline" | "solid" | "ghost";
}) {
  return (
    <button
      className={cn(
        "inline-flex min-h-[40px] items-center justify-center px-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors disabled:opacity-50",
        variant === "outline" &&
          "border border-[#3B8CFF] bg-[#3B8CFF]/10 text-white hover:bg-[#3B8CFF]/20",
        variant === "solid" && "border border-[#3B8CFF] bg-[#3B8CFF] text-[#020617] hover:bg-[#5aa0ff]",
        variant === "ghost" && "border border-transparent text-[#9cb6d4] hover:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function McInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full border border-[#3B8CFF]/25 bg-[#06101c]/70 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#3B8CFF]/55 focus:ring-2 focus:ring-[#3B8CFF]/20",
        className,
      )}
      {...props}
    />
  );
}

export function McSelect({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full border border-[#3B8CFF]/25 bg-[#06101c]/70 px-3 py-2 text-sm text-white outline-none focus:border-[#3B8CFF]/55 focus:ring-2 focus:ring-[#3B8CFF]/20",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function McTextarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full border border-[#3B8CFF]/25 bg-[#06101c]/70 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#3B8CFF]/55 focus:ring-2 focus:ring-[#3B8CFF]/20",
        className,
      )}
      {...props}
    />
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/80">
        {label}
      </span>
      {children}
    </label>
  );
}

export function ErrorText({ children }: { children?: string | null }) {
  if (!children) return null;
  return <p className="text-sm text-red-400">{children}</p>;
}

export function StageTimeline({
  stages,
}: {
  stages: { JOB: boolean; RUNWAY: boolean; TEST: boolean; RV_LIFE: boolean };
}) {
  const items = [
    { key: "JOB" as const, label: "JOB" },
    { key: "RUNWAY" as const, label: "RUNWAY" },
    { key: "TEST" as const, label: "TEST" },
    { key: "RV_LIFE" as const, label: "RV LIFE" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item, i) => (
        <div key={item.key} className="flex items-center gap-2">
          <span
            className={cn(
              "border px-2 py-1 font-mono text-[10px] tracking-[0.16em]",
              stages[item.key]
                ? "border-[#3B8CFF] bg-[#3B8CFF]/20 text-white"
                : "border-[#3B8CFF]/25 text-[#9cb6d4]",
            )}
          >
            {item.label}
            {stages[item.key] ? " ✓" : ""}
          </span>
          {i < items.length - 1 ? (
            <span className="font-mono text-[10px] text-[#3B8CFF]/50">→</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
