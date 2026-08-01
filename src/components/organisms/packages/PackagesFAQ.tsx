import { Container } from "@/components/atoms/Container";
import { getFaqs } from "@/lib/site-settings";

export async function PackagesFAQ() {
  const faqs = await getFaqs("packages");
  if (!faqs.length) return null;

  return (
    <section className="py-14">
      <Container>
        <div className="bg-cream-100 rounded-[28px] md:rounded-[32px] p-8 md:px-14 md:py-12">
          <h2 className="text-3xl md:text-[32px] mb-6 text-center">Quick package questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl">
                <div className="font-display font-bold text-base">{f.q}</div>
                <p className="text-sm text-ink-700 mt-2 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
