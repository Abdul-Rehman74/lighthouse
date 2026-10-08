import type { Package } from "@/lib/admin-data";

export const PACKAGE_COPY = {
  half: { label: "Half-Day Discovery Package", hours: "08:00 AM – 12:00 PM", sub: "Creating a Foundation for Growth & Early Skills" },
  school: { label: "Extended Day Package", hours: "08:00 AM – 03:00 PM", sub: "Enhancing Learning, Social Development & Citizenship Through Structured Activities" },
  full: { label: "Full-Day Enrichment Package", hours: "08:00 AM – 07:00 PM", sub: "Reliable Support & Meaningful Learning for Busy Families" },
};

const LEGACY_COPY = {
  half: { label: "Half day", hours: "8 — 12", sub: "Mornings + lunch" },
  school: { label: "School day", hours: "8 — 3", sub: "Most popular" },
  full: { label: "Full day", hours: "8 — 6", sub: "For working parents" },
};

/** Update untouched old defaults on read; keep custom copy, prices and features.
 * After an admin saves packages, use their exact copy (including legacy wording).
 */
export function resolvePackageCopy(packages: Package[], version = 0): Package[] {
  if (version >= 1) return packages;
  return packages.map((p) => {
    const id = p.id as keyof typeof PACKAGE_COPY;
    if (!Object.prototype.hasOwnProperty.call(PACKAGE_COPY, id)) return p;
    const copy = PACKAGE_COPY[id];
    const old = LEGACY_COPY[id];
    return {
      ...p,
      label: p.label === old.label ? copy.label : p.label,
      hours: p.hours === old.hours ? copy.hours : p.hours,
      sub: p.sub === old.sub ? copy.sub : p.sub,
      features: p.features.map((feature) => {
        if (id === "school" && feature === "Everything in Half day") return "Everything in Half-Day Discovery Package";
        if (id === "full" && feature === "Everything in School day") return "Everything in Extended Day Package";
        if (id === "full" && p.hours === old.hours && feature === "Late pickup until 6pm") return "Late pickup until 7pm";
        return feature;
      }),
    };
  });
}

export function packageOption(p: Pick<Package, "label" | "hours">): string {
  return p.hours ? `${p.label} (${p.hours})` : p.label;
}
