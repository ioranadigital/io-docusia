import { NextResponse } from "next/server";
import { Resend } from "resend";

const createResend = () => {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
};

const CONTACT_EMAIL = process.env.DOCUSIA_CONTACT_EMAIL || "info@docusia.es";
const ADMIN_EMAILS = (process.env.DOCUSIA_ADMIN_EMAILS || "").split(",").filter(Boolean);

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function validatePayload(data) {
  const errors = [];
  if (!data.name?.trim()) errors.push("name");
  if (!data.email?.trim() || !validateEmail(data.email)) errors.push("email");
  if (!data.company?.trim()) errors.push("company");
  if (!data.motive) errors.push("motive");
  if (!data.message?.trim()) errors.push("message");
  return errors;
}

function generateEmailHtml(data) {
  const fields = [
    { label: "Nombre", value: data.name },
    { label: "Email", value: data.email },
    { label: "Empresa", value: data.company },
    { label: "Teléfono", value: data.phone || "No proporcionado" },
    { label: "Motivo de contacto", value: data.motive },
    { label: "Herramientas actuales", value: data.tools || "No especificadas" },
  ];

  const fieldsHtml = fields
    .map(
      (f) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; font-weight: 600; color: #333;">
        ${f.label}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; color: #666;">
        ${f.value}
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
            <p style="white-space: pre-wrap; color: #555;">
              ${data.message}
            </p>
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
    const resend = createResend();
    if (!resend) {
      return NextResponse.json(
        { ok: false, reason: "email_not_configured" },
        { status: 503 }
      );
    }

    const data = await req.json().catch(() => ({}));

    const validationErrors = validatePayload(data);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { ok: false, reason: "invalid_data", fields: validationErrors },
        { status: 400 }
      );
    }

    const adminEmail = ADMIN_EMAILS[0] || CONTACT_EMAIL;
    const subject = `Nueva consulta: ${data.motive} — ${data.name}`;
    const html = generateEmailHtml(data);

    const response = await resend.emails.send({
      from: `Docusia Contacto <${CONTACT_EMAIL}>`,
      to: adminEmail,
      replyTo: data.email,
      subject,
      html,
    });

    if (response.error) {
      console.error("Resend error:", response.error);
      return NextResponse.json(
        { ok: false, reason: "send_failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { ok: false, reason: "server_error" },
      { status: 500 }
    );
  }
}
