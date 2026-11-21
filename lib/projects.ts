import type { MDXContent } from "mdx/types";

import { eraIds, type Era } from "@/lib/eras";

// Registry of project case studies. To add one: create content/projects/<slug>.mdx,
// then import it here and add it to `modules`. (Static imports keep every page fully
// prerendered: no filesystem reads at runtime.)
import * as qidaseReader from "@/content/projects/qidase-reader.mdx";
import * as eotcReadings from "@/content/projects/eotc-daily-readings.mdx";
import * as otyNyc from "@/content/projects/oty-nyc.mdx";
import * as prosca from "@/content/projects/prosca.mdx";

const modules: { frontmatter: Record<string, unknown>; default: MDXContent }[] = [
  qidaseReader,
  eotcReadings,
  otyNyc,
  prosca,
];

export type ProjectLinks = Partial<Record<"live" | "repo" | "devpost" | "video", string>>;

export type Project = {
  title: string;
  slug: string;
  pitch: string;
  year: number;
  era: Era;
  role: string;
  stack: string[];
  links: ProjectLinks;
  cover?: string;
  coverAlt?: string;
  featured: boolean;
  order: number;
};

function parse(fm: Record<string, unknown>): Project {
  const fail = (field: string): never => {
    throw new Error(`Project frontmatter "${String(fm.slug ?? fm.title)}": invalid or missing "${field}"`);
  };
  const str = (k: string) => (typeof fm[k] === "string" && fm[k] ? (fm[k] as string) : fail(k));

  if (typeof fm.year !== "number") fail("year");
  if (!eraIds.includes(fm.era as Era)) fail("era");
  if (!Array.isArray(fm.stack)) fail("stack");

  return {
    title: str("title"),
    slug: str("slug"),
    pitch: str("pitch"),
    year: fm.year as number,
    era: fm.era as Era,
    role: str("role"),
    stack: fm.stack as string[],
    links: (fm.links as ProjectLinks) ?? {},
    cover: typeof fm.cover === "string" ? fm.cover : undefined,
    coverAlt: typeof fm.coverAlt === "string" ? fm.coverAlt : undefined,
    featured: fm.featured === true,
    order: typeof fm.order === "number" ? fm.order : 99,
  };
}

const entries = modules
  .map((m) => ({ meta: parse(m.frontmatter), Content: m.default }))
  .sort((a, b) => a.meta.order - b.meta.order);

export function getProjects(): Project[] {
  return entries.map((e) => e.meta);
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getProject(slug: string) {
  return entries.find((e) => e.meta.slug === slug);
}
