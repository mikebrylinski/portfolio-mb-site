export type ServiceItem = {
  title: string;
  hook: string;
  body: string;
  keywords: readonly string[];
};

export type ServiceColumn = {
  id: string;
  title: string;
  kicker: string;
  intro: string;
  services: readonly ServiceItem[];
};

export const serviceColumns: readonly ServiceColumn[] = [
  {
    id: "apps",
    title: "Applications & interfaces",
    kicker: "Product surfaces · content · motion",
    intro:
      "Interfaces and stacks where UX, performance, and long-term maintainability are the baseline — not stretch goals. From routing and data loading to the last motion frame, everything should read as one coherent product.",
    services: [
      {
        title: "React & Node.js Application Development",
        hook: "Full-stack products that feel inevitable, not improvised.",
        body:
          "Custom full-stack applications with React frontends and Node.js backends — typed APIs, sane state boundaries, and shipping discipline so features do not collapse under their own weight.",
        keywords: [
          "Next.js",
          "TypeScript",
          "REST / GraphQL",
          "SSR & streaming",
          "Design systems",
          "Performance budgets",
        ],
      },
      {
        title: "WordPress Custom Development",
        hook: "WordPress when you need muscle, not a template graveyard.",
        body:
          "Editor-friendly, SEO-shaped WordPress for agencies and brands: custom themes, structured content, and performance that survives real authors and real traffic.",
        keywords: [
          "Custom themes",
          "Gutenberg",
          "ACF / CPT",
          "Multisite",
          "SEO architecture",
          "Headless-ready",
        ],
      },
      {
        title: "Custom Web Animation & Video Integration",
        hook: "Motion with restraint — premium, never noisy.",
        body:
          "GSAP, Framer Motion, Lottie, and video layers used with taste: hierarchy first, spectacle second — including reduced-motion paths that still feel intentional.",
        keywords: [
          "GSAP",
          "Framer Motion",
          "Lottie",
          "Canvas",
          "Video UX",
          "Reduced motion",
        ],
      },
    ],
  },
  {
    id: "commerce",
    title: "Commerce & intelligence",
    kicker: "Revenue · catalogs · decisions",
    intro:
      "Storefronts and reporting that respect how people actually buy — fast PDPs, credible trust signals, and dashboards teams open on Monday. Built for operators who live in the admin as much as the storefront.",
    services: [
      {
        title: "Shopify & WooCommerce Development",
        hook: "Storefronts engineered to convert — speed as a feature.",
        body:
          "Themes, sections, and checkout-adjacent UX tuned for Core Web Vitals, merchandising velocity, and experiments that do not require a rebuild every quarter.",
        keywords: [
          "Shopify 2.0",
          "Liquid",
          "Checkout UX",
          "CWV",
          "Merch ops",
          "A/B loops",
        ],
      },
      {
        title: "Adult Use eCommerce Systems",
        hook: "Premium commerce with discretion, compliance, and taste.",
        body:
          "Niche commerce with age-gating, brand storytelling, and PDP craft that matches premium positioning — without sacrificing performance or operational clarity.",
        keywords: [
          "Age-gating",
          "Brand narrative",
          "PDP craft",
          "Trust UX",
          "Segmentation",
          "Retention",
        ],
      },
      {
        title: "Business Intelligence (BI) & Data Visualization",
        hook: "Dashboards people actually open on Monday morning.",
        body:
          "KPI design, chart grammar, and self-serve flows that turn messy exports into a weekly source of truth — not another forgotten tab.",
        keywords: [
          "ETL-lite",
          "Charts",
          "KPI design",
          "Self-serve",
          "Exports",
          "Storytelling",
        ],
      },
    ],
  },
  {
    id: "platform",
    title: "Cloud, data & AI",
    kicker: "Infrastructure · legacy · intelligence",
    intro:
      "AWS foundations, Bedrock-backed AI, and databases that stop fighting the app layer. The goal is always the same: uptime you trust, costs you understand, and patterns your next hire can extend without archaeology.",
    services: [
      {
        title: "AWS Cloud Architecture & Deployment",
        hook: "Infrastructure that sleeps well at 3 a.m.",
        body:
          "EC2, S3, CloudFront, Lambda, and the glue between them — environments that are observable, recoverable, and boring in the best way when traffic spikes.",
        keywords: [
          "EC2",
          "S3",
          "CloudFront",
          "Lambda",
          "IaC",
          "HA & failover",
        ],
      },
      {
        title: "AWS Bedrock & LLM Integration",
        hook: "AI that ships inside real workflows — not slide decks.",
        body:
          "Bedrock, RAG, guardrails, and human-in-the-loop flows embedded where they reduce work — not where they create new support queues.",
        keywords: [
          "Bedrock",
          "RAG",
          "Prompt ops",
          "Guardrails",
          "Embeddings",
          "Human-in-loop",
        ],
      },
      {
        title: "Database Integration & Legacy MySQL Systems",
        hook: "Make legacy data behave like it was born yesterday.",
        body:
          "Schema cleanup, indexing strategy, migrations, and thin API surfaces so legacy MySQL stops being a rumor the frontend has to guess about.",
        keywords: [
          "MySQL",
          "Indexing",
          "Migrations",
          "ORM layers",
          "Read replicas",
          "API surfaces",
        ],
      },
    ],
  },
] as const;

/** Flat list (column order) for legacy sections and chips */
export const services: readonly ServiceItem[] =
  serviceColumns.flatMap((c) => c.services);

export const expertiseChips = [
  "React Development",
  "Node.js Applications",
  "Shopify Development",
  "WooCommerce Development",
  "WordPress Custom Builds",
  "AWS Cloud Architecture",
  "AWS Bedrock LLM Integration",
  "MySQL Database Systems",
  "BI Dashboards",
  "Custom Web Animation & Video Integration",
] as const;

export const results = [
  "Built scalable React + Node.js applications for production environments",
  "Increased eCommerce revenue through Shopify & WooCommerce optimization",
  "Integrated AWS cloud infrastructure for high-availability systems",
  "Implemented AWS Bedrock LLM solutions for AI-enhanced workflows",
  "Improved performance and conversion rates through UX optimization",
  "Built BI dashboards from legacy MySQL systems for business intelligence",
  "Delivered premium animated and interactive web experiences",
] as const;

export const techStack = [
  "React.js frontend development",
  "Node.js backend systems & APIs",
  "Shopify & WooCommerce development",
  "WordPress custom development",
  "AWS cloud infrastructure (EC2, S3, CloudFront, Lambda)",
  "AWS Bedrock LLM integration (AI applications)",
  "MySQL database integration & legacy system modernization",
  "Business intelligence dashboards (BI tools & data visualization)",
  "Web animation (GSAP, Lottie, custom motion systems)",
] as const;
