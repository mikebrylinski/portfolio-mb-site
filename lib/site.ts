export const siteConfig = {
  name: "Mike Brylinski",
  title: "Mike Brylinski Full Stack Web Developer",
  description:
    "Full-stack web developer and UX engineer building high-performance products, AI-powered apps, SaaS platforms, and modern digital experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mikebweb.com",
  locale: "en_US",
  ogImage: "/og-default.png",
  twitterHandle: "",
  keywords: [
    "Mike Brylinski",
    "full stack web developer",
    "UX engineer",
    "Next.js developer",
    "React developer",
    "SaaS development",
    "AI product development",
    "web design",
    "portfolio",
  ],
} as const;

/** Matches SiteHeader content width + horizontal padding */
export const siteContainerClass =
  "mx-auto w-full max-w-[1100px] px-7 sm:px-8 lg:px-10";

export function absoluteUrl(path = "/") {
  const base = siteConfig.url;
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
