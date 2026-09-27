import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { AboutBuildSignal } from "@/components/sections/AboutBuildSignal";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { FieldLabel, FrameCorners } from "@/components/ui/FieldNotes";
import { absoluteUrl, siteConfig, siteContainerClass } from "@/lib/site";

const title = "About";
const description =
  "Michael Brylinski’s path from recording studios and arena tours to full-stack software — the same creative process, in a different medium.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${title} — ${siteConfig.name}`,
    description,
    url: absoluteUrl("/about"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${siteConfig.name}`,
    description,
  },
};

const path = [
  {
    code: "01",
    label: "Studio",
    mark: "🎚️",
    body: "Recording, production, facility management, and major-label projects.",
  },
  {
    code: "02",
    label: "Road",
    mark: "🎧",
    body: "Arena tours, redundant playback systems, live production, and high-pressure troubleshooting.",
  },
  {
    code: "03",
    label: "Stack",
    mark: "💻",
    body: "Full-stack development, cloud infrastructure, SaaS, ecommerce, and AI.",
  },
] as const;

function Emphasis({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-white">{children}</strong>;
}

function Photo({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}) {
  return (
    <figure className="relative my-8 border border-[#3B8CFF]/30 bg-[#030910] p-2">
      <FrameCorners size="sm" />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 768px"
        className="h-auto w-full"
      />
      <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/60">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function AboutPage() {
  return (
    <main id="main-content" className="relative min-h-dvh overflow-hidden bg-[#020617] text-white">
      <div
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-35"
        aria-hidden
      />

      <div className={`relative z-[1] ${siteContainerClass} pb-16 pt-20 md:pb-20 md:pt-24`}>
        <article className="relative border border-[#3B8CFF]/25 px-5 py-8 sm:px-7 sm:py-10 md:px-10 md:py-12">
          <FrameCorners />

          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <FieldLabel>Ascent — About</FieldLabel>
            <Link
              href="/#about"
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#3B8CFF]/70 transition-opacity hover:opacity-100"
            >
              ← Home
            </Link>
          </div>

          <div>
          <h1 className="text-[clamp(1.7rem,3.6vw,2.75rem)] font-bold uppercase leading-[0.98] tracking-[-0.03em] text-white">
            I learned to build under pressure{" "}
            <span className="text-[#3B8CFF]">before I learned to code.</span>
          </h1>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[#3B8CFF]/80">
            Studio → Road → Stack
          </p>
          <AboutBuildSignal />

          <div className="mt-12 space-y-5 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
            <p>My career started in recording studios, not software.</p>
            <p>
              I began as a studio intern and quickly found myself immersed in
              professional music production — working alongside artists,
              producers, engineers, and some of the people who helped shape the
              sound and creative direction of modern music.
            </p>
            <p>
              I eventually managed the{" "}
              <Emphasis>
                buildout and day-to-day operations of a major recording facility
              </Emphasis>
              , overseeing the people, technology, infrastructure, equipment, and
              production environments that kept a complex creative operation
              running.
            </p>
            <Photo
              src="/about/studio-session.jpg"
              alt="Musicians and the engineering team in a recording studio control room, with a large console in the foreground and guitar amps along the back wall."
              width={1024}
              height={736}
              caption="Studio — control room"
            />
            <Photo
              src="/about/studio-console.jpg"
              alt="Engineers at a large-format mixing console in a recording studio control room."
              width={1024}
              height={870}
              caption="Studio — mix position"
            />
            <p>Then I went on the road.</p>
            <p>
              I worked on arena tours and large-scale productions as an audio
              technician and playback engineer. I ran{" "}
              <Emphasis>
                redundant playback systems in front of 50,000+ people
              </Emphasis>
              , where failure wasn&apos;t an option and there was no opportunity
              to simply refresh the page and try again.
            </p>
            <p>
              That environment taught me how to troubleshoot under pressure,
              design for redundancy, anticipate problems, and stay calm when the
              stakes are high.
            </p>
            <Photo
              src="/about/playback-racks.jpg"
              alt="Road playback racks: a computer and stacked audio processors in flight cases."
              width={1024}
              height={768}
              caption="Road — playback racks"
            />
            <figure className="relative my-8 border border-[#3B8CFF]/30 bg-[#030910] p-2">
              <FrameCorners size="sm" />
              <video
                className="aspect-video w-full bg-black"
                controls
                playsInline
                preload="metadata"
                poster="/about/on-the-road-poster.jpg"
                width={1280}
                height={720}
              >
                <source src="/about/on-the-road.mp4" type="video/mp4" />
              </video>
              <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/60">
                On the road — side of stage
              </figcaption>
            </figure>
            <p>But the most valuable thing I took from music wasn&apos;t technical.</p>
            <p>
              It was <Emphasis>the creative process</Emphasis>.
            </p>
            <p>
              I had the opportunity to learn directly from musicians, producers,
              engineers, and pioneers who had spent their careers pushing music
              forward. I saw how they took an idea, experimented with it,
              challenged assumptions, collaborated with others, iterated, and
              eventually turned something that didn&apos;t exist into something
              people connected with.
            </p>
            <p>
              <Emphasis>
                That process became the foundation of how I build.
              </Emphasis>
            </p>
            <p>When I moved into software, I didn&apos;t leave that mindset behind.</p>
            <p>I brought it with me.</p>
            <p>
              Today, I approach web development the same way I learned to
              approach music:{" "}
              <Emphasis>
                start with the problem, explore the possibilities, experiment
                quickly, listen to feedback, iterate, and keep pushing until the
                result works.
              </Emphasis>
            </p>
            <p>
              I&apos;ve since built ecommerce platforms, enterprise applications,
              SaaS products, data systems, cloud infrastructure, and AI-powered
              applications.
            </p>
            <p>
              I work across the full stack — from{" "}
              <Emphasis>
                React and Next.js interfaces to Node.js backends, databases,
                cloud infrastructure, and AI systems.
              </Emphasis>
            </p>
          </div>

          <section className="mt-12 border-t border-[#3B8CFF]/20 pt-10">
            <h2 className="text-xl font-medium uppercase tracking-tight text-white md:text-2xl">
              Studio → Road → Stack
            </h2>
            <div className="mt-6 grid gap-3">
              {path.map((step) => (
                <article
                  key={step.label}
                  className="relative border border-[#3B8CFF]/25 p-5"
                >
                  <FrameCorners size="sm" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#3B8CFF]/70">
                    {step.code}
                  </p>
                  <h3 className="mt-3 text-base font-medium uppercase tracking-[0.08em] text-white">
                    <span className="mr-2" aria-hidden>
                      {step.mark}
                    </span>
                    {step.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#9cb6d4]">
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-12 space-y-5 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
            <p>My path into software wasn&apos;t traditional.</p>
            <p>
              <Emphasis>
                It was creative first. Technical second. And eventually, both
                became the same thing.
              </Emphasis>
            </p>
            <p>I learned from people who pushed music forward.</p>
            <p>
              Now I apply that same mindset to technology — building products
              that are not only technically sound, but useful, intuitive, and
              built around the people who use them.
            </p>
          </div>

          <p className="mt-10 border border-[#3B8CFF]/25 px-5 py-6 text-lg font-medium uppercase tracking-tight text-white md:text-xl">
            <Emphasis>Different medium. Same creative process.</Emphasis>
          </p>
          </div>
        </article>
      </div>

      <SiteFooter />
    </main>
  );
}
