import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { StoryTimeline, type TimelineStop } from "@/components/StoryTimeline";
import { eraIds, eras } from "@/lib/eras";
import { experience } from "@/lib/experience";
import { otherProjects } from "@/lib/other-projects";
import { getFeaturedProjects, getProjects } from "@/lib/projects";

/** Timeline stops, oldest first, built from the experience and project data. */
function getTimelineStops(): TimelineStop[] {
  const projects = getProjects();
  return [...eraIds].reverse().map((id) => ({
    id,
    ...eras[id],
    // Campus involvement stays on the About page; the timeline keeps to the main beats.
    experience: experience[id]
      .filter((e) => e.title !== "Campus involvement")
      .map((e) => ({ title: e.title, meta: `${e.org} · ${e.dates}`, link: e.link })),
    projects: [
      ...projects
        .filter((p) => p.era === id)
        .map((p) => ({ title: p.title, meta: `${p.year} · ${p.role}`, href: `/projects/${p.slug}` })),
      ...(otherProjects[id] ?? []).map((p) => ({ title: p.title, meta: String(p.year) })),
    ],
  }));
}

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      <Hero />

      <Section labelledBy="work-title" className="border-t border-border">
        <SectionHeader
          id="work-title"
          eyebrow="Selected work"
          title="Things I've built"
          action={
            <Link
              href="/projects"
              className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-fg"
            >
              All projects
              <ArrowRight
                aria-hidden
                strokeWidth={2}
                className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </Link>
          }
        />
        <ul className="grid gap-6 md:grid-cols-2">
          {featured.map((project, i) => (
            <li key={project.slug}>
              <Reveal index={i} className="h-full">
                <ProjectCard project={project} eager={i < 2} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="story-title" className="border-t border-border">
        <SectionHeader
          id="story-title"
          eyebrow="The story so far"
          title="High school, college, and after"
          description="Hover or tap a chapter to see what I was up to."
        />
        <Reveal>
          <StoryTimeline stops={getTimelineStops()} />
        </Reveal>
      </Section>
    </>
  );
}
