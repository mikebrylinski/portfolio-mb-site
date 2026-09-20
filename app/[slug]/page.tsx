import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLandingView } from "@/components/seo/SeoLandingView";
import {
  getSeoPage,
  getSeoPageSlugs,
} from "@/content/seo-pages";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getSeoPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) return { title: "Not found" };

  const title = page.metaTitle;
  const description = page.description;
  const url = absoluteUrl(`/${page.slug}`);

  return {
    title,
    description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: `${title} — ${siteConfig.name}`,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${siteConfig.name}`,
      description,
    },
  };
}

export default async function SeoPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();

  return <SeoLandingView page={page} />;
}
