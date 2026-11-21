import { ExternalTextLink } from "@/components/ExternalTextLink";
import { Reveal } from "@/components/Reveal";
import { eraIds, eras } from "@/lib/eras";
import { experience } from "@/lib/experience";

/** Resume-style experience, grouped into post-college / college / high school. */
export function ExperienceTimeline() {
  return (
    <div className="space-y-16">
      {eraIds.map((id) => (
        <section key={id} id={`experience-${id}`} aria-labelledby={`exp-${id}`} className="scroll-mt-24">
          <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-border pb-3">
            <h3 id={`exp-${id}`} className="text-h3">
              {eras[id].label}
            </h3>
            <p className="font-mono text-xs text-muted">{eras[id].years}</p>
          </div>
          <ol className="space-y-8">
            {experience[id].map((item, i) => (
              <li key={`${item.title}-${item.org}`}>
                <Reveal index={i} className="grid gap-1 md:grid-cols-[10rem_1fr] md:gap-8">
                  <p className="font-mono text-xs leading-6 text-muted">{item.dates}</p>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-[0.9375rem] text-muted">{item.org}</p>
                    {item.points && item.points.length > 0 && (
                      <ul className="mt-3 space-y-1.5 text-[0.9375rem] leading-relaxed text-muted">
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-3">
                            <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-border-strong" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.link && (
                      <ExternalTextLink href={item.link.href} className="mt-1">
                        {item.link.label}
                      </ExternalTextLink>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
