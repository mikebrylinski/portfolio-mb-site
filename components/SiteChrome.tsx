"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SitePreloader } from "@/components/SitePreloader";
import { ScrollToTop } from "@/components/ScrollToTop";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <SitePreloader />
      <SiteHeader />
      <ScrollToTop />
      {children}
    </>
  );
}
