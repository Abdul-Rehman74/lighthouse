import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { cn } from "@/lib/utils";
import { getPageContent, getComparisonTable } from "@/lib/site-settings";

function Cell({ value, highlight }: { value: string; highlight?: boolean }) {
  const dim = value === "—" || value === "";
  return (
    <div
      className={cn(
        "text-center",
        dim ? "text-ink-300" : "text-ink-900",
        value === "✓" ? "font-extrabold" : "font-semibold",
        highlight && "bg-sun-300/15"
      )}
    >
      {value || "—"}
    </div>
  );
}

export async function ComparisonTable() {
  const content = await getPageContent();
  if (!content.comparisonVisible) return null;
  const { columns, rows } = await getComparisonTable();
  if (!columns.length || !rows.length) return null;
  const gridCols = `2fr repeat(${columns.length}, 1fr)`;

  return (
    <section className="py-14">
      <Container>
        <div className="text-center mb-9">
          <Eyebrow color="text-mint-400">side-by-side</Eyebrow>
          <h2 className="text-3xl md:text-[40px] mt-1.5">Compare what&apos;s included.</h2>
        </div>
        <div className="bg-white rounded-[24px] overflow-hidden border-[1.5px] border-cream-200 overflow-x-auto">
          <div className="min-w-[560px]">
            <div className="grid bg-ink-900 text-cream-50 px-5 sm:px-7 py-5 font-extrabold text-sm" style={{ gridTemplateColumns: gridCols }}>
              <div />
              {columns.map((c, i) => (
                <div key={i} className={cn("text-center", c.highlight && "text-sun-300")}>
                  {c.label}
                </div>
              ))}
            </div>
            {rows.map((r, i) => (
              <div
                key={i}
                className={cn(
                  "grid px-5 sm:px-7 py-4 text-[15px] items-center",
                  i === 0 ? "" : "border-t border-cream-200",
                  i % 2 === 0 ? "bg-cream-50" : "bg-white"
                )}
                style={{ gridTemplateColumns: gridCols }}
              >
                <div className="font-bold text-ink-900">{r.label}</div>
                {columns.map((c, ci) => (
                  <Cell key={ci} value={r.values[ci] ?? ""} highlight={c.highlight} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
