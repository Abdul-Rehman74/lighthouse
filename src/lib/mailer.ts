import nodemailer from "nodemailer";

/**
 * SMTP mailer via Nodemailer.
 *
 * Configure with env vars (see .env.example):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE
 *   MAIL_FROM   — the "from" address shown to recipients
 *   MAIL_TO     — where booking notifications are delivered (the daycare inbox)
 *
 * If SMTP isn't configured we no-op (and log) so the booking flow still
 * succeeds — email is a nice-to-have notification, not a hard dependency.
 */

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587/STARTTLS
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return transporter;
}

export interface MailInput {
  subject: string;
  text: string;
  html?: string;
  to?: string | string[];
  replyTo?: string;
}

/** Returns true if the mail was handed off to SMTP, false if email is not configured. */
export async function sendMail({ subject, text, html, to, replyTo }: MailInput): Promise<boolean> {
  const tx = getTransporter();
  const recipients = Array.isArray(to) ? to.filter(Boolean) : to ? [to] : [];
  const recipient = recipients.length ? recipients : process.env.MAIL_TO;
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;

  if (!tx || !recipient || (Array.isArray(recipient) && !recipient.length) || !from) {
    console.warn("[mailer] SMTP not configured / no recipients — skipping email:", subject);
    return false;
  }

  await tx.sendMail({ from, to: recipient, subject, text, html, replyTo });
  return true;
}
