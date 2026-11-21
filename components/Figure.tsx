import Image from "next/image";
import { withBase } from "@/lib/base-path";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** Link the image to its full-size file (good for posters and diagrams). */
  zoom?: boolean;
};

/** Framed image for case studies. Usable in MDX as <Figure … /> without importing. */
export function Figure({ src, alt, width, height, caption, zoom }: Props) {
  const img = (
    <Image
      src={withBase(src)}
      alt={alt}
      width={width}
      height={height}
      sizes="(min-width: 768px) 672px, 100vw"
      className="h-auto w-full rounded-card border border-border"
    />
  );
  return (
    <figure className="my-10">
      {zoom ? (
        <a href={withBase(src)} target="_blank" rel="noopener noreferrer" className="block">
          {img}
        </a>
      ) : (
        img
      )}
      {caption && <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}
