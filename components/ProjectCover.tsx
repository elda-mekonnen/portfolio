import Image from "next/image";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { withBase } from "@/lib/base-path";

type Props = {
  project: Project;
  className?: string;
  /** Preload the image (use for the main image of a page). */
  preload?: boolean;
  /** Load immediately instead of lazily (use for cards above the fold). */
  eager?: boolean;
  sizes?: string;
};

/** Screenshot in a hairline frame, or a quiet placeholder until one exists. */
export function ProjectCover({ project, className, preload, eager, sizes }: Props) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-card border border-border bg-surface",
        className,
      )}
    >
      {project.cover ? (
        <Image
          src={withBase(project.cover)}
          alt={project.coverAlt ?? `Screenshot of ${project.title}`}
          fill
          sizes={sizes ?? "(min-width: 768px) 50vw, 100vw"}
          className="object-cover object-top transition-transform duration-500 ease-out-soft group-hover:scale-[1.02] motion-reduce:transition-none"
          preload={preload}
          loading={preload || eager ? "eager" : undefined}
        />
      ) : (
        <div aria-hidden className="bg-grid absolute inset-0 flex items-center justify-center [mask-image:none]">
          <span className="rounded-full border border-border bg-bg px-4 py-1.5 text-sm font-medium tracking-tight text-muted">
            {project.title}
          </span>
        </div>
      )}
    </div>
  );
}
