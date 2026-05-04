import { Container } from "@/components/atoms/Container";

const faqs = [
  { q: "Do you accept payment monthly?", a: "Yes — we bill monthly. Annual payment gets a 5% discount." },
  { q: "Is there a registration or admission fee?", a: "No registration fee. Just the monthly fee for your chosen package." },
  {
    q: "Can I switch packages later?",
    a: "Yes — switch anytime with one month's notice. Many parents start with Half day and move to School day.",
  },
  { q: "Do you offer sibling discount?", a: "Yes — 10% off the monthly fee for the second child." },
];

export function PackagesFAQ() {
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
