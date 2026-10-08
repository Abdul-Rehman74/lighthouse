import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";

import { getPageContent } from "@/lib/site-settings";

export async function StoryBlock() {
  const content = await getPageContent();
  return (
    <section className="py-14">
      <Container>
        <div className="bg-cream-100 rounded-[28px] md:rounded-[32px] p-7 md:px-16 md:py-14 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-14 items-start">
          <div>
            <Eyebrow color="text-mint-400">our story</Eyebrow>
            <h2 className="text-3xl md:text-[40px] mt-2 leading-tight">
              {content.storyHeading}
            </h2>
          </div>
          <div className="text-[17px] text-ink-700 leading-relaxed space-y-4">
            {content.storyBody.split(/\n\s*\n/).filter(Boolean).map((paragraph, i) => (
              <p key={i} className="whitespace-pre-line">{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
