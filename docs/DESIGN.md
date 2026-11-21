# Design System: Minimal Mono

The site should feel **modern, calm, and confident**, like a well-made product site (think Vercel, Linear).
Personality comes from good typography, whitespace, real project screenshots, and the writing.
It does not come from color.

**Three words:** clean · precise · quiet.

---

## 1. Color

Almost everything is black, white, and gray. There is **one accent** (blue), used sparingly.

| Token           | Light     | Dark      | Role |
|-----------------|-----------|-----------|------|
| `bg`            | `#ffffff` | `#0a0a0a` | Page background |
| `surface`       | `#fafafa` | `#111111` | Subtle panels, tags, placeholders |
| `fg`            | `#0a0a0a` | `#ededed` | Headings, primary text, primary button background |
| `muted`         | `#666666` | `#a1a1a1` | Secondary text, nav links, metadata |
| `border`        | `#ebebeb` | `#232323` | Hairline borders and dividers |
| `border-strong` | `#d4d4d4` | `#3a3a3a` | Hover borders, secondary button outlines |
| `accent`        | `#2563eb` | `#60a5fa` | Focus ring, status dot, link hover, text selection |

**The site is always light**, whatever the visitor's OS or browser theme. `color-scheme: only light`
(in `globals.css`) and `<meta name="color-scheme" content="only light">` (the `viewport` export in
`app/layout.tsx`) also stop browsers like Chrome from auto-darkening it. The dark values in the table are
kept dormant in `globals.css` under `:root.dark`, in case a light/dark toggle is added later. Tokens would
swap automatically, so **never write `dark:` color overrides** in components.

### Rules
- Text is `text-fg` or `text-muted` on `bg` / `surface`. Both pass WCAG AA in both themes.
- The **primary button is inverted** (`bg-fg text-bg`), not accent-colored.
- Use `accent` for small details only: focus rings, a status dot, link underline on hover.
  Never for large fills, section backgrounds, or body text.
- No gradients or colored section blocks. Separate sections with whitespace and a `border-t border-border`.

---

## 2. Typography

| Role | Font | Notes |
|------|------|-------|
| Sans | **Geist** | Everything: headings (semibold 600, tight tracking) and body |
| Mono | **Geist Mono** | Eyebrows, dates, tech-stack tags, small metadata |

Loaded with `next/font/google` as `--font-geist-sans` / `--font-geist-mono`.

| Token / utility | Size | Use |
|-----------------|------|-----|
| `text-hero` | `clamp(2.75rem, 7vw, 5rem)`, tracking -0.045em | Home page name only |
| `text-h1`   | `clamp(2.25rem, 5vw, 3.5rem)` | Page titles |
| `text-h2`   | `clamp(1.625rem, 3vw, 2.25rem)` | Section titles |
| `text-h3`   | `1.25rem` | Card titles, sub-sections |
| `body-copy` | `1.0625rem` / 1.7, max 65ch | Paragraphs |
| `eyebrow`   | mono `0.75rem`, uppercase, muted | Label above a heading ("Selected work") |

Headings are `font-semibold` with tight tracking (built into the tokens). No italics, outlines, or
highlighter effects.

---

## 3. Shape, borders & depth

| Token | Value | Use |
|-------|-------|-----|
| `border` (1px) | `border-border` | Cards, dividers, tags, nav bottom edge |
| `rounded-card` | `0.875rem` | Cards, images, panels |
| `rounded-full` | pill | Buttons, tags, status pill |
| `shadow-card`  | soft, low-opacity | **Hover only**, on cards |

At rest, depth comes from hairline borders, not shadows. On hover, cards rise 2px, the border goes to
`border-strong`, and `shadow-card` fades in.

---

## 4. Spacing & layout

- 4px grid; Tailwind's default spacing scale.
- Gutter: `px-4` mobile, `px-8` from `md`. Content max width `max-w-6xl mx-auto` (the `Container` component).
- Sections: `py-20 md:py-32`, separated by `border-t border-border`.
- Grids: projects `md:grid-cols-2` (home) / `lg:grid-cols-3` (projects page), `gap-6`.
- Lots of whitespace. When in doubt, remove something.

