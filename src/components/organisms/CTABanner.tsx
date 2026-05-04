import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";

export function CTABanner({
  eyebrow,
  title,
  ctaLabel = "Book a free trial →",
  ctaHref = "/contact",
  background = "linear-gradient(135deg, #C8EBD7 0%, #C9E7FF 100%)",
}: {
  eyebrow: string;
  title: string;
  ctaLabel?: string;
  ctaHref?: string;
  background?: string;
}) {
  return (
    <section className="py-10 md:py-14">
      <Container>
        <div
          className="rounded-[28px] md:rounded-[32px] p-7 md:px-16 md:py-14 flex flex-col md:flex-row md:justify-between md:items-center gap-6"
          style={{ background }}
        >
          <div>
            <Eyebrow color="text-coral-400">{eyebrow}</Eyebrow>
            <h2 className="text-3xl md:text-[40px] mt-2 leading-tight">{title}</h2>
          </div>
          <Button asChild variant="primary" className="self-start md:self-auto">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
