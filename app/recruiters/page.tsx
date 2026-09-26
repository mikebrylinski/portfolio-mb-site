import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { FieldLabel, FrameCorners } from "@/components/ui/FieldNotes";
import { caseStudies } from "@/content/case-studies";
import { experience } from "@/content/experience";
import {
  absoluteUrl,
  siteConfig,
  siteContainerClass,
} from "@/lib/site";

const title = "Recruiters";
const description =
  "Michael Brylinski — Senior Full-Stack Developer. Remote · Full-Time · W-2. React, Next.js, TypeScript, Node.js, AWS, SQL, and AI.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/recruiters" },
    openGraph: {
    title: `${siteConfig.name} | Senior Full-Stack Developer`,
    description,
    url: absoluteUrl("/recruiters"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Senior Full-Stack Developer`,
    description,
  },
};

const coreStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "AWS",
  "SQL",
  "MongoDB",
  "Supabase",
  "Docker",
  "AI / LLM APIs",
] as const;

function Sheet({
  code,
  title: heading,
  children,
}: {
  code: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border border-[#3B8CFF]/25 p-5 sm:p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/70">
        {code}
      </p>
      <h2 className="mt-2 text-lg font-medium uppercase tracking-tight text-white">
        {heading}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function RecruitersPage() {
  return (
    <main id="main-content" className="relative min-h-dvh overflow-hidden bg-[#020617] text-white">
      <div
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-35"
        aria-hidden
      />

      <div className={`relative z-[1] ${siteContainerClass} pb-16 pt-20 md:pb-20 md:pt-24`}>
        <div className="relative border border-[#3B8CFF]/25 px-5 py-8 sm:px-7 sm:py-10">
          <FrameCorners />
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <FieldLabel>Recruiter snapshot</FieldLabel>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/70">
              Remote · Full-Time · W-2
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(260px,360px)] md:items-center">
            <div>
              <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-white">
                Michael Brylinski
              </h1>
              <p className="mt-4 text-base font-medium uppercase tracking-[0.16em] text-[#3B8CFF] md:text-lg">
                Senior Full-Stack Developer
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
                15+ years building web applications, ecommerce platforms, SaaS
                products, enterprise systems, and AI-powered applications.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[360px] border border-[#3B8CFF]/30 bg-[#06101c] p-2 md:mx-0">
              <FrameCorners size="sm" />
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/michael-brylinski-recruiter-headshot.png"
                  alt="Michael Brylinski, Senior Full-Stack Developer"
                  fill
                  priority
                  sizes="(max-width: 767px) 100vw, 360px"
                  className="object-cover object-center saturate-[0.88] contrast-[1.04]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/35 via-transparent to-[#3B8CFF]/5"
                  aria-hidden
                />
              </div>
              <div className="mt-2 flex items-center justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.16em] text-[#3B8CFF]/60">
                <span>Fig. MB-01</span>
                <span>Identity / Verified</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Sheet code="01" title="Core stack">
            <ul className="flex flex-wrap gap-1.5">
              {coreStack.map((item) => (
                <li key={item}>
                  <span className="inline-flex border border-[#3B8CFF]/25 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#c8dff7]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Sheet>

          <Sheet code="02" title="Recent projects">
            <ul className="space-y-3">
              {caseStudies.map((study) => (
                <li key={study.slug}>
                  <Link
                    href={`/work/${study.slug}`}
                    className="flex flex-wrap items-baseline justify-between gap-2 text-sm text-white transition-colors hover:text-[#3B8CFF]"
                  >
                    <span className="font-medium uppercase tracking-tight">
                      {study.title}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#3B8CFF]/80">
                      {study.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Sheet>

          <Sheet code="03" title="Experience">
            <ul className="space-y-3">
              {experience.map((item) => (
                <li key={item.company} className="text-sm">
                  <p className="font-medium uppercase tracking-tight text-white">
                    {item.company}
                  </p>
                  <p className="mt-0.5 text-[#9cb6d4]">
                    {item.role}
                    {item.dates ? ` · ${item.dates}` : null}
                  </p>
                </li>
              ))}
            </ul>
          </Sheet>

          <Sheet code="04" title="Links">
            <nav className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.16em]" aria-label="Recruiter links">
              <Link href="/" className="w-fit text-[#3B8CFF] transition-opacity hover:opacity-80">
                Portfolio
              </Link>
            </nav>
          </Sheet>
        </div>

        <div className="mt-6">
          <Sheet code="05" title="About">
            <div className="grid gap-5 md:grid-cols-[minmax(180px,0.4fr)_minmax(0,1fr)] md:gap-8">
              <p className="text-lg font-medium uppercase leading-tight tracking-tight text-white">
                From the studio
                <span className="mt-1 block text-[#3B8CFF]">to the stack.</span>
              </p>
              <div className="space-y-3 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
                <p>
                  Before writing production code, I worked in recording studios
                  and toured internationally with artists and production teams.
                  That taught me to troubleshoot complex systems, collaborate
                  across disciplines, and keep things running when failure
                  isn&apos;t an option.
                </p>
                <p>
                  Today I apply that same systems thinking across the full product
                  stack — UX, frontend architecture, APIs, databases, cloud
                  infrastructure, and AI.
                </p>
              </div>
            </div>
          </Sheet>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
