export type ExperienceItem = {
  company: string;
  role: string;
  dates: string;
  focus: readonly string[];
  note?: string;
};

export const experience: readonly ExperienceItem[] = [
  {
    company: "Pixel Palisade",
    role: "Full-Stack Product Engineer",
    dates: "2020–Present",
    focus: [
      "Architect and ship full-stack SaaS products from concept through production.",
      "Build React/Next.js applications using TypeScript, Node.js, PostgreSQL/Supabase, and cloud infrastructure.",
      "Integrate AI/LLM capabilities into production applications.",
      "Design APIs, authentication, databases, admin systems, and third-party integrations.",
      "Own UX, technical architecture, deployment, SEO, and product strategy.",
    ],
  },
  {
    company: "ChristmasCentral",
    role: "Web Developer / Ecommerce",
    dates: "2018–2020",
    focus: [
      "Built and maintained BigCommerce and WordPress ecommerce systems.",
      "Developed internal portals and customer-facing experiences.",
      "Improved UX and conversion-focused web experiences.",
      "Worked across ecommerce integrations and content systems.",
    ],
  },
  {
    company: "Stark Tech",
    role: "Web / Data Developer",
    dates: "2016–2018",
    focus: [
      "Built enterprise web and data applications.",
      "Developed SQL-driven dashboards and data visualization.",
      "Worked within the Schneider Electric / EcoStruxure ecosystem.",
    ],
  },
  {
    company: "CP Commerce",
    role: "Frontend / Ecommerce Developer",
    dates: "2014–2016",
    focus: [
      "Built ecommerce experiences across Magento, WooCommerce, and Shopify.",
      "Developed responsive frontend interfaces.",
      "Worked on ecommerce UX and frontend architecture.",
    ],
  },
  {
    company: "Music / Digital Production",
    role: "Designer · Developer · Studio / Touring",
    dates: "",
    focus: ["Recording studios", "International touring", "Live production systems"],
    note: "The unusual path into software engineering: years in studios and on the road taught systems thinking under live pressure before the work moved fully into code.",
  },
];
