import { cn } from "@/lib/utils";

type Props = { children: React.ReactNode; className?: string };

export function Tag({ children, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-0.5",
        "font-mono text-xs text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
