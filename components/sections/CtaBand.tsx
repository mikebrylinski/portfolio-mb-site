import Link from "next/link";
import { SectionImage } from "@/components/SectionImage";
import { SectionShell } from "@/components/SectionShell";
import { sectionImages } from "@/content/section-images";

export function CtaBand() {
  return (
    <SectionShell id="cta" variant={0} className="border-b border-white/[0.06]">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-10 max-w-5xl">
          <SectionImage {...sectionImages.cta} aspectClassName="aspect-[16/9] sm:aspect-[2/1]" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-[#fafafa] md:text-3xl lg:text-4xl">
          Need a React, Shopify, or AWS AI Developer?
        </h2>
        <p className="mt-6 text-lg text-white/75">
          If your system needs to scale, modernize, or integrate AI — I can
          design and build it end-to-end.
        </p>
        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] min-w-[200px] items-center justify-center rounded-lg bg-[#39ff88] px-10 py-3 text-base font-semibold text-[#050505] transition-opacity hover:opacity-90"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
