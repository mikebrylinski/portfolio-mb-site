import { AboutSection } from "@/components/sections/AboutSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { HeroSection } from "@/components/sections/HeroSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SystemsSection } from "@/components/sections/SystemsSection";
import { TechStackSection } from "@/components/sections/TechStackSection";

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <SystemsSection />
      <ServicesSection />
      <ResultsSection />
      <ApproachSection />
      <TechStackSection />
      <PricingSection />
      <AboutSection />
      <CtaBand />
      <SiteFooter />
    </main>
  );
}