---

## 5. Motion

Library: `motion/react`. The feel is **smooth and subtle**.

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (`easeOut` in `lib/utils.ts`, `ease-out-soft` in CSS).
- Entrances: fade + 12px rise, 0.5s, staggered 60ms, once when scrolled into view (`Reveal` component).
- Hovers: 200–300ms. Arrow icons nudge 2px, card images scale to 1.02.
- **Always** respect reduced motion: `useReducedMotion()` in JS (opacity only), `motion-reduce:` in CSS.
- No scroll-jacking, no parallax, no bouncy springs.

---

## 6. Components (patterns)

- **ButtonLink:** pill, `min-h-11`, `text-sm font-medium`. Primary = `bg-fg text-bg`. Secondary =
  `border-border-strong`, transparent background, `hover:bg-surface`.
- **ProjectCard:** whole card is a link. Hairline border, cover screenshot in an inner rounded frame, title
  (`text-h3`), one-line pitch (muted), year plus up to 3 mono tags.
- **Tag:** mono `text-xs`, pill, `border-border bg-surface text-muted`.
- **SectionHeader:** eyebrow + heading + optional description + optional right-side action link.
- **Nav:** sticky, translucent `bg-bg/80` with backdrop blur, bottom hairline. Name left, muted links right.
- **Hero:** faint fading grid background (`bg-grid`), status pill with an accent dot, name in `text-hero`,
  tagline in `fg` followed by a passion line in `muted`.
- **StoryTimeline** (home, "The story so far"): a horizontal line with three stops, oldest (high school)
  on the left and post-college on the right. Hover, tap, or arrow-key a stop to swap the detail panel
  below it (tabs pattern, not a floating popover, so it works on touch). Data comes from
  `lib/experience.ts`, `lib/other-projects.ts`, and the project MDX files.
- **Gallery** (case studies): one hero image at the top (the cover), then extra screens in a swipeable
  scroll-snap strip with captions, prev/next buttons and an "n / total" counter. No auto-advance. On
  large screens it widens past the text column so screenshots stay legible.
- **Placeholders** (no screenshot or photo yet): `surface` panel with the grid and a small pill label.

Restyle any shadcn component to these patterns. Don't ship default shadcn styles.

---

## 7. Imagery & icons

- Real screenshots of the project, cropped from the top (`object-top`), in a hairline rounded frame.
  Save them as `public/projects/<slug>/cover.png` (1440×900 works well).
- Icons: **Lucide**, stroke width 1.75–2, `size-4` / `size-5`, usually `text-muted`.
- No decorative shapes or illustrations.

---

## 8. Voice & content

- First person, warm, direct. Short sentences. No buzzwords.
- Hero = name + one line on what I do + one line on what I care about.
- Project blurbs: **what it is → what I did → outcome**. Pitches under ~12 words.
- Work is grouped into three eras: **post-college, college, high school** (`lib/eras.ts`).

---

## 9. Accessibility (non-negotiable)

- Only `fg` / `muted` text on `bg` / `surface` (or `bg` text on `fg` for the primary button).
- Visible focus: `outline: 2px solid accent; outline-offset: 3px` (global in `globals.css`).
- Meaningful `alt` text (or `alt=""` / `aria-hidden` for decoration).
- Tap targets ≥ 44px (`min-h-11`). Headings in order. Fully keyboard navigable, with a skip link.

---

## 10. Where the tokens live

All tokens are defined in `app/globals.css` (`@theme` for light, plus the dark overrides). Use only
token classes in components (`bg-bg`, `text-fg`, `text-muted`, `border-border`, `bg-surface`,
`rounded-card`, `shadow-card`, `text-h2`, `eyebrow`, `body-copy`…). **No raw hex values** or arbitrary
color classes in components.
