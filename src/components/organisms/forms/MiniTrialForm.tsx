"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/atoms/FormField";
import { DatePickerField } from "@/components/atoms/DatePickerField";
import { submitTrialBooking } from "@/app/actions/booking";
import { trackMetaEvent } from "@/lib/pixel";

const initial = { name: "", age: "", date: "", phone: "" };

export function MiniTrialForm() {
  const [data, setData] = useState(initial);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const set = (k: keyof typeof initial) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await submitTrialBooking({ ...data, source: "home-mini" });
      if (res.ok) {
        trackMetaEvent("Lead", { content_name: "trial_booking", source: "home-mini" });
        setSent(true);
      } else setError(res.error ?? "Something went wrong");
    });
  };

  return (
    <div className="card p-7 relative">
      {sent ? (
        <div className="text-center py-6">
          <div className="text-4xl">✿</div>
          <h3 className="font-display text-2xl mt-2">Sent!</h3>
          <p className="text-sm text-ink-700 mt-2">We&apos;ll WhatsApp you within an hour.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="font-extrabold text-lg mb-4">Quick form</div>
          <FormField label="Parent's name" required value={data.name} onChange={set("name")} placeholder="Ayesha Khan" />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Child's age" required value={data.age} onChange={set("age")} placeholder="14 mo" />
            <DatePickerField
              label="Date"
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
          {error && <p className="text-coral-400 text-sm mb-2">{error}</p>}
          <Button type="submit" variant="sun" disabled={pending} className="w-full justify-center mt-2">
            {pending ? "Sending..." : "Send request →"}
          </Button>
        </form>
      )}
    </div>
  );
}
