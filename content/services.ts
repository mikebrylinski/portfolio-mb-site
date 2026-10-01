export type SkillGroup = {
  label: string;
  items: readonly string[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS"],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "REST APIs",
      "Serverless",
      "Authentication",
      "API Architecture",
    ],
  },
  {
    label: "Data",
    items: [
      "PostgreSQL",
      "Supabase",
      "MySQL",
      "MongoDB",
      "Firebase",
      "Firestore",
      "Data Modeling",
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
      "CI/CD",
      "Serverless",
    ],
  },
  {
    label: "AI",
    items: [
      "LLM APIs",
      "RAG",
      "AI Workflows",
      "Prompt Engineering",
      "AI Product Integration",
    ],
  },
  {
    label: "Product",
    items: [
      "UX/UI",
      "Product Architecture",
      "Design Systems",
      "Analytics",
      "SEO",
      "Technical Strategy",
    ],
  },
  {
    label: "Ecommerce",
    items: ["Shopify", "BigCommerce", "WooCommerce", "Magento"],
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
