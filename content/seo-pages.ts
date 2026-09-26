export type SeoPage = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  audience: string;
  outcomes: readonly string[];
  approach: readonly { title: string; body: string }[];
  proof: readonly { label: string; detail: string }[];
};

export const seoPages: SeoPage[] = [
  {
    slug: "saas-product-development",
    title: "SaaS Product Development",
    metaTitle: "SaaS Product Design & Development",
    description:
      "Mike Brylinski designs and builds SaaS products from concept through production — architecture, UX, membership systems, and high-performance Next.js applications.",
    eyebrow: "For founders & product teams",
    headline: "SaaS products",
    headlineAccent: "built to ship.",
    intro:
      "I partner with founders and operators who need more than a marketing site. If you are launching or rebuilding a SaaS product, I design and engineer the full system — from first architecture decisions through production deployment.",
    audience:
      "Best fit for early-stage and growth-stage teams that want one experienced builder responsible for product design, full-stack development, and shipping quality.",
    outcomes: [
      "End-to-end SaaS product design and development",
      "Membership, dashboards, admin, and conversion flows",
      "Production architecture on Next.js, APIs, and modern backends",
      "Clear product narrative from first visit through activation",
    ],
    approach: [
      {
        title: "Product architecture",
        body: "Map the real system — users, flows, data, and operations — before writing UI for its own sake.",
      },
      {
        title: "Design + engineering",
        body: "UX, interface, and implementation stay in one thread so the product feels inevitable instead of assembled.",
      },
      {
        title: "Ship and iterate",
        body: "Launch with a production foundation you can measure, improve, and extend without rewriting the core.",
      },
    ],
    proof: [
      {
        label: "Practical Drumming",
        detail: "Membership SaaS with custom CMS, calendar booking API, LiveKit community video, and AI coaching.",
      },
      {
        label: "GlucorAI",
        detail: "AI-powered SaaS with custom profiles, vector context, and data-driven product insights.",
      },
    ],
  },
  {
    slug: "ai-product-development",
    title: "AI Product Development",
    metaTitle: "AI Product Design & Development",
    description:
      "Mike Brylinski designs and builds AI-powered products — LLM integrations, contextual intelligence, and full-stack applications that turn data into useful outcomes.",
    eyebrow: "For AI-first products",
    headline: "AI products",
    headlineAccent: "that feel useful.",
    intro:
      "I build AI applications where the model is part of a real product system — profiles, context, workflows, and interfaces — not a demo bolted onto a landing page.",
    audience:
      "Ideal for teams building AI companions, intelligent workflows, or data products that need thoughtful UX and production-ready engineering.",
    outcomes: [
      "AI product design from concept through production",
      "LLM integrations grounded in user context and real data",
      "Vector retrieval, profiles, and durable product architecture",
      "Interfaces that make AI output understandable and actionable",
    ],
    approach: [
      {
        title: "Context first",
        body: "Define what the model needs to know — user profile, history, and retrieval — before polishing prompts in isolation.",
      },
      {
        title: "Productized AI",
        body: "Design features people can trust: logging, insights, workflows, and clear boundaries around what the AI does and does not do.",
      },
      {
        title: "Ship with discipline",
        body: "Build on a modern stack with privacy, performance, and iteration paths designed in from the start.",
      },
    ],
    proof: [
      {
        label: "GlucorAI",
        detail: "Custom user profiles, vector database for AI context, AI food carb counter, and insights generated from personal health data.",
      },
      {
        label: "Practical Drumming",
        detail: "AI Sprint Coach woven into a membership product for between-session support.",
      },
    ],
  },
  {
    slug: "membership-platforms",
    title: "Membership Platforms",
    metaTitle: "Membership Platform Design & Development",
    description:
      "Mike Brylinski designs and builds membership platforms and digital communities — onboarding, content systems, live video, and the product operations behind high-touch programs.",
    eyebrow: "For creators & premium programs",
    headline: "Membership platforms",
    headlineAccent: "that operate like products.",
    intro:
      "Premium membership is not a paywall and a content dump. I design and build platforms that support acquisition, onboarding, live sessions, community, and day-to-day operations as one system.",
    audience:
      "A strong fit for creators, coaches, and operators launching high-ticket or high-touch membership experiences that need custom software — not a template community tool.",
    outcomes: [
      "Custom membership and community product experiences",
      "Calendar booking, CMS, dashboards, and admin tooling",
      "Native live video and community infrastructure when needed",
      "Conversion paths built around trust, fit, and transformation",
    ],
    approach: [
      {
        title: "Member journey",
        body: "Design the path from discovery to application, onboarding, and ongoing delivery as one coherent experience.",
      },
      {
        title: "Operating system",
        body: "Build the CMS, booking, admin, and content tools the team actually needs to run the business.",
      },
      {
        title: "Live + digital",
        body: "Integrate live sessions and community into the product instead of sending members into disconnected tools.",
      },
    ],
    proof: [
      {
        label: "Practical Drumming",
        detail: "Custom calendar booking API, custom CMS, LiveKit community video, membership funnel, and AI coaching in one platform.",
      },
    ],
  },
  {
    slug: "hire",
    title: "Work with Michael Brylinski",
    metaTitle: "Senior Full-Stack Developer — Remote Full-Time & Select Freelance",
    description:
      "Michael Brylinski is a senior full-stack developer open to remote full-time W-2 roles. Select freelance and consulting projects are also considered.",
    eyebrow: "Remote · Full-time · W-2",
    headline: "Senior engineer.",
    headlineAccent: "Ready to ship.",
    intro:
      "I'm currently looking for a remote full-time W-2 role as a senior full-stack developer. I build production web applications from frontend to backend, database, cloud infrastructure, and AI. Select freelance and consulting projects are also considered.",
    audience:
      "A strong fit for product and engineering teams that need someone who can take a system from architecture through implementation and production — and for operators who still need a senior builder for a focused engagement.",
    outcomes: [
      "Production web applications across frontend, backend, data, and cloud",
      "SaaS, AI-powered products, ecommerce, and enterprise systems",
      "End-to-end ownership from concept through deployment",
      "A 15+ year path from studios and touring into full-stack engineering",
    ],
    approach: [
      {
        title: "Understand",
        body: "Goals, users, constraints, and what “done” actually means before architecture or visuals run ahead of the brief.",
      },
      {
        title: "Build",
        body: "Design, architecture, development, and integration as one continuous process — not handoffs between strangers.",
      },
      {
        title: "Launch",
        body: "Deploy, measure, and improve with the same care used to build the first version.",
      },
    ],
    proof: [
      {
        label: "Selected projects",
        detail: "Practical Drumming, GlucorAI, and Andy Ebert — products designed, architected, and shipped end to end.",
      },
      {
        label: "Background",
        detail: "Studio and touring systems experience applied to digital products that have to work when it counts.",
      },
    ],
  },
];

export function getSeoPage(slug: string): SeoPage | undefined {
  return seoPages.find((page) => page.slug === slug);
}

export function getSeoPageSlugs(): string[] {
  return seoPages.map((page) => page.slug);
}
