export const siteConfig = {
  name: "Michael Brylinski",
  jobTitle: "Senior Full-Stack / Product Engineer",
  title: "Michael Brylinski | Senior Full-Stack & Product Engineer",
  description:
    "Senior Full-Stack / Product Engineer with 15+ years of experience building SaaS, AI-powered applications, ecommerce platforms, enterprise systems, and digital products. React, Next.js, TypeScript, Node.js, AWS, PostgreSQL and AI.",
  brand: "MIKEBWEB.dev",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mikebweb.dev",
  locale: "en_US",
  twitterHandle: "",
  githubUrl: "",
  email: "",
  keywords: [
    "Michael Brylinski",
    "Senior Full-Stack / Product Engineer",
    "Product Engineer",
    "full stack engineer",
    "PostgreSQL",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "AWS",
    "SaaS",
    "AI",
    "remote full-time",
  ],
} as const;

/** Matches SiteHeader content width + horizontal padding */
export const siteContainerClass =
  "mx-auto w-full max-w-[1320px] px-7 sm:px-8 lg:px-10 xl:px-12";

export function absoluteUrl(path = "/") {
  const base = siteConfig.url;
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function emailHref() {
  return siteConfig.email ? `mailto:${siteConfig.email}` : "/contact";
}

export function githubHref() {
  return siteConfig.githubUrl || null;
}
