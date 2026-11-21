---
name: portfolio-ui
description: Use when building or changing any page, section, layout, or component of the portfolio site (hero, nav, project cards, about section, buttons, etc.). Enforces the minimal mono design system in docs/DESIGN.md and verifies the result visually.
---

# Building portfolio UI

Follow these steps for any UI work.

## 1. Load the rules
Read `docs/DESIGN.md` if it isn't already in context. It is the source of truth for colors, type, borders, motion, and component patterns.

## 2. Check for an existing piece
Look in `components/` before creating something new. Reuse `Container`, `Section`, `SectionHeader`, `ButtonLink`, `Tag`, `ProjectCard`, `ProjectCover`, `Reveal`, `EraOverview`, and `ExperienceTimeline`.

## 3. Check current APIs when unsure
This is Next.js 16 with Cache Components. Read the bundled docs in `node_modules/next/dist/docs/` before using unfamiliar Next APIs. Use the **context7** MCP for Tailwind v4 and `motion/react`. If a shadcn primitive fits (dialog, sheet, tooltip), add it with the **shadcn** MCP and restyle it to DESIGN.md.

## 4. Build it
- Mobile-first (375px), then `md:` / `lg:`.
- Only token classes: `bg-bg`, `bg-surface`, `text-fg`, `text-muted`, `border-border`, `border-border-strong`, `rounded-card`, `shadow-card`, `text-h1`/`text-h2`/`text-h3`, `eyebrow`, `body-copy`. No hex values, no arbitrary color classes, no `dark:` color overrides.
- Color stays monochrome. `accent` is only for tiny details (focus, status dot, link hover).
- Hairline borders at rest. Shadows only on hover.
- Animations use `motion/react` with the `easeOut` curve, plus `useReducedMotion()` / `motion-reduce:` fallbacks.
- Semantic HTML, alt text, visible focus, ≥44px tap targets.

## 5. Verify visually
With `npm run dev` running, use the **playwright** MCP to:
1. Open the page at width 375 and screenshot it.
2. Open at width 1280 and screenshot it.
3. Tab through interactive elements and confirm focus rings show.

Scroll the page before a full-page screenshot, since `Reveal` content stays hidden until it scrolls into view.

**Stale styles:** the dev server sometimes keeps serving old CSS after `app/globals.css` changes, and running `npm run build` alongside it also breaks its cache. If what you see doesn't match the CSS, stop `next dev`, `rm -rf .next`, and start it again before debugging anything else.

## Checklist
- [ ] No horizontal scroll at 375px
- [ ] Monochrome: no colored blocks or gradients, accent only on small details
- [ ] Site stays light (no `prefers-color-scheme` rules added)
- [ ] Reduced motion respected
- [ ] `npm run build` and `npm run lint` pass
