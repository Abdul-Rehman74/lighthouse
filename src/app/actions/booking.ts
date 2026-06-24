"use server";

import { createSubmission, getNotifyEmails } from "@/lib/admin-data";
import { sendMail } from "@/lib/mailer";
import { trialRequestEmail } from "@/lib/email-templates";

export interface BookingPayload {
  name: string;
  age: string;
  date: string;
  phone: string;
  package?: string;
  notes?: string;
  source?: string;
}

export interface BookingResult {
  ok: boolean;
  error?: string;
  id?: string;
}

export async function submitTrialBooking(data: BookingPayload): Promise<BookingResult> {
  if (!data.name?.trim()) return { ok: false, error: "Please enter your name." };
  if (!data.phone?.trim()) return { ok: false, error: "Please enter a WhatsApp number." };
  if (!data.age?.trim()) return { ok: false, error: "Please enter the child's age." };
  if (!data.date?.trim()) return { ok: false, error: "Please pick a preferred date." };

  let id: string;
  try {
    id = await createSubmission({
      parent: data.name.trim(),
      age: data.age.trim(),
      date: data.date.trim(),
      phone: data.phone.trim(),
      package: data.package?.trim(),
      msg: data.notes?.trim(),
      source: data.source?.trim(),
    });
  } catch (err) {
    console.error("[booking] failed to save submission", err);
    return { ok: false, error: "We couldn't save your request. Please try again or WhatsApp us." };
  }

  // Fire-and-forget notification — never block or fail the booking on email.
  try {
    const email = trialRequestEmail({
      name: data.name,
      age: data.age,
      date: data.date,
      phone: data.phone,
      package: data.package,
      notes: data.notes,
      source: data.source,
    });
    const recipients = await getNotifyEmails();
    await sendMail({
      subject: email.subject,
      text: email.text,
      html: email.html,
      to: recipients.length ? recipients : undefined,
    });
  } catch (err) {
    console.error("[booking] notification email failed (submission still saved)", err);
  }

  return { ok: true, id };
}
