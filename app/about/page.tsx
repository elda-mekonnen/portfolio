import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ExternalTextLink } from "@/components/ExternalTextLink";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Tag } from "@/components/Tag";
import { site } from "@/lib/site";
import { withBase } from "@/lib/base-path";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <Section>
        <SectionHeader as="h1" eyebrow="About" title={`Hi, I'm ${site.shortName}.`} />

        <div className="grid gap-12 md:grid-cols-[2fr_3fr] md:gap-16">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-card border border-border bg-surface md:mx-0">
              <Image
                src={withBase(site.photo.src)}
                alt={site.photo.alt}
                fill
                preload
                sizes="(min-width: 768px) 384px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            {site.about.map((paragraph, i) => (
              <Reveal key={i} index={i + 1}>
                <p className={i === 0 ? "body-copy mb-5" : "body-copy mb-5 text-muted"}>{paragraph}</p>
              </Reveal>
            ))}

            <h2 className="eyebrow mt-10 mb-4">Things I care about</h2>
            <ul className="flex flex-wrap gap-2">
              {site.passions.map((p) => (
                <li key={p}>
                  <Tag className="px-3 py-1 text-sm">{p}</Tag>
                </li>
              ))}
            </ul>

            {site.resume && (
              <div className="mt-10">
                <ButtonLink href={site.resume}>
                  Resume (PDF) <ArrowUpRight aria-hidden strokeWidth={2} className="size-4" />
                </ButtonLink>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section labelledBy="experience-title" className="border-t border-border">
        <SectionHeader id="experience-title" eyebrow="Experience" title="The story so far" />
        <ExperienceTimeline />
      </Section>

      {site.beyondCode.length > 0 && (
        <Section labelledBy="beyond-title" className="border-t border-border">
          <SectionHeader id="beyond-title" eyebrow="Beyond code" title="Off the clock" />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {site.beyondCode.map((item, i) => (
              <li key={item.title}>
                <Reveal index={i} className="h-full rounded-card border border-border bg-surface p-6 md:p-8">
                  <h3 className="text-h3">{item.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>
                  {item.links && item.links.length > 0 && (
                    <ul className="mt-3">
                      {item.links.map((link) => (
                        <li key={link.href}>
                          <ExternalTextLink href={link.href}>{link.label}</ExternalTextLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
