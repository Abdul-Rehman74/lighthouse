import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { getStaff, getStaffCopy } from "@/lib/site-settings";

const avatarBgs = ["#FFE27A", "#C8EBD7", "#FFC9B6", "#C9E7FF"];

/** First letters of the first two words, e.g. "Ms. Amira Malik" → "MA". */
function initials(name: string): string {
  return (
    (name || "?")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "?"
  );
}

export async function StaffSection() {
  const [team, copy] = await Promise.all([getStaff(), getStaffCopy()]);
  if (!team.length) return null;

  return (
    <section className="py-14">
      <Container>
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3 mb-12">
          <div>
            <Eyebrow color="text-coral-400">the people</Eyebrow>
            {copy.heading && <h2 className="text-3xl md:text-[44px] mt-1.5">{copy.heading}</h2>}
          </div>
          {copy.note && <div className="text-sm text-ink-500 max-w-[280px]">{copy.note}</div>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-[24px] p-6 flex items-center gap-4 border-[1.5px] border-cream-200 hover:shadow-soft-md transition-shadow"
            >
              {t.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-[72px] h-[72px] rounded-full object-cover shrink-0"
                />
              ) : (
                <div
                  className="w-[72px] h-[72px] rounded-full flex items-center justify-center font-display font-extrabold text-xl text-ink-900 shrink-0"
                  style={{ background: avatarBgs[i % avatarBgs.length] }}
                  aria-hidden
                >
                  {initials(t.name)}
                </div>
              )}
              <div>
                <div className="font-display font-bold text-lg">{t.name}</div>
                {t.role && <div className="text-[13px] text-ink-500 mt-1">{t.role}</div>}
              </div>
            </div>
          ))}
        </div>
        {copy.footnote && (
          <p className="text-[13px] text-ink-500 text-center mt-6">{copy.footnote}</p>
        )}
      </Container>
    </section>
  );
}
