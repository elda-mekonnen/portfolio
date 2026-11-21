"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ExternalTextLink } from "@/components/ExternalTextLink";
import type { Era } from "@/lib/eras";
import { cn, easeOut } from "@/lib/utils";

export type TimelineItem = {
  title: string;
  meta: string;
  /** Internal page for the title (e.g. a project case study). */
  href?: string;
  /** Optional external link shown under the item (e.g. a research video). */
  link?: { label: string; href: string };
};

export type TimelineStop = {
  id: Era;
  label: string;
  years: string;
  blurb: string;
  experience: TimelineItem[];
  projects: TimelineItem[];
};

type Props = {
  /** Oldest first: they're laid out left (oldest) to right (now). */
  stops: TimelineStop[];
  /** Stop shown before any interaction; defaults to the latest. */
  initial?: Era;
};

/**
 * Horizontal three-stop timeline. Hovering, tapping, or focusing a stop shows its details in a panel
 * below the line (a tabs pattern, so it works with mouse, touch, and keyboard alike).
 */
export function StoryTimeline({ stops, initial }: Props) {
  const [active, setActive] = useState<Era>(initial ?? stops[stops.length - 1].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const current = stops.find((s) => s.id === active)!;

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + stops.length) % stops.length;
    setActive(stops[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      {/* The line: oldest on the left, "now" on the right. */}
      <div className="relative">
        <div aria-hidden className="absolute top-[0.6875rem] right-0 left-0 h-px bg-border-strong" />
        <div role="tablist" aria-label="Chapters, oldest to newest" className="relative grid grid-cols-3">
          {stops.map((stop, i) => {
            const selected = stop.id === active;
            return (
              <button
                key={stop.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`story-tab-${stop.id}`}
                aria-selected={selected}
                aria-controls="story-panel"
                tabIndex={selected ? 0 : -1}
                onMouseEnter={() => setActive(stop.id)}
                onFocus={() => setActive(stop.id)}
                onClick={() => setActive(stop.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "group flex min-h-11 flex-col gap-3 rounded-lg pb-2 text-left",
                  i === 1 && "items-center text-center",
                  i === stops.length - 1 && "items-end text-right",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "relative flex size-[1.375rem] items-center justify-center rounded-full border bg-bg",
                    "transition-colors duration-200 motion-reduce:transition-none",
                    selected ? "border-fg" : "border-border-strong group-hover:border-fg",
                  )}
                >
                  <span
                    className={cn(
                      "size-2 rounded-full transition-colors duration-200 motion-reduce:transition-none",
                      selected ? "bg-fg" : "bg-border-strong group-hover:bg-muted",
                    )}
                  />
                </span>
                <span>
                  <span className={cn("block font-medium transition-colors", selected ? "text-fg" : "text-muted group-hover:text-fg")}>
                    {stop.label}
                  </span>
                  <span className="block font-mono text-xs text-muted">{stop.years}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Details for the active stop. */}
      <div
        role="tabpanel"
        id="story-panel"
        aria-labelledby={`story-tab-${active}`}
        className="mt-8 rounded-card border border-border bg-surface p-6 md:p-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: easeOut }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-h3">{current.label}</h3>
              <p className="font-mono text-xs text-muted">{current.years}</p>
            </div>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{current.blurb}</p>

            <div className="mt-6 grid gap-8 md:grid-cols-2">
              {current.experience.length > 0 && (
                <DetailList title="Experience" items={current.experience} />
              )}
              {current.projects.length > 0 && <DetailList title="Projects" items={current.projects} />}
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-5 text-sm font-medium">
              {current.projects.length > 0 && (
                <PanelLink href={`/projects#${current.id}`}>See the projects</PanelLink>
              )}
              <PanelLink href={`/about#experience-${current.id}`}>Full experience</PanelLink>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function DetailList({ title, items }: { title: string; items: TimelineItem[] }) {
  return (
    <div>
      <h4 className="eyebrow mb-3">{title}</h4>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={`${item.title}-${item.meta}`} className="flex gap-3">
            <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-border-strong" />
            <span>
              {item.href ? (
                <Link href={item.href} className="font-medium underline decoration-border-strong underline-offset-4 hover:decoration-fg">
                  {item.title}
                </Link>
              ) : (
                <span className="font-medium">{item.title}</span>
              )}
              <span className="block text-sm text-muted">{item.meta}</span>
              {item.link && <ExternalTextLink href={item.link.href}>{item.link.label}</ExternalTextLink>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PanelLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex min-h-11 items-center gap-1.5 text-muted transition-colors hover:text-fg">
      {children}
      <ArrowRight
        aria-hidden
        strokeWidth={2}
        className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
      />
    </Link>
  );
}
