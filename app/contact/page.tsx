import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Contact — Michael Brylinski",
  description:
    "Start a high-performance project — full-stack, eCommerce, cloud, and UX engineering.",
};

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-[70dvh] bg-[#000000] text-white">
      <SiteLayout as="div">
        <header className="border-b border-white/[0.06] pb-14 pt-24 md:pb-16 md:pt-32">
          <h1 className="max-w-3xl text-[clamp(2rem,4.6vw,3rem)] font-medium tracking-tight">
            Let&apos;s build something high-performance
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#A1A1A1] md:text-lg">
            A single thread — tell me what you&apos;re shipping and what success looks like.
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#A1A1A1] md:text-base">
            Available for hire on{" "}
            <a
              href="https://www.upwork.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#39ff88] underline decoration-[#39ff88]/45 underline-offset-4 transition-opacity hover:opacity-85"
            >
              Upwork
            </a>{" "}
            and{" "}
            <a
              href="https://www.flexjobs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#39ff88] underline decoration-[#39ff88]/45 underline-offset-4 transition-opacity hover:opacity-85"
            >
              FlexJobs
            </a>
            .
          </p>
        </header>

        <div className="py-16 md:py-24">
          <ContactForm />
        </div>
      </SiteLayout>
      <SiteFooter />
    </main>
  );
}
