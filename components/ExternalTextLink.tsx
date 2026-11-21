import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { href: string; children: React.ReactNode; className?: string };

/** Inline text link to another site (opens in a new tab), with an outward arrow. */
export function ExternalTextLink({ href, children, className }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex min-h-11 items-center gap-1 text-sm font-medium text-fg underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-fg",
        className,
      )}
    >
      {children}
      <ArrowUpRight
        aria-hidden
        strokeWidth={2}
        className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
      />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
