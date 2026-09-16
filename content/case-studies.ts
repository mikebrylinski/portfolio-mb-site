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
  /** Optional live project URL */
  liveUrl?: string;
  /** Optional device mockups (Mac / iPhone product shots) */
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
    slug: "andy-ebert",
    title: "Andy Ebert",
    statement: "International Live Production & Monitor Engineering",
    meta: "UX / UI · Web Development · Motion · Gallery · Localization · Responsive Design",
    outcome:
      "A modern portfolio for an international live-production engineer — cinematic, bilingual, and built around his photography.",
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
  {
    slug: "practical-drumming",
    title: "Practical Drumming",
    statement:
      "Turning a drummer's expertise into a complete digital mentorship platform.",
    meta: "Full-Stack Development · SaaS Architecture · Video · AI · UX/UI · SEO · Marketing",
    outcome:
      "A premium mastermind SaaS — membership, live video, community, AI coaching, and growth in one product.",
    summary:
      "Practical Drumming is a private mastermind community created by professional touring and recording drummer Mike Malinin. The challenge wasn't simply to build another website for a music teacher — the goal was to turn decades of professional experience into a premium digital product combining mentorship, community, live video, educational content, AI, and marketing into one cohesive platform. I designed and built the experience from the ground up.",
    keyResults: [
      "Complete membership and mastermind product experience",
      "Full-stack Next.js application with Supabase backend",
      "Integrated real-time live video via LiveKit",
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
        caption: "Fit-call application — Welcome → Questions → Schedule → Confirmed.",
      },
    ],
    process: [
      {
        title: "From Marketing Site to SaaS",
        body: "I architected Practical Drumming as a complete digital ecosystem — premium membership, private member experiences, live video, community, session archives, dashboards, CMS, AI coaching, email, lead capture, SEO, marketing pages, and admin tools — supporting acquisition and ongoing member delivery.",
      },
      {
        title: "Live Video, Built In",
        body: "Instead of website → external service → video call → separate community, the platform unifies membership, community, and live mastermind sessions through LiveKit so mentorship feels native to the product.",
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
        body: "Built for organic acquisition with search-optimized pages, educational content, and conversion CTAs. Stack: Next.js, Supabase, LiveKit, Vercel, Resend, and LLM APIs — plus admin infrastructure to operate members, content, sessions, and leads as a real business platform.",
      },
    ],
    challenge:
      "Most online drum education is passive content. Mike wanted a high-touch mastermind where serious drummers get direct access to a professional — questions, feedback, live sessions, and the realities of working as a musician. The site had to function as much more than a marketing site. It needed to become the product itself.",
    solution:
      "A single digital environment spanning marketing through membership, community, live video, AI coaching, SEO, and admin operations — turning offline access to an experienced professional into a scalable mentorship product.",
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
    title: "GlucorAI",
    statement: "Turning fragmented diabetes data into actionable intelligence",
    meta: "AI-Powered SaaS · Product Design · Next.js · Supabase · Health Data · AI/LLM Integration",
    outcome:
      "An AI-backed SaaS that turns glucose, insulin, meals, and activity into contextual diabetes insights.",
    summary:
      "GlucorAI is an AI-backed SaaS platform designed to help people with Type 1 diabetes understand the relationships between glucose, insulin, food, activity, and daily events. The core idea was simple: people with diabetes generate an enormous amount of data, but that data is often scattered across multiple apps and devices. GlucorAI brings those signals together and uses AI to help turn the data into understandable patterns and observations.",
    keyResults: [
      "End-to-end AI-powered SaaS product experience",
      "Unified Diabetes Wall timeline for fragmented health data",
      "AI-powered meal and photo analysis with carb estimates",
      "Contextual AI insights across glucose, meals, insulin, and activity",
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
        title: "AI-Powered Meal Analysis",
        body: "Users photograph a meal and GlucorAI identifies foods, estimates portions and carbs, then places that context on the timeline — reducing logging friction while creating useful signals for the rest of the system.",
      },
      {
        title: "Contextual AI Insights",
        body: "The AI layer looks across multiple data points instead of analyzing them independently. Rather than “your glucose increased,” GlucorAI surfaces observations like a larger-than-usual lunch rise when insulin on board was relatively low — contextual intelligence, not another chart.",
      },
      {
        title: "Data Integration & Architecture",
        body: "Architecture supports CGM, Nightscout, insulin/pump data, meals, Apple Health/activity, notes, and historical glucose — with room for GlucorAI Connect and additional sources. Data layer and AI interpretation stay separated for scalable iteration on Next.js, Supabase, Vercel, and LLM APIs.",
      },
      {
        title: "Design, Privacy & Safety",
        body: "The UI follows Timeline → Context → Pattern → Insight — more consumer product than medical dashboard. Privacy and responsible positioning are core: GlucorAI is an informational tool, not a medical device, and insights do not diagnose, treat, or replace professional advice.",
      },
    ],
    challenge:
      "Managing Type 1 diabetes often means jumping between CGM readings, insulin and pump data, meals and carbs, exercise, sleep, health data, and personal notes. The challenge wasn’t collecting more data — it was making existing data understandable in one place with enough context for AI to find relationships a single reading can’t show.",
    solution:
      "A single Diabetes Wall timeline plus meal Snap AI and contextual insights — connecting glucose to meals, insulin, activity, and history so the product answers “what can my data teach me?” instead of only “what is my glucose right now?”",
    metrics: [
      { label: "Timeline", value: "Unified" },
      { label: "Meal logging", value: "Snap AI" },
      { label: "Insights", value: "Contextual" },
    ],
    takeaway:
      "Most diabetes software answers “What is my glucose right now?” GlucorAI is built around a different question: “What can my data teach me?” That shift — from tracking data to understanding data — is the foundation of the product. GlucorAI turns thousands of disconnected health signals into a story people can actually understand.",
    nextSlug: "andy-ebert",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return caseStudies.map((c) => c.slug);
}
