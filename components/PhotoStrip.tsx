import Image from "next/image";
import { withBase } from "@/lib/base-path";
import { cn } from "@/lib/utils";

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Mosaic tile shape: "tall" spans two rows (portraits), "wide" spans two columns (panoramas). */
  tile?: "tall" | "wide";
};

type Props = { photos: Photo[]; label: string };

/**
 * Photo mosaic: 2 columns on phones, 3 on larger screens, with tall/wide tiles so portrait and
 * landscape shots both get room. Photos are cropped to fill their tile; each opens full size.
 */
export function PhotoStrip({ photos, label }: Props) {
  return (
    <ul aria-label={label} className="grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:auto-rows-[15rem] md:grid-cols-3 md:gap-4">
      {photos.map((photo) => (
        <li
          key={photo.src}
          className={cn(photo.tile === "tall" && "row-span-2", photo.tile === "wide" && "col-span-2")}
        >
          <a
            href={withBase(photo.src)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block size-full overflow-hidden rounded-card border border-border bg-surface"
          >
            <Image
              src={withBase(photo.src)}
              alt={photo.alt}
              fill
              sizes={photo.tile === "wide" ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
              className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.03] motion-reduce:transition-none"
            />
            <span className="sr-only">(opens full size in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
