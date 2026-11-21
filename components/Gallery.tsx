"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { withBase } from "@/lib/base-path";

type Slide = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

type Props = {
  images: Slide[];
  /** Accessible name for the gallery, e.g. "Qidase Reader screens". */
  label: string;
};

/**
 * Swipeable screenshot strip: scroll-snap slides (the next one peeks in), prev/next buttons,
 * a counter, and captions. Each image opens full size. Usable in MDX as <Gallery … />.
 */
export function Gallery({ images, label }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  // Slide a button click is animating toward, so rapid clicks step from the destination,
  // not from a mid-scroll position. Cleared when the scroll settles.
  const targetRef = useRef<number | null>(null);
  const clearTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const slideWidth = useCallback(() => {
    const first = trackRef.current?.firstElementChild as HTMLElement | null;
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(trackRef.current!).columnGap) || 0;
    return first.offsetWidth + gap;
  }, []);

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    const w = slideWidth();
    // While a button-triggered scroll is animating, keep showing its destination.
    if (!track || !w || targetRef.current !== null) return;
    setIndex(Math.min(images.length - 1, Math.max(0, Math.round(track.scrollLeft / w))));
  }, [images.length, slideWidth]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const clear = () => (targetRef.current = null);
    track.addEventListener("scrollend", clear);
    return () => {
      track.removeEventListener("scrollend", clear);
      clearTimeout(clearTimer.current);
    };
  }, []);

  const step = (delta: number) => {
    const from = targetRef.current ?? index;
    const next = Math.min(images.length - 1, Math.max(0, from + delta));
    targetRef.current = next;
    setIndex(next);
    trackRef.current?.scrollTo({ left: next * slideWidth(), behavior: reduce ? "auto" : "smooth" });
    // Fallback for browsers without `scrollend`: release the target once the animation is surely done.
    clearTimeout(clearTimer.current);
    clearTimer.current = setTimeout(() => (targetRef.current = null), 800);
  };

  const button =
    "flex size-11 items-center justify-center rounded-full border border-border-strong bg-bg text-fg " +
    "transition-[background-color,opacity] hover:bg-surface disabled:pointer-events-none disabled:opacity-35";

  return (
    // On large screens the gallery breaks out of the 42rem text column so screenshots stay legible.
    <section aria-roledescription="carousel" aria-label={label} className="my-12 lg:-mx-24">
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label={`${label}: scroll or use the arrow buttons`}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] md:mx-0 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <li
            key={img.src}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${images.length}`}
            className="w-[85%] shrink-0 snap-start md:w-[88%]"
          >
            <figure>
              <a href={withBase(img.src)} target="_blank" rel="noopener noreferrer" className="block">
                <Image
                  src={withBase(img.src)}
                  alt={img.alt}
                  width={img.width ?? 1440}
                  height={img.height ?? 900}
                  sizes="(min-width: 1024px) 760px, (min-width: 768px) 592px, 85vw"
                  className="h-auto w-full rounded-card border border-border"
                />
              </a>
              {img.caption && <figcaption className="mt-3 text-sm text-muted">{img.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between">
        <p className="font-mono text-xs text-muted" aria-live="polite">
          {index + 1} / {images.length}
        </p>
        <div className="flex gap-2">
          <button type="button" className={button} onClick={() => step(-1)} disabled={index === 0} aria-label="Previous screenshot">
            <ArrowLeft aria-hidden strokeWidth={2} className="size-4" />
          </button>
          <button
            type="button"
            className={cn(button)}
            onClick={() => step(1)}
            disabled={index === images.length - 1}
            aria-label="Next screenshot"
          >
            <ArrowRight aria-hidden strokeWidth={2} className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
