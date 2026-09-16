import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { MountainBackdrop } from "@/components/sections/MountainBackdrop";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { absoluteUrl, siteContainerClass } from "@/lib/site";

const title = "Contact";
const description =
  "Start a high-performance project — full-stack, eCommerce, cloud, AI, and UX engineering with Mike Brylinski.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${title} — Mike Brylinski`,
    description,
    url: absoluteUrl("/contact"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — Mike Brylinski`,
    description,
  },
};

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-dvh bg-[#020617] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <MountainBackdrop intensity="hero" />

        <div className={`relative z-10 ${siteContainerClass} pb-16 pt-28 md:pb-20 md:pt-36`}>
          <SectionEyebrow>Contact</SectionEyebrow>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,7vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em]">
            <span className="block text-white">Let&apos;s build</span>
            <span className="block text-[#3B8CFF]">something real</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            A single thread — tell me what you&apos;re shipping and what success
            looks like.
          </p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
            Available for hire on{" "}
            <a
              href="https://www.upwork.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3B8CFF] underline decoration-[#3B8CFF]/40 underline-offset-4 transition-opacity hover:opacity-85"
            >
              Upwork
            </a>{" "}
            and{" "}
            <a
              href="https://www.flexjobs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3B8CFF] underline decoration-[#3B8CFF]/40 underline-offset-4 transition-opacity hover:opacity-85"
            >
              FlexJobs
            </a>
            .
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-white/10 bg-[#020617]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(59,140,255,0.1),transparent_50%)]"
          aria-hidden
        />
        <div className={`relative z-10 ${siteContainerClass} py-16 md:py-24`}>
          <div className="mx-auto max-w-xl rounded-xl border border-white/10 bg-[#020617]/80 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.75)] backdrop-blur-sm sm:p-8">
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.24em] text-white/70">
              Send a message
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
