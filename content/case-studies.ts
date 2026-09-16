export type CaseStudyProcessStep = {
  title: string;
  body: string;
};

export type CaseStudyMetric = {
  label: string;
  value: string;
};

export type CaseStudyMockup = {
  src: string;
  alt: string;
  label: string;
  caption?: string;
};

export type CaseStudyStackGroup = {
  label: string;
  items: string;
};

export type CaseStudy = {
  slug: string;
  code: string;
  title: string;
  /** One-line positioning */
  statement: string;
  headline: string;
  systemType: string;
  role: string;
  status: string;
  tags: readonly string[];
  architecture: readonly string[];
  stack: readonly CaseStudyStackGroup[];
  seoDescription: string;
  meta: string;
  outcome: string;
  summary: string;
  keyResults: string[];
  visualSrc: string;
  visualAlt: string;
  visualType?: "image" | "video";
  visualPoster?: string;
  liveUrl?: string;
  mockups?: CaseStudyMockup[];
  process: CaseStudyProcessStep[];
  challenge: string;
  solution: string;
  metrics: CaseStudyMetric[];
  takeaway: string;
  nextSlug?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "practical-drumming",
    code: "001",
    title: "Practical Drumming",
    statement:
      "Turning a drummer's expertise into a complete digital mentorship platform.",
    headline: "Turning decades of touring experience into a digital product.",
    systemType: "SaaS / Membership / Video / AI",
    role: "Product Design · Full-Stack Development",
    status: "LIVE",
    tags: ["PRODUCT DESIGN", "FULL-STACK", "AI", "VIDEO", "SAAS"],
    architecture: [
      "Marketing site",
      "Membership",
      "Student dashboard",
      "Custom CMS",
      "Calendar bookings",
      "LiveKit community",
      "AI coaching",
      "Admin",
    ],
    stack: [
      { label: "Frontend", items: "Next.js · React · TypeScript" },
      { label: "Backend", items: "Supabase · Custom APIs · Database" },
      { label: "Bookings", items: "Custom calendar booking API" },
      { label: "CMS", items: "Custom content management" },
      { label: "Infrastructure", items: "Vercel" },
      { label: "Real-time", items: "Custom LiveKit video integration" },
      { label: "Email", items: "Resend" },
      { label: "AI", items: "LLM-powered functionality" },
    ],
    seoDescription:
      "Case study: Practical Drumming — a membership SaaS with live video, community, and AI coaching, designed and built by Mike Brylinski.",
    meta: "Full-Stack Development · SaaS Architecture · Video · AI · UX/UI · SEO · Marketing",
    outcome:
      "A premium mastermind SaaS with membership, a custom calendar-booking API, custom CMS, LiveKit community video, and AI coaching — built end to end as the product itself.",
    summary:
      "Practical Drumming is a private mastermind community created by professional touring and recording drummer Mike Malinin. The challenge wasn't simply to build another website for a music teacher — the goal was to turn decades of professional experience into a premium digital product combining mentorship, community, live video, educational content, AI, and marketing into one cohesive platform. I designed and built the experience from the ground up, including a custom calendar-booking API, a custom CMS, and a custom LiveKit video integration for the digital community.",
    keyResults: [
      "Complete membership and mastermind product experience",
      "Custom API for calendar bookings and fit-call scheduling",
      "Custom CMS for members, sessions, and educational content",
      "Custom LiveKit video integration for the digital community",
      "Full-stack Next.js application with Supabase backend",
      "AI-powered Sprint Coach for between-session support",
      "Conversion-focused membership funnel and SEO architecture",
      "Admin tools for members, content, sessions, and leads",
    ],
    visualSrc: "/case-studies/pd-imac-home.png",
    visualAlt: "Practical Drumming homepage on an iMac — dark premium mastermind branding",
    liveUrl: "https://pracdrum.com",
    mockups: [
      {
        src: "/case-studies/pd-imac-home.png",
        alt: "iMac showing the Practical Drumming homepage hero",
        label: "iMac · Home",
        caption: "Homepage — premium mastermind positioning and clear path into membership.",
      },
      {
        src: "/case-studies/pd-macbook-home.png",
        alt: "MacBook Pro showing the Practical Drumming homepage hero",
        label: "MacBook · Home",
        caption: "Same experience on laptop — dark club aesthetic and conversion path.",
      },
      {
        src: "/case-studies/pd-ipad-club.png",
        alt: "iPad Pro showing the Mastermind Club membership page",
        label: "iPad · Club",
        caption: "Mastermind Club — benefits, fit, and the weekly live-room model.",
      },
      {
        src: "/case-studies/pd-iphone-about.png",
        alt: "iPhone showing the About Mike Malinin page",
        label: "iPhone · About",
        caption: "About Mike — career proof that builds trust before the ask.",
      },
      {
        src: "/case-studies/pd-studio-apply.png",
        alt: "Studio Display showing the Book a Call application flow",
        label: "Studio Display · Apply",
        caption: "Fit-call application — custom calendar booking API from Welcome → Questions → Schedule → Confirmed.",
      },
    ],
    process: [
      {
        title: "From Marketing Site to SaaS",
        body: "I architected Practical Drumming as a complete digital ecosystem — premium membership, private member experiences, live video, community, session archives, dashboards, a custom CMS, AI coaching, email, lead capture, SEO, marketing pages, and admin tools — supporting acquisition and ongoing member delivery.",
      },
      {
        title: "Calendar bookings, custom API",
        body: "Fit calls and session scheduling run through a custom calendar-booking API rather than a bolted-on scheduling widget. Availability, booking flow, and confirmation stay inside the product so the application path feels native from questions through a confirmed slot.",
      },
      {
        title: "Custom CMS",
        body: "A custom CMS lets the team manage members, educational content, sessions, and community material without a generic blog tool. Content operations sit next to membership and admin — the same system that sells the product is the system that runs it.",
      },
      {
        title: "LiveKit community video",
        body: "Instead of website → external service → video call → separate community, I built a custom LiveKit integration so live mastermind sessions and the digital community stay inside the membership product — real-time video as infrastructure, not a third-party tab.",
      },
      {
        title: "AI Coaching",
        body: "The AI-powered Sprint Coach extends mentorship beyond weekly live sessions — Mike provides the experience; AI helps members keep moving between sessions with actionable practice and accountability.",
      },
      {
        title: "High-Ticket Membership UX",
        body: "Designed around Experience → Trust → Transformation → Application rather than Lesson → Purchase — marketing structured around Mike’s background, testimonials, philosophy, member experience, and an application-style CTA.",
      },
      {
        title: "SEO, Stack & Admin",
        body: "Built for organic acquisition with search-optimized pages, educational content, and conversion CTAs. Stack: Next.js, Supabase, a custom LiveKit integration, custom calendar APIs, custom CMS, Vercel, Resend, and LLM APIs — plus admin infrastructure to operate members, content, sessions, and leads as a real business platform.",
      },
    ],
    challenge:
      "Most online drum education is passive content. Mike wanted a high-touch mastermind where serious drummers get direct access to a professional — questions, feedback, live sessions, and the realities of working as a musician. The site had to function as much more than a marketing site. It needed to become the product itself.",
    solution:
      "A single digital environment spanning marketing through membership, a custom CMS, calendar bookings via a custom API, LiveKit-powered community video, AI coaching, SEO, and admin operations — turning offline access to an experienced professional into a scalable mentorship product.",
    metrics: [
      { label: "Live video", value: "Native" },
      { label: "AI coaching", value: "Sprint" },
      { label: "Model", value: "Membership" },
    ],
    takeaway:
      "The most interesting part wasn’t building another website — it was taking something that traditionally exists offline, access to an experienced professional, and designing a digital product around it. Mentorship, community, live interaction, feedback, education, AI coaching, and industry knowledge in one platform. That’s the kind of product I like building.",
    nextSlug: "glucorai",
  },
  {
    slug: "glucorai",
    code: "002",
    title: "GlucorAI",
    statement: "Turning fragmented diabetes data into actionable intelligence",
    headline: "An AI-powered health product built around real-world data.",
    systemType: "AI Product / SaaS / Health Data",
    role: "Product Design · Full-Stack Development",
    status: "LIVE",
    tags: ["AI", "PRODUCT", "SAAS", "DATA"],
    architecture: [
      "Custom user profile",
      "Diabetes Wall",
      "AI carb counter",
      "Vector context",
      "AI insights",
      "Nightscout integration",
    ],
    stack: [
      { label: "Frontend", items: "Next.js · React" },
      { label: "Backend", items: "Supabase · Custom user profiles" },
      { label: "Infrastructure", items: "Vercel" },
      { label: "Context", items: "Vector database for AI calls" },
      { label: "AI", items: "LLM APIs · Carb counter · Generated insights" },
    ],
    seoDescription:
      "Case study: GlucorAI — an AI-powered diabetes companion that turns glucose, meals, insulin, and activity into understandable insights.",
    meta: "AI-Powered SaaS · Product Design · Next.js · Supabase · Health Data · AI/LLM Integration",
    outcome:
      "An AI-backed diabetes companion with custom user profiles, a vector database for AI context, an AI food carb counter, and insights generated from the user’s own health data.",
    summary:
      "GlucorAI is an AI-backed SaaS platform designed to help people with Type 1 diabetes understand the relationships between glucose, insulin, food, activity, and daily events. The core idea was simple: people with diabetes generate an enormous amount of data, but that data is often scattered across multiple apps and devices. GlucorAI brings those signals together — through a custom user profile, a vector database for AI context, an AI food carb counter, and AI-generated insights from the person’s own data.",
    keyResults: [
      "End-to-end AI-powered SaaS product experience",
      "Custom user profiles that carry preferences and history into every AI call",
      "Vector database for retrieval context on AI requests",
      "AI food carb counter from meal photos and logging",
      "AI-generated insights based on the user’s own glucose, meals, insulin, and activity",
      "Unified Diabetes Wall timeline for fragmented health data",
      "Nightscout ecosystem integration and expandable health-data architecture",
      "Mobile-first UI on Next.js, Supabase, and Vercel",
    ],
    visualSrc: "/case-studies/glucorai-cinema-display.png",
    visualAlt: "GlucorAI homepage on an Apple Cinema Display — AI-powered diabetes intelligence hero",
    liveUrl: "https://glucorai.vercel.app/",
    process: [
      {
        title: "The Diabetes Wall",
        body: "GlucorAI’s central interface is a unified diabetes timeline. Instead of treating glucose, insulin, meals, exercise, and notes as separate records, the platform combines them into a chronological story — so an elevated reading can be evaluated alongside meals, carbs, IOB, boluses, activity, notes, and historical patterns.",
      },
      {
        title: "Custom profile + vector context",
        body: "Each person has a custom user profile so AI calls are grounded in who they are — settings, history, and relevant context — rather than a generic prompt. A vector database stores that context for retrieval, so meals, notes, and patterns can be pulled into later AI calls instead of starting from a blank slate.",
      },
      {
        title: "AI food carb counter",
        body: "Users photograph a meal and GlucorAI identifies foods, estimates portions, and returns carb counts — then places that context on the timeline. The carb counter is built to cut logging friction while creating structured signals the rest of the system can actually use.",
      },
      {
        title: "AI-generated insights",
        body: "Insights are generated from the user’s own data, not generic advice. The model looks across glucose, meals, insulin, and activity so the product can surface observations like a larger-than-usual lunch rise when insulin on board was relatively low — contextual intelligence, not another chart.",
      },
      {
        title: "Data Integration & Architecture",
        body: "Architecture supports CGM, Nightscout, insulin/pump data, meals, Apple Health/activity, notes, and historical glucose — with room for GlucorAI Connect and additional sources. Profiles, vector context, and AI interpretation stay separated from the data layer for scalable iteration on Next.js, Supabase, Vercel, and LLM APIs.",
      },
      {
        title: "Design, Privacy & Safety",
        body: "The UI follows Timeline → Context → Pattern → Insight — more consumer product than medical dashboard. Privacy and responsible positioning are core: GlucorAI is an informational tool, not a medical device, and insights do not diagnose, treat, or replace professional advice.",
      },
    ],
    challenge:
      "Managing Type 1 diabetes often means jumping between CGM readings, insulin and pump data, meals and carbs, exercise, sleep, health data, and personal notes. The challenge wasn’t collecting more data — it was making existing data understandable in one place with enough context for AI to find relationships a single reading can’t show.",
    solution:
      "A custom user profile and vector database feed AI calls with personal context. An AI carb counter logs food, and generated insights read across the Diabetes Wall — connecting glucose to meals, insulin, activity, and history so the product answers “what can my data teach me?” instead of only “what is my glucose right now?”",
    metrics: [
      { label: "Profiles", value: "Custom" },
      { label: "Carb counter", value: "AI" },
      { label: "Insights", value: "User data" },
    ],
    takeaway:
      "Most diabetes software answers “What is my glucose right now?” GlucorAI is built around a different question: “What can my data teach me?” That shift — from tracking data to understanding data — is the foundation of the product. GlucorAI turns thousands of disconnected health signals into a story people can actually understand.",
    nextSlug: "andy-ebert",
  },
  {
    slug: "andy-ebert",
    code: "003",
    title: "Andy Ebert",
    statement: "International Live Production & Monitor Engineering",
    headline: "A cinematic digital experience for an international audio professional.",
    systemType: "Digital Experience",
    role: "Product Design · Full-Stack Development",
    status: "LIVE",
    tags: ["UX", "DEVELOPMENT", "MOTION", "AUDIO"],
    architecture: ["Site", "Custom gallery", "English + German", "Motion"],
    stack: [],
    seoDescription:
      "Case study: Andy Ebert — a cinematic, bilingual portfolio for an international live-production engineer, redesigned and rebuilt by Mike Brylinski.",
    meta: "UX / UI · Web Development · Motion · Gallery · Localization · Responsive Design",
    outcome:
      "A cinematic, bilingual portfolio for an international live-production engineer — custom gallery, motion-driven interactions, and a redesign built around his photography and touring career.",
    summary:
      "Andy Ebert has spent decades working in live production, touring internationally with major artists and productions. His original website served as an archive of his career, but its visual design, navigation, and overall experience no longer reflected the level of his work. I designed and developed a completely new website that turns his experience, photography, and technical career into a modern digital portfolio.",
    keyResults: [
      "Complete redesign built around Andy’s career and visual identity",
      "Custom immersive gallery for touring and production photography",
      "Dedicated English and German experiences across structure and content",
      "Custom motion, transitions, and micro-interactions throughout",
      "Responsive development across desktop, tablet, and mobile",
      "Decades of professional experience organized into a clearer digital story",
    ],
    visualSrc: "/case-studies/andy-ebert-macbook-mockup.png",
    visualAlt: "Andy Ebert portfolio on a MacBook Pro — dark cinematic hero with neon lime accents",
    liveUrl: "https://ae-eight-omega.vercel.app/",
    mockups: [
      {
        src: "/case-studies/andy-ebert-macbook-mockup.png",
        alt: "MacBook Pro mockup of the Andy Ebert live production portfolio homepage",
        label: "Desktop",
        caption: "Cinematic homepage — storytelling, EN/DE, and a direct path into the work.",
      },
      {
        src: "/case-studies/andy-ebert-iphone-mockup.png",
        alt: "iPhone mockup of the Andy Ebert mobile portfolio experience",
        label: "Mobile",
        caption: "Same brand energy on phone — gallery-ready, bilingual, and built for one-thumb browsing.",
      },
    ],
    process: [
      {
        title: "From Legacy to Portfolio",
        body: "Andy’s previous site was information-heavy and dated. The content was valuable — career history, credits, photographs, and background — but the presentation needed a refresh built around visual storytelling, motion, and simplicity.",
      },
      {
        title: "Custom Gallery",
        body: "Photography is central to Andy’s story. Rather than treating images as simple thumbnails, I built an immersive gallery experience for exploring his touring and production photography.",
      },
      {
        title: "English + German",
        body: "Because Andy works internationally and has a strong connection to Germany, the site includes dedicated English and German experiences — consistent structure, navigation, content, and visual language across both.",
      },
      {
        title: "Motion & Interaction",
        body: "Page transitions, image reveals, hover states, and other micro-interactions make the site feel alive without distracting from Andy’s work. Animation stays intentionally subtle and professional.",
      },
      {
        title: "Built Around the Person",
        body: "Design and development covered UX, visual direction, responsive build, image optimization, content migration, and production deployment — shaped around who Andy is and what he actually does, not a generic portfolio template.",
      },
    ],
    challenge:
      "The original website primarily presented information — career history, credits, photographs, and background — through a traditional, dated interface with limited visual storytelling. Valuable content was trapped in an experience that no longer matched the caliber of Andy’s international work.",
    solution:
      "The new site is responsive, cinematic, multilingual, and animated. Instead of overwhelming visitors with information, it gives Andy’s career room to breathe while making photography, touring history, and technical work easier to explore — designed around his existing career and content rather than forced into a template.",
    metrics: [
      { label: "Complete redesign", value: "01" },
      { label: "Languages shipped", value: "EN + DE" },
      { label: "Scope delivered", value: "End-to-end" },
    ],
    takeaway:
      "The finished website transforms an existing collection of career information into a modern digital portfolio that better represents Andy’s experience and personality — giving clients, artists, and production companies a more immediate way to understand who he is and the world he’s spent decades working in.",
    nextSlug: "practical-drumming",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return caseStudies.map((c) => c.slug);
}
