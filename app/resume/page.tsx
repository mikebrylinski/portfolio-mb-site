import type { Metadata } from "next";
import Link from "next/link";
import { FieldLabel, FrameCorners } from "@/components/ui/FieldNotes";
import { absoluteUrl, siteContainerClass, siteConfig } from "@/lib/site";

const title = "Resume";
const description =
  "Resume for Michael Brylinski, Senior Full-Stack Developer. PDF coming soon — use Contact in the meantime.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/resume" },
  openGraph: {
    title: `${title} — ${siteConfig.name}`,
    description,
    url: absoluteUrl("/resume"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${siteConfig.name}`,
    description,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ResumePlaceholderPage() {
  return (
    <main id="main-content" className="relative min-h-dvh overflow-hidden bg-[#020617] text-white">
      <div
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-40"
        aria-hidden
      />
      <div
        className={`${siteContainerClass} relative z-[1] flex min-h-[70dvh] flex-col justify-center py-24`}
      >
        <div className="relative max-w-xl border border-[#3B8CFF]/25 px-5 py-8 sm:px-7 sm:py-10">
          <FrameCorners />
          <FieldLabel>Sheet — Resume</FieldLabel>
          <h1 className="mt-5 text-[clamp(1.75rem,4vw,2.75rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
            Resume PDF{" "}
            <span className="text-[#3B8CFF]">pending.</span>
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
            A downloadable resume is not in the project yet. This is a placeholder
            so the Download Resume buttons stay visible without linking to a
            missing file.
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#3B8CFF]/70">
            Expected path · {siteConfig.resumePath}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/recruiters"
              className="inline-flex min-h-[48px] items-center gap-2 border border-[#3B8CFF] bg-[#3B8CFF]/10 px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-[background-color] hover:bg-[#3B8CFF]/20"
            >
              Recruiter snapshot
              <span aria-hidden className="text-[#3B8CFF]">
                →
              </span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] items-center gap-2 border border-white/25 px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-[border-color,background-color] hover:border-[#3B8CFF]/50 hover:bg-[#3B8CFF]/10"
            >
              Contact
              <span aria-hidden className="text-[#3B8CFF]">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
