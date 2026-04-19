import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { IntroProvider } from "@/components/providers/IntroProvider";
import { SiteHeader } from "@/components/SiteHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Michael Brylinski — Developer & UX Engineer",
  description:
    "High-performance web experiences for brands that expect more — systems, UX, and engineering with product-level restraint.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-dvh overflow-x-hidden bg-[#000000] antialiased text-white`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-black"
        >
          Skip to main content
        </a>
        <IntroProvider>
          <SiteHeader />
          {children}
        </IntroProvider>
      </body>
    </html>
  );
}
