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
    role: "Founder / Full-Stack Developer",
    dates: "2020–Present",
    focus: [
      "Full-stack applications",
      "SaaS platforms",
      "AI-powered products",
      "Ecommerce",
      "Cloud infrastructure",
      "UX/UI",
      "SEO",
      "Product development",
    ],
  },
  {
    company: "ChristmasCentral",
    role: "Web Developer / Ecommerce",
    dates: "2018–2020",
    focus: [
      "BigCommerce",
      "WordPress",
      "Ecommerce",
      "UX",
      "Portal development",
      "Conversion-focused web development",
    ],
  },
  {
    company: "Stark Tech",
    role: "Web / Data Developer",
    dates: "2016–2018",
    focus: [
      "SQL",
      "Dashboards",
      "Enterprise applications",
      "Data visualization",
      "Schneider Electric / EcoStruxure ecosystem",
    ],
  },
  {
    company: "CP Commerce",
    role: "Frontend / Ecommerce Developer",
    dates: "2014–2016",
    focus: [
      "Magento",
      "WooCommerce",
      "Shopify",
      "Frontend development",
      "Ecommerce UX",
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
