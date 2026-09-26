export const siteConfig = {
  name: "Michael Brylinski",
  jobTitle: "Senior Full-Stack Developer",
  title: "Michael Brylinski | Senior Full-Stack Developer",
  description:
    "Senior full-stack developer with 15+ years of experience building production web applications, SaaS platforms, ecommerce systems, enterprise applications, and AI-powered products. React, Next.js, Node.js, TypeScript, AWS and AI. Open to remote full-time opportunities.",
  brand: "MIKEBWEB.dev",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mikebweb.dev",
  locale: "en_US",
  twitterHandle: "",
  githubUrl: "",
  email: "",
  keywords: [
    "Michael Brylinski",
    "Senior Full-Stack Developer",
    "full stack engineer",
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
