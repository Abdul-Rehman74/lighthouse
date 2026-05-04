"use server";

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

  // Server-side log — replace with email/CRM integration later.
  // We deliberately keep this lightweight; the production hookup point is here.
  console.log("[booking] new trial request", {
    ...data,
    receivedAt: new Date().toISOString(),
  });

  await new Promise((r) => setTimeout(r, 400));

  return { ok: true, id: `bk_${Date.now()}` };
}
