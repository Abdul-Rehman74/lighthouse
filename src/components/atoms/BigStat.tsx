export function BigStat({
  n,
  label,
  color,
}: {
  n: string;
  label: string;
  color: string;
}) {
  return (
    <div>
      <div
        className="font-display font-extrabold text-[64px] leading-none"
        style={{ color }}
      >
        {n}
      </div>
      <div className="text-sm text-cream-50/70 mt-2">{label}</div>
    </div>
  );
}
