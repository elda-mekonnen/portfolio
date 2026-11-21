import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { ProjectCover } from "@/components/ProjectCover";
import { Tag } from "@/components/Tag";
import { eras } from "@/lib/eras";
import { getProject, getProjects, type ProjectLinks } from "@/lib/projects";

const linkLabels: Record<keyof ProjectLinks, string> = {
  live: "Visit site",
  repo: "View code",
  devpost: "Devpost",
  video: "Watch demo",
};

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

// Static export: only the slugs above are built; anything else is a 404.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug)?.meta;
  return project ? { title: project.title, description: project.pitch } : {};
}

// The shell (back link) renders instantly; the slug-dependent part streams inside
// <Suspense>. Known slugs are still fully prerendered via generateStaticParams.
export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <div className="py-12 md:py-20">
      <Container>
        <Link
          href="/projects"
          className="group inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft
            aria-hidden
            strokeWidth={2}
            className="size-4 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none"
          />
          All projects
        </Link>
        <Suspense fallback={<p className="mt-6 text-sm text-muted">Loading…</p>}>
          <ProjectDetail params={params} />
        </Suspense>
      </Container>
    </div>
  );
}

async function ProjectDetail({ params }: { params: PageProps<"/projects/[slug]">["params"] }) {
  const { slug } = await params;
  const entry = getProject(slug);
  if (!entry) notFound();

  const { meta: project, Content } = entry;
  const links = Object.entries(project.links) as [keyof ProjectLinks, string][];

  return (
    <article>
      <header className="mt-8 mb-10 max-w-3xl md:mb-12">
        <p className="eyebrow mb-4">
          {eras[project.era].label} · {project.year} · {project.role}
        </p>
        <h1 className="text-h1">{project.title}</h1>
        <p className="mt-4 text-xl leading-snug tracking-tight text-muted">{project.pitch}</p>
        {project.stack.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        )}
        {links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {links.map(([key, href], i) => (
              <ButtonLink key={key} href={href} variant={i === 0 ? "primary" : "secondary"}>
                {linkLabels[key]}
                <ArrowUpRight aria-hidden strokeWidth={2} className="size-4" />
              </ButtonLink>
            ))}
          </div>
        )}
      </header>

      <ProjectCover project={project} preload sizes="(min-width: 1152px) 1088px, 100vw" />

      <div className="mx-auto mt-12 max-w-2xl md:mt-16">
        <Content />
      </div>
    </article>
  );
}
