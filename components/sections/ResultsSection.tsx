import { SectionImage } from "@/components/SectionImage";
import { SectionShell } from "@/components/SectionShell";
import { sectionImages } from "@/content/section-images";
import { results } from "@/content/services";

export function ResultsSection() {
  return (
    <SectionShell id="results" variant={3}>
      <p className="mx-auto max-w-3xl text-sm font-medium uppercase tracking-widest text-[#39ff88]">
        Result
      </p>
      <h2 className="mx-auto mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-[#fafafa] md:text-3xl lg:text-4xl">
        Proven Impact Across Web, Cloud, and AI Systems
      </h2>
      <div className="mx-auto mt-8 max-w-5xl">
        <SectionImage {...sectionImages.results} />
      </div>
      <ul className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
        {results.map((line) => (
          <li
            key={line}
            className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-center text-white/85"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#39ff88]" aria-hidden />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
