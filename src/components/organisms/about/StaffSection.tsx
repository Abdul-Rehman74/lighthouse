import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";

const teachers = [
  { name: "Mrs. Asma", role: "Lead Teacher · Toddlers", emoji: "🌸" },
  { name: "Mrs. Sana", role: "Lead Teacher · Infants", emoji: "🌼" },
  { name: "Mrs. Hina", role: "Montessori Coordinator", emoji: "🌱" },
  { name: "Mrs. Rabia", role: "Lead Teacher · Pre-K", emoji: "🌷" },
  { name: "Nanny Shahida", role: "Senior Nanny", emoji: "✿" },
  { name: "Mrs. Maham", role: "Health & Hygiene Lead", emoji: "🧴" },
];

const avatarBgs = ["#FFE27A", "#C8EBD7", "#FFC9B6", "#C9E7FF"];

export function StaffSection() {
  return (
    <section className="py-14">
      <Container>
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3 mb-12">
          <div>
            <Eyebrow color="text-coral-400">the people</Eyebrow>
            <h2 className="text-3xl md:text-[44px] mt-1.5">22 teachers + 5 professional nannies.</h2>
          </div>
          <div className="text-sm text-ink-500 max-w-[280px]">
            Every team member is trained in early childhood care, first aid, and our hygiene protocols.
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {teachers.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-[24px] p-6 flex items-center gap-4 border-[1.5px] border-cream-200 hover:shadow-soft-md transition-shadow"
            >
              <div
                className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-3xl shrink-0"
                style={{ background: avatarBgs[i % avatarBgs.length] }}
              >
                {t.emoji}
              </div>
              <div>
                <div className="font-display font-bold text-lg">{t.name}</div>
                <div className="text-[13px] text-ink-500 mt-1">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[13px] text-ink-500 text-center mt-6">
          + 16 more teachers across our Toddler, Pre-K and Montessori rooms · Meet everyone on your visit
        </p>
      </Container>
    </section>
  );
}
