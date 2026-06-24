/**
 * Branded HTML (+ plain-text fallback) for transactional emails.
 * Built with table layout and inline styles for broad email-client support.
 */

const C = {
  ink: "#1F2A37",
  ink70: "#3A4756",
  ink50: "#6B7785",
  cream: "#FBF4E3",
  cream50: "#FFFCF4",
  line: "#F4E9CE",
  sun: "#FFD23F",
  coral: "#F47A4F",
  green: "#25D366",
};

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "2026-06-26" → "26 Jun 2026"; leaves anything non-ISO untouched. */
function prettyDate(s: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s.trim());
  if (!m) return s;
  const d = new Date(+m[1], +m[2] - 1, +m[3]);
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

/** Best-effort wa.me link from a local/international number (assumes PK if it starts with 0). */
function waLink(phone: string): string | null {
  let d = phone.replace(/\D/g, "");
  if (!d) return null;
  if (d.startsWith("0")) d = "92" + d.slice(1);
  else if (d.length <= 10) d = "92" + d;
  return `https://wa.me/${d}`;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export interface TrialRequestData {
  name: string;
  age: string;
  date: string;
  phone: string;
  package?: string;
  notes?: string;
  source?: string;
}

export interface BuiltEmail {
  subject: string;
  text: string;
  html: string;
}

const SOURCE_LABELS: Record<string, string> = {
  "contact-page": "Contact page",
  "home-mini": "Home quick form",
};

export function trialRequestEmail(data: TrialRequestData, brand = "Lighthouse Daycare & Montessori"): BuiltEmail {
  const date = prettyDate(data.date);
  const received = new Date().toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
  const wa = waLink(data.phone);
  const sourceLabel = data.source ? SOURCE_LABELS[data.source] ?? data.source : "";

  // --- plain-text fallback ---
  const text = [
    `New trial request from ${data.name}`,
    ``,
    `Child's age:    ${data.age}`,
    `Preferred date: ${date}`,
    `WhatsApp:       ${data.phone}`,
    data.package ? `Package:        ${data.package}` : ``,
    data.notes ? `Notes:          ${data.notes}` : ``,
    sourceLabel ? `Source:         ${sourceLabel}` : ``,
    ``,
    wa ? `Reply on WhatsApp: ${wa}` : ``,
    `Received: ${received}`,
  ].filter(Boolean).join("\n");

  // --- field rows ---
  const rows: Array<[string, string]> = [
    ["Parent", data.name],
    ["Child's age", data.age],
    ["Preferred date", date],
    ["WhatsApp", data.phone],
  ];
  if (data.package) rows.push(["Package", data.package]);
  if (data.notes) rows.push(["Notes", data.notes]);
  if (sourceLabel) rows.push(["Source", sourceLabel]);

  const rowsHtml = rows
    .map(
      ([label, value], i) => `
        <tr>
          <td style="padding:13px 0;${i ? `border-top:1px solid ${C.line};` : ""}width:140px;vertical-align:top;font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:${C.ink50};">${esc(label)}</td>
          <td style="padding:13px 0;${i ? `border-top:1px solid ${C.line};` : ""}vertical-align:top;font-size:15px;font-weight:600;color:${C.ink};">${esc(value)}</td>
        </tr>`
    )
    .join("");

  const ctaHtml = wa
    ? `
      <tr><td style="padding-top:28px;">
        <a href="${wa}" style="display:inline-block;background:${C.green};color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;line-height:1;padding:16px 34px;border-radius:999px;white-space:nowrap;">💬&nbsp;&nbsp;Reply on WhatsApp</a>
      </td></tr>`
    : "";

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:${C.cream};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">New free-trial request from ${esc(data.name)} — preferred ${esc(date)}.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.cream};padding:28px 16px;">
      <tr><td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border:1px solid ${C.line};border-radius:18px;overflow:hidden;">
          <!-- header -->
          <tr><td style="background:${C.ink};padding:26px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:middle;">
                  <div style="width:44px;height:44px;border-radius:12px;background:${C.cream50};text-align:center;line-height:44px;font-size:24px;">🛟</div>
                </td>
                <td style="vertical-align:middle;padding-left:12px;">
                  <div style="color:#ffffff;font-weight:700;font-size:16px;letter-spacing:.02em;">${esc(brand)}</div>
                  <div style="color:rgba(255,255,255,.6);font-size:11px;text-transform:uppercase;letter-spacing:.14em;margin-top:3px;">New trial request</div>
                </td>
              </tr>
            </table>
          </td></tr>
          <!-- accent bar -->
          <tr><td style="height:4px;background:${C.sun};font-size:0;line-height:0;">&nbsp;</td></tr>
          <!-- body -->
          <tr><td style="padding:30px 32px 34px;">
            <h1 style="margin:0;font-size:22px;color:${C.ink};font-weight:800;">You&apos;ve got a new visit request 🎉</h1>
            <p style="margin:8px 0 0;font-size:15px;line-height:1.55;color:${C.ink70};">
              <strong style="color:${C.ink};">${esc(data.name)}</strong> would like to book a free trial visit. Here are the details:
            </p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
              ${rowsHtml}
              ${ctaHtml}
            </table>
          </td></tr>
          <!-- footer -->
          <tr><td style="padding:18px 32px 26px;border-top:1px solid ${C.line};">
            <div style="font-size:12px;color:${C.ink50};">Received ${received} · sent automatically by your ${esc(brand)} website.</div>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  return {
    subject: `🔔 New trial request — ${data.name}${date ? ` (${date})` : ""}`,
    text,
    html,
  };
}
