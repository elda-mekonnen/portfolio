import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-16 border-t border-border">
      <Container className="py-20 md:py-28">
        <p className="eyebrow mb-3">Contact</p>
        <h2 className="text-h2 max-w-xl">Let&apos;s build something together.</h2>
        <p className="body-copy mt-3 text-muted">
          I&apos;m always happy to talk about projects, roles, or ideas.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ButtonLink href={`mailto:${site.email}`}>Email me</ButtonLink>
          {site.socials.map((s) => (
            <ButtonLink key={s.label} href={s.href} variant="secondary">
              {s.label}
              <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-4 text-muted" />
            </ButtonLink>
          ))}
        </div>
        <div className="mt-20 flex flex-wrap justify-between gap-4 border-t border-border pt-6 text-sm text-muted">
          <p>© {site.name}</p>
          <p>Built with Next.js</p>
        </div>
      </Container>
    </footer>
  );
}
