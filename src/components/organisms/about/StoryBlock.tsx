import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";

export function StoryBlock() {
  return (
    <section className="py-14">
      <Container>
        <div className="bg-cream-100 rounded-[28px] md:rounded-[32px] p-7 md:px-16 md:py-14 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-14 items-start">
          <div>
            <Eyebrow color="text-mint-400">our story</Eyebrow>
            <h2 className="text-3xl md:text-[40px] mt-2 leading-tight">
              Built for the<br />working mother.
            </h2>
          </div>
          <div className="text-[17px] text-ink-700 leading-relaxed space-y-4">
            <p>
              We opened in <strong>2019</strong> with a simple belief: a daycare should never
              feel like a compromise. A home nanny may be unavailable any day — but a real
              <em> system </em>shouldn&apos;t ever stop.
            </p>
            <p>
              Seven years later, we welcome children from <strong>2 months onwards</strong>,
              in a teacher-monitored, hygienic environment that&apos;s been refined day after day
              by <strong>22 trained teachers and 5 professional nannies</strong>. Linen, meals,
              care — all supervised. Every little routine, watched.
            </p>
            <p>
              We&apos;ve grown across the Twin Cities because mothers tell other mothers. That&apos;s
              still our favorite kind of advertising.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
