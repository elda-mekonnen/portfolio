import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  id?: string;
  labelledBy?: string;
  className?: string;
};

export function Section({ children, id, labelledBy, className }: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-20 md:py-32", className)}>
      <Container>{children}</Container>
    </section>
  );
}
