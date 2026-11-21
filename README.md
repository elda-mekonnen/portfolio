# Portfolio

My personal site: who I am, what I'm into, and the projects I've built.
Built with Next.js 16, TypeScript, Tailwind CSS v4, Motion, and MDX.

## Run it locally

**You'll need:** [Node.js](https://nodejs.org/) 20.9 or newer (check with `node -v`). npm comes with it.

```bash
# 1. Get the code
git clone <this-repo-url>
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page reloads as you edit files.
Stop the server with `Ctrl + C`.

### Other commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Dev server with hot reload at http://localhost:3000 |
| `npm run build` | Production build. Must pass before committing |
| `npm run start` | Serves the production build (run `npm run build` first) |
| `npm run lint` | Checks the code with ESLint |

If port 3000 is busy, run `npm run dev -- -p 3001` and open http://localhost:3001.

## Editing content

| What | Where |
|------|-------|
| Name, tagline, about text, email, socials, resume | `lib/site.ts` (placeholders are marked `TODO`) |
| Work history (About page timeline) | `lib/experience.ts` |
| Era names, years, blurbs (post-college / college / high school) | `lib/eras.ts` |
| Projects | `content/projects/<slug>.mdx`, then register it in `lib/projects.ts` |
| Project images | `public/projects/<slug>/cover.png` |
| Colors, fonts, spacing | `app/globals.css` (tokens), following `docs/DESIGN.md` |

### Adding a project

1. Copy `content/projects/prosca.mdx` to `content/projects/<your-slug>.mdx` and edit the frontmatter
   and write-up. Set `era` to `post-college`, `college`, or `high-school`.
2. In `lib/projects.ts`, import it and add it to `modules`:
   ```ts
   import * as mySlug from "@/content/projects/my-slug.mdx";
   const modules = [prosca, mySlug];
   ```
3. Optional: add a screenshot to `public/projects/<your-slug>/cover.png` and set `cover` in the
   frontmatter.

Frontmatter is checked at build time, so a missing or invalid field fails `npm run build` with a
clear message.

## Project structure

```
app/                  routes: / , /projects, /projects/[slug], /about
components/           Nav, Hero, ProjectCard, StoryTimeline, Gallery, ButtonLink, Tag, …
content/projects/     one .mdx file per project
lib/                  site copy, project loading, helpers
public/               images, resume PDF
docs/DESIGN.md        the design system (colors, type, motion rules)
```

## Deploying

The site is published with **GitHub Pages** at https://elda-mekonnen.github.io/portfolio/.

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds a static export
(`out/`) and publishes it. Nothing else to run; check progress in the repo's **Actions** tab.

One-time setup (already needed only once): repo **Settings → Pages → Build and deployment →
Source: GitHub Actions**.

To preview the production build locally, including the `/portfolio` prefix:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
mkdir -p /tmp/pages && rm -rf /tmp/pages/portfolio && cp -R out /tmp/pages/portfolio
python3 -m http.server 4173 --directory /tmp/pages   # open http://localhost:4173/portfolio/
```

Images in `public/` must go through `withBase()` from `lib/base-path.ts` when used in
`next/image` or a plain `<a href>` (links via `next/link` are prefixed automatically).
