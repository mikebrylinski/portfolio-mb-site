export const siteConfig = {
  name: "Mike Brylinski",
  title: "Mike Brylinski — Digital Product Designer & Full-Stack Developer",
  description:
    "Mike Brylinski designs and builds SaaS products, AI applications, and high-performance digital experiences from concept through production.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mikebweb.com",
  locale: "en_US",
  ogImage: "/og-default.png",
  twitterHandle: "",
  keywords: [
    "Mike Brylinski",
    "digital product designer",
    "full stack developer",
    "SaaS product development",
    "AI product development",
    "membership platforms",
    "Next.js developer",
    "React developer",
    "hire full stack developer",
    "portfolio",
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
