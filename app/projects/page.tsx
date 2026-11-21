import type { Metadata } from "next";
import { OtherProjects } from "@/components/OtherProjects";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { eraIds, eras } from "@/lib/eras";
import { otherProjects } from "@/lib/other-projects";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const all = getProjects();
  // Each era shows its case-study cards, then a compact list of smaller projects. Empty eras are skipped.
  const groups = eraIds
    .map((era) => ({ era, cards: all.filter((p) => p.era === era), others: otherProjects[era] ?? [] }))
    .filter((g) => g.cards.length > 0 || g.others.length > 0);

  return (
    <Section>
      <SectionHeader
        as="h1"
        eyebrow="Projects"
        title="Everything I've built"
        description="Grouped by chapter: after college, at Penn, and before."
      />

      <div className="space-y-20 md:space-y-24">
        {groups.map(({ era, cards, others }, g) => (
          <section key={era} id={era} aria-labelledby={`${era}-title`} className="scroll-mt-24">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border pb-4">
              <div>
                <h2 id={`${era}-title`} className="text-h2">
                  {eras[era].label}
                </h2>
                <p className="mt-1 text-[0.9375rem] text-muted">{eras[era].blurb}</p>
              </div>
              <p className="font-mono text-xs text-muted">{eras[era].years}</p>
            </div>
            {cards.length > 0 && (
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cards.map((project, i) => (
                  <li key={project.slug}>
                    <Reveal index={i} className="h-full">
                      <ProjectCard project={project} eager={g === 0 && i < 3} />
                    </Reveal>
                  </li>
                ))}
              </ul>
            )}
            {others.length > 0 && (
              <Reveal>
                <OtherProjects projects={others} className={cards.length > 0 ? "mt-10" : undefined} />
              </Reveal>
            )}
          </section>
        ))}
      </div>
    </Section>
  );
}
