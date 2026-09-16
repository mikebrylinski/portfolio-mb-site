import Link from "next/link";
import { SiteFooter } from "@/components/sections/SiteFooter";
import {
  AestheticNote,
  FieldLabel,
  FrameCorners,
} from "@/components/ui/FieldNotes";
import type { SeoPage } from "@/content/seo-pages";
import { siteContainerClass } from "@/lib/site";

export function SeoLandingView({ page }: { page: SeoPage }) {
  return (
    <main id="main-content" className="relative overflow-hidden bg-[#020617] text-white">
      <div
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-35"
        aria-hidden
      />

      <div className={`relative z-[1] ${siteContainerClass} pb-20 pt-24 md:pb-28 md:pt-28`}>
        <div className="relative border border-[#3B8CFF]/25 px-5 py-8 sm:px-7 sm:py-10 md:px-8">
          <FrameCorners />
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <FieldLabel>{page.eyebrow}</FieldLabel>
            <AestheticNote>ENGAGEMENT BRIEF</AestheticNote>
          </div>
          <h1 className="max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
            {page.headline}
            <span className="mt-1 block text-[#3B8CFF]">{page.headlineAccent}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9cb6d4] md:text-lg">
            {page.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] items-center gap-2 border border-[#3B8CFF] bg-[#3B8CFF]/10 px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-[background-color] hover:bg-[#3B8CFF]/20"
            >
              {page.cta}
              <span aria-hidden className="text-[#3B8CFF]">
                →
              </span>
            </Link>
            <Link
              href="/work"
              className="inline-flex min-h-[48px] items-center gap-2 border border-white/20 px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-[border-color,background-color] hover:border-[#3B8CFF]/50 hover:bg-[#3B8CFF]/10"
            >
              View the work
              <span aria-hidden className="text-[#3B8CFF]">
                →
              </span>
            </Link>
          </div>
        </div>

        <section className="mt-8 border border-[#3B8CFF]/25 p-5 sm:p-7 md:p-8">
          <SheetBlock code="01" title="Who this is for">
            <p className="text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
              {page.audience}
            </p>
          </SheetBlock>
        </section>

        <section className="mt-6 border border-[#3B8CFF]/25 p-5 sm:p-7 md:p-8">
          <SheetBlock code="02" title="What you get">
            <ul className="mt-2 space-y-0">
              {page.outcomes.map((item, i) => (
                <li
                  key={item}
                  className="blueprint-dash flex gap-3 py-3 text-sm leading-relaxed text-[#9cb6d4] first:border-t-0 first:pt-0 md:text-[15px]"
                >
                  <span className="shrink-0 font-mono text-[10px] tracking-[0.14em] text-[#3B8CFF]/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SheetBlock>
        </section>

        <section className="mt-6 border border-[#3B8CFF]/25 p-5 sm:p-7 md:p-8">
          <SheetBlock code="03" title="How it works">
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {page.approach.map((step, i) => (
                <article
                  key={step.title}
                  className="relative border border-[#3B8CFF]/20 bg-[#06101c]/50 p-4"
                >
                  <FrameCorners size="sm" />
                  <p className="font-mono text-[10px] tracking-[0.18em] text-[#3B8CFF]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-base font-medium uppercase tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#9cb6d4]">
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
          </SheetBlock>
        </section>

        <section className="mt-6 border border-[#3B8CFF]/25 p-5 sm:p-7 md:p-8">
          <SheetBlock code="04" title="Relevant work">
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {page.proof.map((item) => (
                <article
                  key={item.label}
                  className="relative border border-[#3B8CFF]/20 p-4"
                >
                  <FrameCorners size="sm" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#9cb6d4]">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
            <Link
              href="/work"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#3B8CFF] transition-opacity hover:opacity-80"
            >
              Explore all selected builds →
            </Link>
          </SheetBlock>
        </section>

        <section className="relative mt-8 border border-[#3B8CFF]/30 bg-[#06101c]/60 px-5 py-8 sm:px-7 sm:py-10">
          <FrameCorners />
          <FieldLabel>Next step</FieldLabel>
          <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.25rem)] font-bold uppercase tracking-[-0.03em] text-white">
            Ready to talk?
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
            Share the idea, timeline, and constraints. Available for select
            freelance and product engagements.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex min-h-[48px] items-center gap-2 border border-[#3B8CFF] bg-[#3B8CFF]/10 px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-[background-color] hover:bg-[#3B8CFF]/20"
          >
            {page.cta}
            <span aria-hidden className="text-[#3B8CFF]">
              →
            </span>
          </Link>
        </section>

        <nav
          className="mt-10 border border-[#3B8CFF]/20 px-5 py-4"
          aria-label="Related pages"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/55">
            Related briefs
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {relatedLinks(page.slug).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#3B8CFF] transition-opacity hover:opacity-80"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <SiteFooter />
    </main>
  );
}

function SheetBlock({
  code,
  title,
  children,
}: {
  code: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-[#3B8CFF]">
          {code}
        </span>
        <span className="h-px max-w-[3rem] flex-1 bg-[#3B8CFF]/40" aria-hidden />
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#3B8CFF]/90">
          {title}
        </p>
      </div>
      <h2 className="mt-4 text-xl font-medium uppercase tracking-tight text-white md:text-2xl">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function relatedLinks(currentSlug: string) {
  const all = [
    { href: "/saas-product-development", label: "SaaS", slug: "saas-product-development" },
    { href: "/ai-product-development", label: "AI products", slug: "ai-product-development" },
    { href: "/membership-platforms", label: "Membership", slug: "membership-platforms" },
    { href: "/hire", label: "Hire", slug: "hire" },
  ];
  return all.filter((item) => item.slug !== currentSlug);
}
