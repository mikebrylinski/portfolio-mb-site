import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020617] text-white antialiased">
      <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-40" aria-hidden />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
