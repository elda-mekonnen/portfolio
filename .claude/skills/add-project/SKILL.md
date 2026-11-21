---
name: add-project
description: Use when the user wants to add, update, or feature a project in the portfolio (a case study, side project, work project, hackathon, etc.). Creates the MDX file with the correct frontmatter and assets.
---

# Adding a project

Projects live in `content/projects/<slug>.mdx`. Each file has frontmatter and a short case-study body.

## 1. Gather info (ask the user for anything missing)
- Title, one-line pitch, year, role
- Era: `post-college`, `college`, or `high-school`
- Tech stack (3–6 items)
- Links: live site, GitHub repo (the **github** MCP can pull the repo description/README for a starting point). Check that a repo is public before linking it, because private repos 404 for visitors.
- A cover screenshot at `public/projects/<slug>/cover.png`. If the project has a live site, the **playwright** MCP can capture one at 1440×900.
- Whether it should be featured on the home page

## 2. Create the file

```mdx
---
title: "Project Name"
slug: "project-name"
pitch: "One punchy line about what it is."
year: 2026
era: "post-college"   # post-college | college | high-school
role: "Solo developer"
stack: ["Next.js", "TypeScript", "Postgres"]
links:                # any of: live, repo, devpost, video (or {} for none)
  live: "https://..."
  repo: "https://github.com/..."
cover: "/projects/project-name/cover.png"
coverAlt: "What the screenshot shows"
featured: true
order: 1              # lower = shown first
---

## The problem
1–2 short paragraphs.

## What I built
What I did, key decisions, interesting technical bits.

## Outcome
Results, numbers, what I learned.
```

## 2b. Register it
Import the new file in `lib/projects.ts` and add it to the `modules` array:

```ts
import * as projectName from "@/content/projects/project-name.mdx";
const modules = [prosca, projectName];
```

Frontmatter is validated at build time, so a typo in `era`, `year`, or `stack` fails `npm run build`
with the project name and field. `cover`, `coverAlt` and `links` are optional; without a cover the card
shows a neutral placeholder.

To show extra images (posters, diagrams) inside the write-up, use the `Figure` component. It needs no
import:

```mdx
<Figure src="/projects/<slug>/poster.png" width={2500} height={1875} alt="…" caption="…" zoom />
```

For several screens, use `Gallery` (a swipeable strip with arrows, a counter and captions; images
default to 1440×900, so capture live sites at that viewport size with the **playwright** MCP):

```mdx
<Gallery
  label="<Project> screens"
  images={[
    { src: "/projects/<slug>/screen-1.png", alt: "…", caption: "…" },
    { src: "/projects/<slug>/screen-2.png", alt: "…", caption: "…" },
  ]}
/>
```

Pattern: the `cover` is the single hero image at the top of the page; the Gallery goes inside
"What I built", next to the features it shows.

## 3. Writing style
Follow the Voice section of `docs/DESIGN.md`: first person, short sentences, **what it is → what I did → outcome**. Keep the pitch under ~12 words.

## 4. Verify
Run the dev server and use the **playwright** MCP to check the project card on `/projects` and the detail page at `/projects/<slug>` (375px and 1280px).
