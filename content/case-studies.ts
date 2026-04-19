export type CaseStudyProcessStep = {
  title: string;
  body: string;
};

export type CaseStudyMetric = {
  label: string;
  value: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  /** One-line positioning */
  statement: string;
  meta: string;
  outcome: string;
  summary: string;
  keyResults: string[];
  /** Full-width visual — image path, or MP4/WebM when `visualType` is `video` */
  visualSrc: string;
  visualAlt: string;
  /** Defaults to `image` */
  visualType?: "image" | "video";
  /** Poster / thumbnail for video (cards + hero before play) */
  visualPoster?: string;
  process: CaseStudyProcessStep[];
  challenge: string;
  solution: string;
  metrics: CaseStudyMetric[];
  takeaway: string;
  nextSlug?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "react-dashboard",
    title: "React dashboard",
    statement: "A calmer interface for noisy operational data.",
    meta: "Design • Dev • UX Strategy",
    outcome: "Cut time-to-insight for daily operators by clarifying hierarchy and density.",
    summary:
      "Operators were drowning in charts without a clear story. We rebuilt the experience around decisions first, charts second — performance, accessibility, and a system that scales with new data sources.",
    keyResults: [
      "Established a single source of truth for KPIs across teams",
      "Reduced visual noise while increasing scan speed for power users",
      "Shipped a component model that supports rapid feature iteration",
    ],
    visualSrc: "/case-studies/react-dashboard-visual.svg",
    visualAlt: "Abstract data visualization on a monitor",
    process: [
      {
        title: "Discovery",
        body: "We mapped workflows, failure points, and the questions operators actually ask — not the ones dashboards assume they ask.",
      },
      {
        title: "UX Strategy",
        body: "We prioritized a narrative hierarchy: alert → context → drill-down. Everything else moved behind intentional depth.",
      },
      {
        title: "Design System",
        body: "A tight set of tokens, table patterns, and chart primitives kept the UI consistent as datasets multiplied.",
      },
      {
        title: "Development",
        body: "React performance budgets, virtualization where needed, and instrumentation to validate real usage — not guesses.",
      },
      {
        title: "Optimization",
        body: "We tuned bundle weight, rendering paths, and caching so the product stayed fast as complexity grew.",
      },
    ],
    challenge:
      "The product looked complete but felt heavy. Teams trusted exports more than the product itself, which quietly eroded adoption.",
    solution:
      "We reframed the UI as a decision surface: fewer simultaneous signals, stronger typographic hierarchy, and progressive disclosure aligned to operational cadence.",
    metrics: [
      { label: "Interaction latency", value: "−38%" },
      { label: "Task completion", value: "+24%" },
      { label: "Support tickets (UI)", value: "−31%" },
    ],
    takeaway:
      "The win was not more data on screen — it was faster confidence. When the interface respects cognitive load, adoption follows.",
    nextSlug: "shopify-storefront",
  },
  {
    slug: "shopify-storefront",
    title: "Shopify storefront",
    statement: "Commerce that reads as premium — without sacrificing speed.",
    meta: "Design • Dev • UX Strategy",
    outcome: "Lifted conversion by tightening PDP narrative, performance, and trust signals.",
    summary:
      "A brand-forward storefront with a performance-first theme architecture, sharper product storytelling, and checkout friction removed at the edges.",
    keyResults: [
      "Rebuilt PDP around proof, story, and spec — in that order",
      "Improved Core Web Vitals with disciplined theme assets",
      "Aligned merchandising workflows so updates ship without dev bottlenecks",
    ],
    visualSrc: "/case-studies/shopify-storefront-visual.svg",
    visualAlt: "Retail checkout experience on a tablet",
    process: [
      {
        title: "Discovery",
        body: "We audited analytics, heatmaps, and qualitative feedback to find where intent died — not where clicks were high.",
      },
      {
        title: "UX Strategy",
        body: "We simplified paths to purchase and elevated trust moments: shipping, returns, and social proof at decision points.",
      },
      {
        title: "Design System",
        body: "A restrained Shopify theme system: reusable sections, consistent spacing rhythm, and editorial typography for premium positioning.",
      },
      {
        title: "Development",
        body: "Liquid + JS with strict performance guardrails, accessible interactions, and clean integrations with marketing tooling.",
      },
      {
        title: "Optimization",
        body: "We iterated with A/B tests on PDP modules and removed friction in cart and checkout microcopy.",
      },
    ],
    challenge:
      "Traffic was healthy but conversion lagged category benchmarks. The brand felt premium, yet the experience read as cautious and slow on mobile.",
    solution:
      "We rebuilt the PDP as a product narrative, tightened theme performance, and redesigned trust signals to match the brand’s tone — minimal, confident, fast.",
    metrics: [
      { label: "Mobile conversion", value: "+18%" },
      { label: "LCP (field)", value: "−26%" },
      { label: "Average order value", value: "+9%" },
    ],
    takeaway:
      "Premium is a feeling created by restraint and speed. When the storefront matches the product, customers stop hesitating.",
    nextSlug: "cp-commerce",
  },
  {
    slug: "cp-commerce",
    title: "cp-commerce.com",
    statement: "Premium regulated commerce with a storefront that earns trust in seconds.",
    meta: "Design • Dev • UX Strategy • Video",
    outcome: "Raised qualified sessions and repeat purchase with clearer PDP proof, age-gating UX, and a faster mobile path to cart.",
    summary:
      "cp-commerce.com needed a site that felt editorial and high-end while staying ruthlessly clear on compliance, shipping, and product truth. We rebuilt the experience around proof-first PDPs, disciplined performance, and merchandising workflows the team could run without a developer in the loop.",
    keyResults: [
      "Shipped a conversion-focused PDP system with modular storytelling blocks",
      "Tightened age-gating and trust UX without adding friction for verified shoppers",
      "Improved mobile LCP and interaction readiness for high-intent traffic",
    ],
    visualType: "video",
    visualSrc: "/case-studies/cp-commerce-preview.mp4",
    visualPoster: "/case-studies/cp-commerce-poster.svg",
    visualAlt: "Screen recording preview of the cp-commerce.com storefront experience",
    process: [
      {
        title: "Discovery",
        body: "We reviewed funnels, support themes, and compliance requirements alongside real session recordings — separating curiosity from purchase intent.",
      },
      {
        title: "UX Strategy",
        body: "We defined a narrative sequence for every PDP: proof, story, specs, then policy — so trust is built before the ask.",
      },
      {
        title: "Design System",
        body: "A compact set of reusable sections, typography rules, and media treatments kept the brand consistent as the catalog grew.",
      },
      {
        title: "Development",
        body: "We implemented the storefront stack with performance budgets, accessible interactions, and clean integrations for promos and email capture.",
      },
      {
        title: "Optimization",
        body: "We tuned hero and PDP media delivery, reduced layout shift, and validated improvements against field metrics and checkout completion.",
      },
    ],
    challenge:
      "The previous experience looked premium in stills but felt fragile on mobile: slow hero media, unclear policy placement, and PDPs that did not answer the questions shoppers ask under hesitation.",
    solution:
      "We rebuilt the storefront as a product-led narrative — faster above-the-fold delivery, modular PDP proof blocks, and age-gating that reads calm and confident rather than punitive.",
    metrics: [
      { label: "Mobile LCP (field)", value: "−31%" },
      { label: "Add-to-cart rate", value: "+14%" },
      { label: "Return sessions (30d)", value: "+22%" },
    ],
    takeaway:
      "In regulated commerce, trust is the product. When policy, proof, and performance align, customers stop treating the site like a hurdle — and start treating it like the brand.",
    nextSlug: "react-dashboard",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return caseStudies.map((c) => c.slug);
}
