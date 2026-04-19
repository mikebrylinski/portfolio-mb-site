import { AboutChapterSection } from "@/components/sections/AboutChapterSection";
import { ContactChapterSection } from "@/components/sections/ContactChapterSection";
import { HeroHomeSection } from "@/components/sections/HeroHomeSection";
import { ProcessChapterSection } from "@/components/sections/ProcessChapterSection";
import { ServicesChapterSection } from "@/components/sections/ServicesChapterSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { WorkChapterSection } from "@/components/sections/WorkChapterSection";

export default function HomePage() {
  return (
    <main id="main-content" className="bg-[#000000] text-white">
      <HeroHomeSection />
      <WorkChapterSection />
      <ServicesChapterSection />
      <ProcessChapterSection />
      <AboutChapterSection />
      <ContactChapterSection />
      <SiteFooter />
    </main>
  );
}
