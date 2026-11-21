/**
 * Prefix a /public asset path with the site's base path (e.g. "/portfolio" on GitHub Pages).
 * next/link adds the base path automatically, but next/image `src` and plain <a href> to files do not.
 */
export function withBase(path: string): string {
  if (!path.startsWith("/")) return path; // external URLs, mailto:, etc.
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
