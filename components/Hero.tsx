import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <Container className="relative pt-20 pb-20 md:pt-32 md:pb-28">
        <Reveal>
          {site.status && (
            <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1 text-sm text-muted">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {site.status}
            </p>
          )}
          <h1 id="hero-title" className="text-hero">
            {site.name}
          </h1>
        </Reveal>
        <Reveal index={1}>
          <p className="mt-6 max-w-2xl text-xl leading-snug tracking-tight text-muted md:text-2xl">
            <span className="text-fg">{site.tagline}</span> {site.passion}
          </p>
        </Reveal>
        <Reveal index={2} className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/projects">
            See my work
            <ArrowRight
              aria-hidden
              strokeWidth={2}
              className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
          </ButtonLink>
          <ButtonLink href="/about" variant="secondary">
            About me
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
