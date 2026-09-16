import { SectionImage } from "@/components/SectionImage";
import { SectionShell } from "@/components/SectionShell";
import { sectionImages } from "@/content/section-images";
import { services } from "@/content/services";

export function ServicesSection() {
  return (
    <SectionShell id="services" variant={2}>
      <h2 className="mx-auto max-w-4xl text-2xl font-semibold tracking-tight text-[#fafafa] md:text-3xl lg:text-4xl">
        Services
      </h2>
      <p className="mx-auto mt-2 max-w-3xl text-sm text-white/50 md:text-base">
        React & Node.js · Shopify & WooCommerce · AWS · AI · WordPress · Data
      </p>
      <div className="mx-auto mt-8 max-w-5xl">
        <SectionImage {...sectionImages.services} />
      </div>
      <div className="mx-auto mt-12 grid w-full max-w-6xl justify-items-center gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((s) => (
          <article
            key={s.title}
            className="group w-full max-w-md rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center transition-colors hover:border-[#3B8CFF]/40 md:max-w-none"
          >
            <h3 className="text-lg font-semibold text-[#fafafa] group-hover:text-[#3B8CFF]">
              {s.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
              {s.body}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
