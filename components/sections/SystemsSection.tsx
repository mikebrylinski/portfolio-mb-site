import { SectionImage } from "@/components/SectionImage";
import { SectionShell } from "@/components/SectionShell";
import { sectionImages } from "@/content/section-images";

const failures = [
  "Not scalable",
  "Not connected to data",
  "Not built for performance",
  "Not integrated with modern AI or cloud systems",
];

export function SystemsSection() {
  return (
    <SectionShell id="systems" variant={1}>
      <h2 className="mx-auto max-w-4xl text-2xl font-semibold tracking-tight text-[#fafafa] md:text-3xl lg:text-4xl">
        Modern Businesses Don&apos;t Just Need Websites — They Need Systems
      </h2>
      <div className="mx-auto mt-8 max-w-5xl">
        <SectionImage {...sectionImages.systems} />
      </div>
      <p className="mx-auto mt-8 max-w-3xl text-lg text-white/75">
        Most digital platforms fail because they are:
      </p>
      <ul className="mx-auto mt-6 flex max-w-xl flex-col items-center gap-3 text-center">
        {failures.map((item) => (
          <li key={item} className="text-lg text-white/90">
            {item}
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-10 max-w-3xl text-lg leading-relaxed text-white/75">
        When your platform breaks, slows down, or can&apos;t scale — you
        don&apos;t need a template developer. You need a systems engineer who
        understands code, cloud, data, and AI infrastructure.
      </p>
    </SectionShell>
  );
}
