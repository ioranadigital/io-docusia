import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_MOTIVES } from "../../../components/Contact/data/motives";

const CONTACT_EMAIL = process.env.DOCUSIA_CONTACT_EMAIL || "info@docusia.es";
const ADMIN_EMAILS = (process.env.DOCUSIA_ADMIN_EMAILS || "").split(",").map((e) => e.trim()).filter(Boolean);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOTIVE_LABELS = new Map(CONTACT_MOTIVES.map((m) => [m.value, m.label]));

const MAX_LENGTHS = { name: 100, email: 254, company: 150, phone: 40, motive: 60, message: 600, tools: 300 };

// Rate limiting en memoria (proceso único en el contenedor de producción).
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 5;
const attempts = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  for (const [key, entry] of attempts) {
    if (now - entry.first > RATE_WINDOW_MS) attempts.delete(key);
  }
  const entry = attempts.get(ip);
  if (!entry) {
    attempts.set(ip, { count: 1, first: now });
    return false;
  }
  if (entry.count >= RATE_MAX) return true;
  entry.count += 1;
  return false;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function singleLine(value) {
  return String(value).replace(/[\r\n\t]+/g, " ").trim();
}

function cleanPayload(raw) {
  const data = {};
  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    const value = raw?.[field];
    data[field] = typeof value === "string" ? value.trim().slice(0, max) : "";
  }
  data.website = typeof raw?.website === "string" ? raw.website : "";
  return data;
}

function validatePayload(data) {
  const errors = [];
  if (!data.name) errors.push("name");
  if (!data.email || !EMAIL_PATTERN.test(data.email)) errors.push("email");
  if (!data.company) errors.push("company");
  if (!MOTIVE_LABELS.has(data.motive)) errors.push("motive");
  if (!data.message) errors.push("message");
  return errors;
}

function generateEmailHtml(data) {
  const fields = [
    { label: "Nombre", value: data.name },
    { label: "Email", value: data.email },
    { label: "Empresa", value: data.company },
    { label: "Teléfono", value: data.phone || "No proporcionado" },
    { label: "Motivo de contacto", value: MOTIVE_LABELS.get(data.motive) },
    { label: "Herramientas actuales", value: data.tools || "No especificadas" },
  ];

  const fieldsHtml = fields
    .map(
      (f) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; font-weight: 600; color: #333;">
        ${escapeHtml(f.label)}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; color: #666;">
        ${escapeHtml(f.value)}
      </td>
    </tr>
  `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Nueva consulta de contacto</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2c3e50; margin-top: 0;">Nueva consulta de contacto</h2>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              ${fieldsHtml}
            </table>
          </div>

          <div style="background: #f0f4f8; padding: 20px; border-left: 4px solid #3b82f6; border-radius: 4px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c3e50;">Mensaje</h3>
            <p style="white-space: pre-wrap; color: #555;">${escapeHtml(data.message)}</p>
          </div>

          <div style="color: #888; font-size: 12px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p>Este email fue enviado desde el formulario de contacto de Docusia.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function POST(req) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ok: false, reason: "email_not_configured" }, { status: 503 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
    }

    const raw = await req.json().catch(() => ({}));
    const data = cleanPayload(raw);

    if (data.website) {
      // Honeypot relleno: se simula éxito sin enviar nada.
      return NextResponse.json({ ok: true });
    }

    const validationErrors = validatePayload(data);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { ok: false, reason: "invalid_data", fields: validationErrors },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);
    const response = await resend.emails.send({
      from: `Docusia Contacto <${CONTACT_EMAIL}>`,
      to: ADMIN_EMAILS.length > 0 ? ADMIN_EMAILS : CONTACT_EMAIL,
      replyTo: data.email,
      subject: singleLine(`Nueva consulta: ${MOTIVE_LABELS.get(data.motive)} — ${data.name}`).slice(0, 200),
      html: generateEmailHtml(data),
    });

    if (response.error) {
      console.error("Resend error:", response.error);
      return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ ok: false, reason: "server_error" }, { status: 500 });
  }
}
