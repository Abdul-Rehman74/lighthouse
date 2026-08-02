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
              For families looking<br />for trusted support.
            </h2>
          </div>
          <div className="text-[17px] text-ink-700 leading-relaxed space-y-4">
            <p>
              Since opening in <strong>2019</strong>, Lighthouse has been a guiding light for
              families, built on the belief that quality care and learning should be accessible
              to every child. What began as a vision to support busy families has grown into a
              trusted environment where children from <strong>2 months onwards</strong> are
              nurtured with care, comfort, and confidence.
            </p>
            <p>
              Over the years, Lighthouse has continued to grow with a dedicated team of{" "}
              <strong>22 trained teachers and 5 professional nannies</strong>, providing a safe,
              hygienic, and teacher-monitored environment.
            </p>
            <p>
              As a guiding light for children of all abilities, we are committed to creating an
              inclusive environment where every child is understood, supported, and encouraged to
              reach their full potential.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
