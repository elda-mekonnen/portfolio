import { ButtonLink } from "@/components/ButtonLink";
import { Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section>
      <p className="eyebrow mb-3">404</p>
      <h1 className="text-h1">Page not found.</h1>
      <p className="body-copy mt-4 text-muted">The link might be old, or I moved things around.</p>
      <div className="mt-8">
        <ButtonLink href="/">Back home</ButtonLink>
      </div>
    </Section>
  );
}
