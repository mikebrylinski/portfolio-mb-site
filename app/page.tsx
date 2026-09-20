import { AboutChapterSection } from "@/components/sections/AboutChapterSection";
import { ContactChapterSection } from "@/components/sections/ContactChapterSection";
import { ExperienceChapterSection } from "@/components/sections/ExperienceChapterSection";
import { HeroHomeSection } from "@/components/sections/HeroHomeSection";
import { ServicesChapterSection } from "@/components/sections/ServicesChapterSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { WorkChapterSection } from "@/components/sections/WorkChapterSection";

export default function HomePage() {
  return (
    <main id="main-content" className="bg-[#000000] text-white">
      <HeroHomeSection />
      <WorkChapterSection />
      <ExperienceChapterSection />
      <ServicesChapterSection />
      <AboutChapterSection />
      <ContactChapterSection />
      <SiteFooter />
    </main>
  );
}
