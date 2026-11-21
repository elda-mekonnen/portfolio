import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  id?: string;
  /** Heading level; defaults to h2. */
  as?: "h1" | "h2";
  /** Optional element on the right (e.g. a "View all" link). */
  action?: React.ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  as: Heading = "h2",
  action,
  className,
}: Props) {
  return (
    <header
      className={cn("mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 md:mb-12", className)}
    >
      <div>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <Heading id={id} className={Heading === "h1" ? "text-h1" : "text-h2"}>
          {title}
        </Heading>
        {description && <p className="body-copy mt-3 text-muted">{description}</p>}
      </div>
      {action}
    </header>
  );
}
