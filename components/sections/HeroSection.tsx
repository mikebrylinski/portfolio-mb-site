import Image from "next/image";
import Link from "next/link";
import { SectionShell } from "@/components/SectionShell";
import { expertiseChips } from "@/content/services";

export function HeroSection() {
  return (
    <SectionShell
      id="hero"
      variant={0}
      className="min-h-[80dvh] border-b border-white/[0.06] py-12 md:min-h-[85dvh] md:py-20 lg:py-24"
    >
      <div className="grid items-center justify-items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative w-full max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/10 sm:aspect-[3/4] lg:aspect-[4/5]">
            <Image
              src="/michael-brylinski-headshot.png"
              alt="Michael Brylinski, senior web and systems developer, professional portrait at a development workstation"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-top"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center lg:items-center">
          <p className="text-sm font-medium uppercase tracking-widest text-[#39ff88] md:text-base">
            Michael Brylinski
          </p>
          <h1
            className="mx-auto mt-3 max-w-2xl font-semibold tracking-tight text-[#fafafa]"
            style={{
              fontSize: "clamp(1.75rem, 4vw + 0.5rem, 3rem)",
              lineHeight: 1.1,
            }}
          >
            Senior Web & Systems Developer for Shopify, WordPress, React &
            AWS Cloud Solutions
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg lg:mx-0 mx-auto">
            I build high-performance digital systems for brands that need more
            than a website — they need scalable eCommerce platforms, cloud
            infrastructure, AI-enabled applications, and data-driven systems.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            Former touring audio engineer for Grammy-winning artists, now
            specializing in React and Node.js development, Shopify &
            WooCommerce systems, AWS cloud architecture, and AI-powered
            applications using AWS Bedrock LLMs.
          </p>
          <div className="mt-8">
            <p className="text-xs font-medium uppercase tracking-wider text-white/50">
              Core expertise
            </p>
            <ul className="mt-3 flex flex-wrap justify-center gap-2 lg:justify-start">
              {expertiseChips.map((chip) => (
                <li key={chip}>
                  <span className="inline-block rounded-full border border-[#39ff88]/35 bg-[#39ff88]/10 px-3 py-1.5 text-xs text-[#fafafa] md:text-sm">
                    {chip}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] min-w-[200px] items-center justify-center rounded-lg bg-[#39ff88] px-8 py-3 text-base font-semibold text-[#050505] transition-opacity hover:opacity-90"
            >
              Hire Me ($100/hour)
            </Link>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
