import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { AboutClip, AboutPhoto, AboutPhotoPack } from "@/components/about/AboutMedia";
import { CreativeProcess } from "@/components/about/CreativeProcess";
import { AboutBuildSignal } from "@/components/sections/AboutBuildSignal";
import { AppleStaggerChild, AppleStaggerRoot } from "@/components/layout/AppleStagger";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { FieldLabel, FrameCorners } from "@/components/ui/FieldNotes";
import { absoluteUrl, siteConfig, siteContainerClass } from "@/lib/site";

const title = "About";
const description =
  "Michael Brylinski’s path from a recording-studio internship at 15, through touring, to full-stack software — the same creative process, in a different medium.";

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

function Emphasis({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-white">{children}</strong>;
}

function Chapter({
  title,
  id,
  children,
  split = false,
}: {
  title: string;
  id?: string;
  children: ReactNode;
  split?: boolean;
}) {
  return (
    <section
      id={id}
      className="relative mt-8 scroll-mt-24 border border-[#3B8CFF]/25 px-5 py-8 sm:px-7 sm:py-10 md:px-10 md:py-12"
    >
      <FrameCorners />
      <h2 className="text-xl font-medium uppercase tracking-tight text-white md:text-2xl">
        {title}
      </h2>
      <div
        className={`text-sm leading-relaxed text-[#9cb6d4] md:text-[15px] ${
          split ? "mt-8 space-y-14" : "mt-6 space-y-5"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

function Split({
  imageSide,
  media,
  children,
}: {
  imageSide: "left" | "right";
  media: ReactNode;
  children: ReactNode;
}) {
  const imageLeft = imageSide === "left";
  return (
    <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10 lg:gap-14">
      <div className={imageLeft ? undefined : "md:order-2"}>{media}</div>
      <div className={`space-y-5 ${imageLeft ? "" : "md:order-1"}`}>{children}</div>
    </div>
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
              Home
            </Link>
          </div>

          <h1 className="text-[clamp(1.7rem,3.6vw,2.75rem)] font-bold uppercase leading-[0.98] tracking-[-0.03em] text-white">
            I learned to build under pressure
            <br />
            <span className="text-[#3B8CFF]">before I learned to code.</span>
          </h1>
          <p className="mt-6 text-base font-medium text-white md:text-lg">
            Before there was a terminal, there was a stage.
          </p>

          <div className="mt-10 grid items-start gap-8 md:mt-12 md:grid-cols-2 md:gap-10 lg:gap-14">
            <AppleStaggerRoot className="space-y-5 text-sm leading-relaxed text-[#9cb6d4] md:text-[15px]">
              <AppleStaggerChild>
                <p>My career didn&apos;t start in technology.</p>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <p>
                  It started in a recording studio when I was{" "}
                  <Emphasis>15 years old</Emphasis>, where I got my first opportunity
                  as an intern.
                </p>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <p>
                  I worked my way through the trenches—recording bands, setting up
                  sessions, troubleshooting equipment, working with artists, and
                  learning what happens behind the scenes when an idea becomes
                  something real.
                </p>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <p>I learned by doing.</p>
              </AppleStaggerChild>
              <AppleStaggerChild>
                <p>And I&apos;ve been doing that ever since.</p>
              </AppleStaggerChild>
            </AppleStaggerRoot>
            <AppleStaggerRoot>
              <AppleStaggerChild>
                <AboutBuildSignal />
              </AppleStaggerChild>
            </AppleStaggerRoot>
          </div>
        </article>

        <Chapter id="studio" title="The Studio" split>
            <Split
              imageSide="left"
              media={
                <AboutPhotoPack
                  photos={[
                    {
                      src: "/about/inner-machine-overview.jpg",
                      alt: "Overhead view of the Inner Machine control room: a large-format mixing console in the foreground, an engineer’s chair, and a curved wall of outboard racks.",
                      width: 1024,
                      height: 682,
                      caption: "Inner Machine",
                    },
                    {
                      src: "/about/inner-machine-live-room.jpg",
                      alt: "Inner Machine control room at night: a large-format console, an engineer’s chair, and a view through the glass into the live room where a drum kit is set up.",
                      width: 1024,
                      height: 682,
                      caption: "Overnight sessions",
                    },
                    {
                      src: "/about/studio-console.jpg",
                      alt: "John Rzeznik and Robby Takac at the Inner Machine mixing console, with Mike Brylinski at the console in the back.",
                      width: 1024,
                      height: 870,
                      caption: "Rzeznik and Takac",
                    },
                    {
                      src: "/about/inner-machine-outboard.jpg",
                      alt: "A curved wall of outboard audio processors and microphone preamps in the Inner Machine control room.",
                      width: 1024,
                      height: 682,
                      caption: "Outboard",
                    },
                  ]}
                />
              }
            >
              <p>
                I started as an <Emphasis>assistant engineer</Emphasis>.
              </p>
              <p>That&apos;s where I learned how people made records.</p>
              <p>
                Mic placement. <Emphasis>Pro Tools</Emphasis>. Backup management.
                All of it.
              </p>
              <p>
                I worked with local bands overnight, from{" "}
                <Emphasis>12 a.m. to 7 a.m.</Emphasis>, while the rest of the
                studio was dark.
              </p>
              <p>Staying up all night to record music was the exciting part.</p>
              <p>
                Then I got involved with the <Emphasis>Goo Goo Dolls</Emphasis>.
              </p>
              <p>
                Over the years, those early lessons turned into bigger
                responsibilities.
              </p>
              <p>
                I eventually had the opportunity to{" "}
                <Emphasis>
                  manage the buildout and day-to-day operations of a private,
                  multi-million-dollar recording facility
                </Emphasis>{" "}
                associated with the band.
              </p>
              <p>I wasn&apos;t just working in the room.</p>
              <p>I helped bring the room to life.</p>
            </Split>
            <Split
              imageSide="right"
              media={
                <AboutPhoto
                  src="/about/mix-cover-2008.jpg"
                  alt="June 2008 cover of Mix magazine, featuring the Inner Machine studio live room and control room under the headline Class of 2008."
                  width={1105}
                  height={1136}
                  caption="Mix — June 2008"
                />
              }
            >
              <p>
                The project involved the technology, infrastructure, people,
                systems, and countless details required to make a complex creative
                environment work.
              </p>
              <p>
                That experience taught me something that has stayed with me
                throughout my career:
              </p>
              <blockquote className="border-l-2 border-[#3B8CFF] py-1 pl-5 text-base font-medium leading-snug text-white md:text-lg">
                The best systems disappear into the experience.
              </blockquote>
              <p>
                When everything works, nobody thinks about the infrastructure
                behind it.
              </p>
              <p>They just get to create.</p>
              <p>
                The facility and its work were eventually{" "}
                <Emphasis>
                  featured on the cover of <em>Mix</em> magazine.
                </Emphasis>
              </p>
              <p>June 2008. Inner Machine, in Buffalo.</p>
              <p>
                <a
                  href="https://wsdg.com/projects-items/goo-goo-dolls-gcr-audio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white underline decoration-[#3B8CFF]/70 underline-offset-4 transition-colors hover:text-[#3B8CFF]"
                >
                  More info on the studio
                </a>
              </p>
            </Split>
          </Chapter>

          <Chapter id="road" title="The Road" split>
            <Split
              imageSide="left"
              media={
                <AboutPhoto
                  src="/about/playback-racks.jpg"
                  alt="Road playback racks: a computer and stacked audio processors in flight cases."
                  width={1024}
                  height={768}
                  caption="Road — playback racks"
                />
              }
            >
              <p>That studio experience eventually took me on the road.</p>
              <p>
                I was asked by the <Emphasis>Goo Goo Dolls</Emphasis> to join
                their touring operation as a{" "}
                <Emphasis>playback and drum technician</Emphasis>.
              </p>
              <p>The studio had taught me how to build and manage complex systems.</p>
              <p>Touring taught me how to make those systems survive the real world.</p>
              <p>Night after night.</p>
              <p>City after city.</p>
              <p>In front of thousands of people.</p>
            </Split>
            <Split
              imageSide="right"
              media={
                <AboutClip
                  src="/about/on-the-road.mp4"
                  poster="/about/on-the-road-poster.jpg"
                  caption="On the road — side of stage"
                />
              }
            >
              <p>
                I worked with redundant playback systems and learned to design
                around failure rather than hope it wouldn&apos;t happen.
              </p>
              <p>
                When you&apos;re running technology in front of{" "}
                <Emphasis>50,000 people</Emphasis>, there&apos;s no refresh button.
              </p>
              <p>
                If something breaks, you don&apos;t get to open a ticket and come
                back tomorrow.
              </p>
              <p>You diagnose it.</p>
              <p>You solve it.</p>
              <p>You keep the show moving.</p>
              <p>That experience fundamentally changed how I think about technology.</p>
              <p>I learned redundancy.</p>
              <p>I learned troubleshooting.</p>
              <p>I learned preparation.</p>
              <p>
                And I learned how to stay calm when the system isn&apos;t behaving
                the way it should.
              </p>
            </Split>
          </Chapter>

          <Chapter title="A Different Kind of Comeback" split>
            <Split
              imageSide="left"
              media={
                <AboutPhoto
                  src="/about/junos-credential.jpg"
                  alt="Pink JUNOS credential for Mike Brylinski, marked Nickelback, with a C access letter."
                  width={768}
                  height={1024}
                  caption="JUNOS — credential"
                />
              }
            >
              <p>
                After years of touring and production, I eventually stepped away
                from the road and moved deeper into web development.
              </p>
              <p>Then music pulled me back in.</p>
              <p>
                I had the opportunity to work with{" "}
                <Emphasis>Alanis Morissette</Emphasis>, which led to what I think
                of as my own small comeback tour.
              </p>
              <p>It was a reminder of something I&apos;d never really lost:</p>
              <p>
                I love working where{" "}
                <Emphasis>technology, creativity, and people intersect.</Emphasis>
              </p>
              <p>
                Along the way, I also worked on productions including the{" "}
                <Emphasis>JUNO Awards</Emphasis>, worked as an{" "}
                <Emphasis>RF technician</Emphasis>, and recorded a live{" "}
                <Emphasis>Pro Tools</Emphasis> session with{" "}
                <Emphasis>Phil Lesh</Emphasis>.
              </p>
              <p>I don&apos;t think of these experiences as a list of credits.</p>
              <p>They&apos;re chapters in an education.</p>
              <p>
                Every production taught me something about reliability,
                communication, systems, troubleshooting, and working with creative
                people under pressure.
              </p>
            </Split>
          </Chapter>

          <Chapter title="The Creative Process">
            <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
              <div className="space-y-5">
                <p>The most valuable thing I brought with me from music wasn&apos;t a technical skill.</p>
                <p>
                  It was learning <Emphasis>how creative people create.</Emphasis>
                </p>
                <p>
                  I had the opportunity to work around musicians, producers,
                  engineers, and pioneers of music who had spent their lives turning
                  ideas into something people could experience.
                </p>
                <p>They didn&apos;t always know the answer when they started.</p>
                <p>They experimented.</p>
                <p>They listened.</p>
                <p>They challenged assumptions.</p>
                <p>They tried something.</p>
                <p>They discovered what didn&apos;t work.</p>
                <p>Then they changed it and tried again.</p>
                <p>Eventually, I realized that wasn&apos;t just a music process.</p>
                <p>
                  <Emphasis>It was a problem-solving process.</Emphasis>
                </p>
                <p>And it&apos;s the same process I use today.</p>
              </div>
              <CreativeProcess />
            </div>
          </Chapter>

          <Chapter id="stack" title="From the Stage to the Stack">
            <p>Eventually, I realized I could apply that same mindset to software.</p>
            <p>
              <Emphasis>File management and workflow</Emphasis> were already how I
              worked.
            </p>
            <p>
              In the studio, that meant keeping sessions, backups, and versions in
              order so the work could keep moving.
            </p>
            <p>Those habits carried straight into web development.</p>
            <p>
              I also watched other developers and learned from the way they built.
            </p>
            <p>
              Today I&apos;m a{" "}
              <Emphasis>
                full-stack web developer building modern applications, SaaS
                products, ecommerce experiences, backend systems, cloud
                infrastructure, data-driven applications, and AI-powered
                products.
              </Emphasis>
            </p>
            <p>My toolkit spans technologies like:</p>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#c8dff7] md:text-[13px]">
              React · Next.js · Node.js · JavaScript · TypeScript · AWS · Google
              Cloud · Databases · WordPress · Ecommerce · AI
            </p>
            <p>But technology is only part of the job.</p>
            <p>The real job is understanding the problem.</p>
            <p>Designing the system.</p>
            <p>Connecting the pieces.</p>
            <p>And creating something people actually want to use.</p>
          </Chapter>

          <Chapter title="Let's build something.">
            <p>
              Whether it&apos;s a SaaS product, an AI application, an ecommerce
              platform, or a completely new idea, I&apos;m most interested in the
              same thing I&apos;ve been interested in since I was 15:
            </p>
            <p>
              <Emphasis>
                Taking an idea and figuring out how to make it real.
              </Emphasis>
            </p>
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] w-fit items-center gap-2.5 rounded-md border border-[#3B8CFF] bg-[#3B8CFF]/10 px-5 py-2.5 text-sm font-medium uppercase tracking-[0.12em] text-white transition-[background-color] hover:bg-[#3B8CFF]/20"
            >
              Start a project
            </Link>
          </Chapter>
      </div>

      <SiteFooter />
    </main>
  );
}
