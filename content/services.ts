export type ServiceItem = {
  title: string;
  body: string;
};

export const capabilities: readonly ServiceItem[] = [
  {
    title: "Digital Products",
    body: "SaaS platforms, web applications, dashboards and membership systems.",
  },
  {
    title: "AI Products",
    body: "AI-powered applications, intelligent workflows and LLM integrations.",
  },
  {
    title: "Web + Commerce",
    body: "High-performance websites, ecommerce and content platforms.",
  },
  {
    title: "Product Design + Development",
    body: "Taking ideas from concept through UX, engineering, deployment and iteration.",
  },
];

export type SkillGroup = {
  label: string;
  items: readonly string[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript"],
  },
  {
    label: "Backend",
    items: ["Node.js", "APIs", "Authentication"],
  },
  {
    label: "Data",
    items: ["Supabase", "Firebase", "MongoDB", "MySQL"],
  },
  {
    label: "Cloud",
    items: ["AWS", "Vercel"],
  },
  {
    label: "AI",
    items: ["OpenAI", "Google Gemini", "AWS Bedrock", "LLM integrations"],
  },
  {
    label: "Commerce + CMS",
    items: ["Shopify", "WooCommerce", "WordPress"],
  },
  {
    label: "Other",
    items: [
      "UX / UI",
      "SEO",
      "Motion",
      "Video",
      "LiveKit",
      "Resend",
      "Payments",
      "Analytics",
    ],
  },
];

export const capabilitySpec = skillGroups
  .flatMap((group) => group.items)
  .join(" · ");

/** Legacy unused sections — keep compiling. */
export const serviceColumns = [] as const;
export const techStack: string[] = [];
export const expertiseChips: string[] = [];
export const results: string[] = [];
export const services: { title: string; body: string }[] = [];
