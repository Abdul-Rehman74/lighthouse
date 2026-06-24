"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

const POP_W = 300;
const POP_H = 360; // estimate used before the popover has measured itself

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromISO = (s: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
};
const fmt = (d: Date) => `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/**
 * Theme-matched calendar date picker. Stores an ISO (YYYY-MM-DD) string via
 * onChange and shows a friendly label. Past dates are disabled by default.
 * The calendar opens in a portal with fixed positioning so it is never clipped
 * by an ancestor's `overflow:hidden` (e.g. the home page's gradient panel).
 */
export function DatePickerField({
  label,
  value,
  onChange,
  required,
  placeholder = "DD / MM / YYYY",
  minToday = true,
}: {
  label: string;
  value: string;
  onChange: (iso: string) => void;
  required?: boolean;
  placeholder?: string;
  minToday?: boolean;
}) {
  const selected = useMemo(() => fromISO(value), [value]);
  const today = useMemo(() => startOfDay(new Date()), []);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<Date>(() => selected ?? today);
  const [pos, setPos] = useState({ left: 0, top: 0, width: POP_W });
  const [mounted, setMounted] = useState(false);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const popRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  // Keep the visible month in sync when a value arrives/clears externally.
  useEffect(() => {
    if (selected) setView(selected);
  }, [selected]);

  const place = useCallback(() => {
    const t = triggerRef.current;
    if (!t) return;
    const r = t.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const width = Math.min(POP_W, vw - 16);
    const left = Math.max(8, Math.min(r.left, vw - width - 8));
    const popH = popRef.current?.offsetHeight || POP_H;
    let top = r.bottom + 8;
    if (top + popH > vh - 8 && r.top - popH - 8 > 8) top = r.top - popH - 8;
    setPos({ left, top, width });
  }, []);

  // Reposition while open (initial, month change, scroll, resize).
  useEffect(() => {
    if (!open) return;
    place();
    const onScroll = () => place();
    const onResize = () => place();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open, view, place]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (popRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const y = view.getFullYear();
  const m = view.getMonth();
  const firstWeekday = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(y, m, i + 1)),
  ];

  const pick = (d: Date) => {
    onChange(toISO(d));
    setOpen(false);
  };

  const calendar = (
    <div
      ref={popRef}
      role="dialog"
      aria-label="Choose a date"
      style={{ position: "fixed", left: pos.left, top: pos.top, width: pos.width }}
      className="z-[100] bg-white rounded-[18px] border-[1.5px] border-cream-200 shadow-soft-lg p-3.5 animate-fade-up"
    >
      <div className="flex items-center justify-between mb-2.5">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => setView(new Date(y, m - 1, 1))}
          className="w-8 h-8 rounded-full flex items-center justify-center text-ink-700 hover:bg-cream-100 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="font-display font-bold text-[15px] text-ink-900">
          {MONTHS[m]} {y}
        </div>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setView(new Date(y, m + 1, 1))}
          className="w-8 h-8 rounded-full flex items-center justify-center text-ink-700 hover:bg-cream-100 transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((w, i) => (
          <div key={i} className="h-7 flex items-center justify-center text-[11px] font-bold text-ink-500">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} className="h-9" />;
          const isSelected = selected && sameDay(d, selected);
          const isToday = sameDay(d, today);
          const disabled = minToday && startOfDay(d) < today;
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => pick(d)}
              className={cn(
                "h-9 rounded-[10px] text-sm font-semibold flex items-center justify-center transition-colors",
                disabled && "text-ink-300 cursor-not-allowed",
                !disabled && !isSelected && "text-ink-900 hover:bg-cream-100",
                isSelected && "bg-sun-300 text-ink-900 shadow-glow",
                !isSelected && isToday && !disabled && "ring-1 ring-inset ring-coral-300"
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-cream-200">
        <button
          type="button"
          onClick={() => pick(today)}
          className="text-[13px] font-bold text-ink-700 hover:text-ink-900 transition-colors"
        >
          Today
        </button>
        {selected && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="text-[13px] font-bold text-coral-400 hover:text-coral-300 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="mb-3">
      <div className="text-[11px] font-bold text-ink-700 mb-1.5 uppercase tracking-[0.06em]">
        {label}
      </div>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-required={required}
        className={cn(
          "w-full bg-cream-50 rounded-[10px] px-3.5 py-[11px] text-sm text-left flex items-center justify-between gap-2",
          "border-[1.5px] outline-none transition-colors",
          open ? "border-sun-300 ring-2 ring-sun-300/30" : "border-cream-200 hover:border-ink-300"
        )}
      >
        <span className={selected ? "text-ink-900" : "text-ink-500"}>
          {selected ? fmt(selected) : placeholder}
        </span>
        <Calendar size={16} className="text-ink-500 shrink-0" />
      </button>
      {open && mounted && createPortal(calendar, document.body)}
    </div>
  );
}
