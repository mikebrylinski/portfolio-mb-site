import { SectionImage } from "@/components/SectionImage";
import { SectionShell } from "@/components/SectionShell";
import { sectionImages } from "@/content/section-images";

const includes = [
  "Full-stack development (React / Node.js)",
  "eCommerce builds (Shopify / WooCommerce)",
  "AWS cloud & AI integrations",
];

export function PricingSection() {
  return (
    <SectionShell id="pricing" variant={6}>
      <h2 className="mx-auto max-w-4xl text-2xl font-semibold tracking-tight text-[#fafafa] md:text-3xl lg:text-4xl">
        Pricing
      </h2>
      <p className="mx-auto mt-2 max-w-3xl text-white/60">
        Senior Developer Rate
      </p>
      <div className="mx-auto mt-8 max-w-5xl">
        <SectionImage {...sectionImages.pricing} />
      </div>
      <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center md:p-10">
        <p className="text-5xl font-bold tracking-tight text-[#39ff88] md:text-6xl">
          $100
          <span className="text-2xl font-semibold text-white/80">/hour</span>
        </p>
        <ul className="mt-8 space-y-3 text-white/80">
          {includes.map((line) => (
            <li key={line} className="flex justify-center gap-2 text-center">
              <span className="text-[#39ff88]" aria-hidden>
                ✓
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-white/70">Retainer options available</p>
        <p className="mt-2 text-sm text-white/50">
          Minimum engagement: 5 hours
        </p>
      </div>
    </SectionShell>
  );
}
