import { SectionImage } from "@/components/SectionImage";
import { SectionShell } from "@/components/SectionShell";
import { sectionImages } from "@/content/section-images";
import { techStack } from "@/content/services";

export function TechStackSection() {
  return (
    <SectionShell id="tech" variant={5}>
      <p className="mx-auto max-w-3xl text-sm font-medium uppercase tracking-widest text-[#39ff88]">
        Tech stack
      </p>
      <h2 className="mx-auto mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-[#fafafa] md:text-3xl lg:text-4xl">
        Full-Stack Web, Cloud & AI Engineering
      </h2>
      <div className="mx-auto mt-8 max-w-5xl">
        <SectionImage {...sectionImages.tech} />
      </div>
      <ul className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2">
        {techStack.map((item) => (
          <li
            key={item}
            className="flex flex-col items-center gap-1 rounded-lg border border-white/10 px-4 py-3 text-center text-white/85"
          >
            <span className="text-[#39ff88]" aria-hidden>
              ▸
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
