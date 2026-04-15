import type { Metadata } from "next";
import { SectionShell } from "@/components/SectionShell";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  title: "Contact — Michael Brylinski",
  description:
    "Start a project or hire for full-stack, eCommerce, AWS, and AI development.",
};

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-[70dvh]">
      <SectionShell variant={2} className="py-16 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-[#fafafa] md:text-4xl">
            Let&apos;s build something
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Tell me about your goals, stack, and timeline. I&apos;ll follow up
            shortly.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </SectionShell>
      <SiteFooter />
    </main>
  );
}
