"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/atoms/Button";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { FormField, SelectField, TextAreaField } from "@/components/atoms/FormField";
import { DatePickerField } from "@/components/atoms/DatePickerField";
import { submitTrialBooking } from "@/app/actions/booking";
import { trackMetaEvent } from "@/lib/pixel";

const initial = {
  name: "",
  age: "",
  date: "",
  phone: "",
  package: "School day (8–3)",
  notes: "",
};

export function BookTrialForm() {
  const [data, setData] = useState(initial);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const set =
    <K extends keyof typeof initial>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setData((d) => ({ ...d, [k]: e.target.value }));

  const reset = () => {
    setData(initial);
    setSent(false);
    setError(null);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await submitTrialBooking({ ...data, source: "contact-page" });
      if (res.ok) {
        trackMetaEvent("Lead", { content_name: "trial_booking", source: "contact-page" });
        setSent(true);
      } else setError(res.error ?? "Something went wrong");
    });
  };

  if (sent) {
    return (
      <div
        className="rounded-[28px] p-12 text-center min-h-[540px] flex flex-col justify-center items-center"
        style={{ background: "linear-gradient(135deg, #C8EBD7 0%, #FFE27A 100%)" }}
      >
        <div className="text-6xl">✿</div>
        <h2 className="font-display text-4xl mt-4">Sent!</h2>
        <p className="text-[17px] text-ink-700 mt-3.5 max-w-[380px]">
          Thank you, {data.name || "friend"}. We&apos;ll WhatsApp you within an hour to confirm your visit.
        </p>
        <Button onClick={reset} variant="ghost" className="mt-7" size="sm">
          Send another →
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-[28px] p-7 md:p-10 border-[1.5px] border-cream-200 shadow-soft-sm"
    >
      <Eyebrow color="text-coral-400">free trial form</Eyebrow>
      <h2 className="text-3xl md:text-[32px] mt-1.5 mb-5">Book a visit</h2>
      <FormField label="Parent's name" required value={data.name} onChange={set("name")} placeholder="e.g. Ayesha Khan" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <FormField label="Child's age" required value={data.age} onChange={set("age")} placeholder="e.g. 14 months" />
        <DatePickerField
          label="Preferred date"
          required
          value={data.date}
          onChange={(iso) => setData((d) => ({ ...d, date: iso }))}
        />
      </div>
      <FormField
        label="WhatsApp number"
        required
        type="tel"
        value={data.phone}
        onChange={set("phone")}
        placeholder="+92 3__ _______"
      />
      <SelectField label="Package interested in" value={data.package} onChange={set("package")}>
        <option>Half day (8–12) — Rs. 22,000</option>
        <option>School day (8–3)</option>
        <option>Full day (8–6) — Rs. 28,000</option>
        <option>Not sure yet — please advise</option>
      </SelectField>
      <TextAreaField
        label="Anything we should know? (optional)"
        rows={3}
        value={data.notes}
        onChange={set("notes")}
        placeholder="Allergies, special needs, questions..."
      />
      {error && <p className="text-coral-400 text-sm mb-3">{error}</p>}
      <Button type="submit" variant="primary" disabled={pending} className="w-full justify-center mt-3" size="lg">
        {pending ? "Sending..." : "Request free trial →"}
      </Button>
      <p className="text-xs text-ink-500 text-center mt-3.5">
        We&apos;ll only use this to confirm your visit. No marketing, ever.
      </p>
    </form>
  );
}
