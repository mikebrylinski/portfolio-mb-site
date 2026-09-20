export type SkillGroup = {
  label: string;
  items: readonly string[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    label: "Full Stack",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "REST APIs",
      "Frontend Architecture",
      "Backend Development",
    ],
  },
  {
    label: "Data",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Supabase",
      "Firebase",
      "Firestore",
      "Data Modeling",
      "BI Dashboards",
    ],
  },
  {
    label: "Cloud & Infrastructure",
    items: [
      "AWS",
      "AWS Bedrock",
      "GCP",
      "Vercel",
      "Docker",
      "Firebase",
      "Serverless",
      "CI/CD",
    ],
  },
  {
    label: "AI",
    items: [
      "LLM APIs",
      "AWS Bedrock",
      "AI Product Integration",
      "Prompt Engineering",
      "AI Workflows",
      "RAG / Contextual AI",
      "AI-powered SaaS",
    ],
  },
  {
    label: "Ecommerce",
    items: ["Shopify", "WooCommerce", "BigCommerce", "Magento"],
  },
  {
    label: "Product",
    items: [
      "UX/UI",
      "Design Systems",
      "Analytics",
      "SEO",
      "Product Architecture",
      "Technical Strategy",
    ],
  },
];

export const capabilitySpec = skillGroups
  .flatMap((group) => group.items)
  .join(" · ");

/** Legacy unused sections — keep compiling. */
export type ServiceItem = {
  title: string;
  body: string;
};

export const capabilities: readonly ServiceItem[] = [];
export const serviceColumns = [] as const;
export const techStack: string[] = [];
export const expertiseChips: string[] = [];
export const results: string[] = [];
export const services: { title: string; body: string }[] = [];
