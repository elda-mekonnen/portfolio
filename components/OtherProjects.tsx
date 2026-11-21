import type { OtherProject } from "@/lib/other-projects";
import { cn } from "@/lib/utils";

type Props = { projects: OtherProject[]; className?: string };

/** Compact text list of smaller projects (no images, no pages). */
export function OtherProjects({ projects, className }: Props) {
  return (
    <div className={className}>
      <h3 className="eyebrow mb-3">Also built</h3>
      <ul className="divide-y divide-border border-y border-border">
        {projects.map((p) => (
          <li
            key={p.title}
            className={cn("grid gap-1 py-4 sm:grid-cols-[12rem_1fr_auto] sm:items-baseline sm:gap-6")}
          >
            <p className="font-medium">{p.title}</p>
            <p className="text-[0.9375rem] leading-relaxed text-muted">{p.description}</p>
            <p className="font-mono text-xs text-muted">{p.year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
