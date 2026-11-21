import type { MDXComponents } from "mdx/types";
import { Figure } from "@/components/Figure";
import { Gallery } from "@/components/Gallery";

// Styles for markdown inside project case studies (content/projects/*.mdx).
// Custom components listed here (Figure, Gallery) can be used in MDX without an import.
const components: MDXComponents = {
  Figure,
  Gallery,
  h2: (props) => <h2 className="text-h3 mt-12 mb-3 first:mt-0" {...props} />,
  h3: (props) => <h3 className="mt-8 mb-2 text-lg" {...props} />,
  p: (props) => <p className="body-copy mb-5 text-muted" {...props} />,
  ul: (props) => <ul className="body-copy mb-5 list-disc space-y-2 pl-5 text-muted marker:text-border-strong" {...props} />,
  ol: (props) => <ol className="body-copy mb-5 list-decimal space-y-2 pl-5 text-muted" {...props} />,
  a: (props) => (
    <a
      className="text-fg underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-accent"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-fg" {...props} />,
  code: (props) => (
    <code className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.875em]" {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
