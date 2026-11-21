import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectCover } from "@/components/ProjectCover";
import { Tag } from "@/components/Tag";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  headingLevel?: "h2" | "h3";
  /** Load the cover immediately (cards visible on first paint). */
  eager?: boolean;
  className?: string;
};

export function ProjectCard({ project, headingLevel: Heading = "h3", eager, className }: Props) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex h-full flex-col gap-4 rounded-[calc(var(--radius-card)+0.5rem)] border border-border bg-bg p-2 pb-5",
        "transition-[border-color,box-shadow,translate] duration-300 ease-out-soft motion-reduce:transition-none",
        "hover:-translate-y-0.5 hover:border-border-strong hover:shadow-card motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <ProjectCover project={project} eager={eager} />
      <div className="flex flex-1 flex-col gap-2 px-3">
        <div className="flex items-start justify-between gap-4">
          <Heading className="text-h3">{project.title}</Heading>
          <ArrowUpRight
            aria-hidden
            strokeWidth={1.75}
            className="mt-0.5 size-5 shrink-0 text-muted transition-[translate,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg motion-reduce:transition-none"
          />
        </div>
        <p className="text-[0.9375rem] leading-relaxed text-muted">{project.pitch}</p>
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
          <span className="mr-1 font-mono text-xs text-muted">{project.year}</span>
          {project.stack.slice(0, 3).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
          {project.stack.length > 3 && <Tag>+{project.stack.length - 3}</Tag>}
        </div>
      </div>
    </Link>
  );
}
