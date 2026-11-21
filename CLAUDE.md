# Portfolio — CLAUDE.md

Personal portfolio site: an intro to me, my passions, and a resume-style showcase of my projects.

## Stack

- **Next.js** (App Router) + **TypeScript** (strict)
- **Tailwind CSS v4**: design tokens live in `app/globals.css` under `@theme`
- **shadcn/ui** for accessible primitives (restyled to match our design system)
- **Motion** (`motion/react`) for animation
- **MDX** for project case studies in `content/projects/*.mdx`
- Deploy target: **GitHub Pages** (static export, `output: "export"`) at
  https://elda-mekonnen.github.io/portfolio/, via `.github/workflows/deploy.yml` on push to `main`

> Status: Next.js 16 as a **static export**, so no server features: no Cache Components/PPR, no
> request-time APIs, dynamic routes need `generateStaticParams` + `dynamicParams = false`, and
> `public/` asset paths in `next/image` or `<a href>` must use `withBase()` from `lib/base-path.ts`
> (the site is served under `/portfolio`). This Next.js differs from older versions: read
> `node_modules/next/dist/docs/` before using unfamiliar APIs (see `AGENTS.md`).
> Personal copy (name, tagline, about, socials) lives in `lib/site.ts`; resume-style experience in
> `lib/experience.ts`; the three eras (post-college / college / high school) in `lib/eras.ts`.
> `documents/` holds private source resumes (gitignored). Never publish their contact details.

## Commands

```bash
npm run dev      # local dev server at http://localhost:3000
npm run build    # production build (must pass before committing)
npm run lint     # ESLint
```

## Project layout

```
app/                  # routes: / (home), /projects, /projects/[slug], /about
components/ui/        # shadcn primitives if added (generated; restyle, don't fork logic)
components/           # our own components (Hero, ProjectCard, Section, EraOverview…)
content/projects/     # one .mdx per project, with frontmatter (see add-project skill)
lib/                  # helpers (content loading, utils)
public/               # images, resume PDF, og images
docs/DESIGN.md        # the visual design system (source of truth for styling)
```

## Design system: always follow it

All UI work must follow **[docs/DESIGN.md](docs/DESIGN.md)**. The direction is **minimal mono**: black,
white and gray with one sparing blue accent, Geist type, hairline borders, generous whitespace, subtle motion.

@docs/DESIGN.md

Hard rules (short version):
- Use only the token-based Tailwind classes (`bg-bg`, `text-fg`, `text-muted`, `border-border`…). No raw hex values or arbitrary `[#xxxxxx]` classes in components.
- Stay monochrome. The accent is for focus rings and tiny details only.
- The site is always light, whatever the visitor's OS/browser theme. Don't add `prefers-color-scheme` rules or `dark:` overrides.
- Every animation respects `prefers-reduced-motion`.
- Mobile-first: design at 375px, then scale up. No horizontal scroll.

## Code conventions

- Server Components by default; add `"use client"` only for interactivity/animation.
- Components are function components with named exports, props typed inline or via `type Props`.
- Use `next/image` for images (with `alt`), `next/font` for fonts, `next/link` for internal links.
- Use the `cn()` helper from `lib/utils.ts` for conditional classes.
- Keep components small; one component per file in `components/`.
- Semantic HTML first (`<main>`, `<section>`, `<nav>`, headings in order).

## Verifying UI work

After building or changing UI, use the **Playwright MCP** to open `http://localhost:3000`, screenshot at
375px and 1280px widths, and check it against DESIGN.md before reporting done.

## MCP servers (configured in `.mcp.json`)

| Server     | Use it for |
|------------|------------|
| playwright | Viewing the running site, screenshots, clicking through flows |
| context7   | Current docs for Next.js, Tailwind v4, Motion, shadcn. Use before writing unfamiliar APIs |
| shadcn     | Browsing/adding shadcn components |
| figma      | Reading designs/frames if a Figma link is provided |
| github     | Issues, PRs, repo management |

## Skills (in `.claude/skills/`)

- `portfolio-ui`: building any page, section, or component
- `add-project`: adding a new project to the portfolio
