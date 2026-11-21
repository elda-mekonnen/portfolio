import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

const variants = {
  // Inverted fg/bg: black-on-white in light mode, white-on-black in dark.
  primary: "bg-fg text-bg hover:opacity-85",
  secondary: "border border-border-strong bg-bg text-fg hover:bg-surface",
};

/** Pill button rendered as a link. External/mailto hrefs use a plain <a>. */
export function ButtonLink({ href, children, variant = "primary", className }: Props) {
  const classes = cn(
    "group inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-medium",
    "transition-[opacity,background-color] duration-200 motion-reduce:transition-none",
    variants[variant],
    className,
  );

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  const isWeb = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
