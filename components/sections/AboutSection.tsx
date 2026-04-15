import { SectionImage } from "@/components/SectionImage";
import { SectionShell } from "@/components/SectionShell";
import { sectionImages } from "@/content/section-images";

export function AboutSection() {
  return (
    <SectionShell id="about" variant={7}>
      <h2 className="mx-auto max-w-4xl text-2xl font-semibold tracking-tight text-[#fafafa] md:text-3xl lg:text-4xl">
        Senior Web, Cloud & AI Systems Developer
      </h2>
      <div className="mx-auto mt-8 max-w-5xl">
        <SectionImage {...sectionImages.about} />
      </div>
      <div className="mx-auto mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-white/75">
        <p>
          I specialize in building high-performance, SEO-optimized, AI-enabled
          digital systems for businesses that require speed, scalability, and
          reliability.
        </p>
        <p>
          My background spans eCommerce development, cloud architecture,
          full-stack engineering, database systems, and AI integration using AWS
          Bedrock, allowing me to build complete end-to-end digital ecosystems.
        </p>
      </div>
    </SectionShell>
  );
}
