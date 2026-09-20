import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ResumeCta } from "@/components/ResumeCta";
import { MountainBackdrop } from "@/components/sections/MountainBackdrop";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { AestheticNote, FieldLabel, FrameCorners } from "@/components/ui/FieldNotes";
import { absoluteUrl, emailHref, githubHref, siteConfig, siteContainerClass } from "@/lib/site";

const title = "Contact";
const description =
  "Contact Michael Brylinski — senior full-stack developer open to remote full-time W-2 opportunities.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${title} — ${siteConfig.name}`,
    description,
    url: absoluteUrl("/contact"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${siteConfig.name}`,
    description,
  },
};

export default function ContactPage() {
  const github = githubHref();

  return (
    <main id="main-content" className="min-h-dvh bg-[#020617] text-white">
      <section className="relative overflow-hidden border-b border-[#3B8CFF]/10">
        <MountainBackdrop intensity="hero" />
        <div
          className="pointer-events-none absolute inset-0 blueprint-grid opacity-20"
          aria-hidden
        />

        <div className={`relative z-10 ${siteContainerClass} pb-20 pt-24 md:pb-28 md:pt-32`}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-x-16">
            <div className="relative min-w-0 border border-[#3B8CFF]/25 bg-[#020617]/45 px-5 py-8 backdrop-blur-sm sm:px-7 sm:py-10">
              <FrameCorners />
              <FieldLabel>Summit — Contact</FieldLabel>
              <h1 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
                Let&apos;s build
                <span className="mt-1 block text-[#3B8CFF]">something.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/75 md:text-lg">
                I&apos;m currently open to remote full-time W-2 opportunities in
                full-stack engineering, product engineering, and AI-powered
                application development.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ResumeCta variant="footer" />
                {github ? (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 border border-white/25 px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-[border-color,background-color] hover:border-[#3B8CFF]/50 hover:bg-[#3B8CFF]/10"
                  >
                    GitHub
                  </a>
                ) : null}
                <a
                  href={emailHref()}
                  className="inline-flex min-h-[44px] items-center gap-2 border border-white/25 px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-[border-color,background-color] hover:border-[#3B8CFF]/50 hover:bg-[#3B8CFF]/10"
                >
                  Email
                </a>
              </div>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/50">
                Select freelance and consulting projects also considered.
              </p>
              <AestheticNote className="mt-6">
                STATUS / OPEN · REMOTE · W-2
              </AestheticNote>
            </div>

            <div className="relative min-w-0 border border-[#3B8CFF]/30 bg-[#020617]/70 p-5 backdrop-blur-md sm:p-6">
              <FrameCorners />
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-white/70">
                Get in touch
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
