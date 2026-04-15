import { SectionImage } from "@/components/SectionImage";
import { SectionShell } from "@/components/SectionShell";
import { sectionImages } from "@/content/section-images";

const lines = [
  "From React and Node.js applications",
  "to Shopify and WordPress systems",
  "to AWS cloud architecture and Bedrock LLM integrations",
  "to data systems and AI-powered workflows",
];

export function ApproachSection() {
  return (
    <SectionShell id="approach" variant={4}>
      <h2 className="mx-auto max-w-4xl text-2xl font-semibold tracking-tight text-[#fafafa] md:text-3xl lg:text-4xl">
        Built Under Pressure. Engineered for Scale. Enhanced with AI.
      </h2>
      <div className="mx-auto mt-8 max-w-5xl">
        <SectionImage {...sectionImages.approach} />
      </div>
      <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/75">
        Touring with Grammy-level artists taught me execution under pressure —
        where systems must perform flawlessly in real time.
      </p>
      <p className="mx-auto mt-6 max-w-3xl text-lg font-medium text-white/90">
        That discipline now applies across modern digital infrastructure:
      </p>
      <ul className="mx-auto mt-4 flex max-w-xl flex-col items-center gap-2 text-center">
        {lines.map((line) => (
          <li key={line} className="text-lg text-white/80">
            {line}
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-10 max-w-3xl text-xl font-medium leading-relaxed text-[#fafafa]">
        I don&apos;t just build websites.
      </p>
      <p className="mx-auto mt-2 max-w-3xl text-xl leading-relaxed text-white/85">
        I build intelligent, scalable digital systems that combine software,
        cloud, and AI.
      </p>
    </SectionShell>
  );
}
