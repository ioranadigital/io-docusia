"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "../icons";
import { CONTACT_MOTIVES } from "./data/motives";
import { CONTACT_EVENTS, track } from "./data/analytics";
import { submitContact } from "./data/contactApi";
import styles from "./ContactForm.module.css";

const EMPTY_FORM = {
  name: "",
  email: "",
  company: "",
  phone: "",
  motive: "",
  message: "",
  tools: "",
  accepted: false,
  website: "",
};

const MESSAGE_MAX_LENGTH = 600;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Introduce tu nombre.";
  if (!form.email.trim() || !EMAIL_PATTERN.test(form.email)) errors.email = "Introduce un email válido.";
  if (!form.company.trim()) errors.company = "Introduce el nombre de tu empresa.";
  if (!form.motive) errors.motive = "Selecciona un motivo.";
  if (!form.message.trim()) errors.message = "Cuéntanos brevemente en qué podemos ayudarte.";
  if (!form.accepted) errors.accepted = "Debes aceptar la Política de Privacidad.";
  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const startedRef = useRef(false);

  function update(field, value) {
    if (!startedRef.current) {
      startedRef.current = true;
      track(CONTACT_EVENTS.STARTED);
    }
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (form.website) {
      // Honeypot relleno: tráfico automatizado. Se ignora en silencio.
      return;
    }

    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("submitting");
    const result = await submitContact({
      name: form.name,
      email: form.email,
      company: form.company,
      phone: form.phone,
      motive: form.motive,
      message: form.message,
      tools: form.tools,
    });

    if (result.ok) {
      track(CONTACT_EVENTS.SUBMITTED, { motive: form.motive });
      setStatus("success");
      return;
    }

    if (result.reason === "not_configured") {
      track(CONTACT_EVENTS.SUBMITTED, { motive: form.motive });
      setStatus("pending");
      return;
    }

    track(CONTACT_EVENTS.ERROR);
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div className={styles.wrap}>
        <div className={styles.success} aria-live="polite">
          <h2 className={styles.successTitle}>Consulta enviada.</h2>
          <p className={styles.successText}>Hemos recibido tu mensaje.</p>
          <Link href="/" className={styles.successLink}>
            Volver a Docusia
            <ArrowRightIcon size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>Cuéntanos qué necesitas.</h2>

      <form className={styles.grid} onSubmit={handleSubmit} noValidate>
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="contact-website">Deja este campo vacío</label>
          <input
            id="contact-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))}
          />
        </div>

        <div className={`${styles.field} ${errors.name ? styles.fieldInvalid : ""}`}>
          <label htmlFor="contact-name">Nombre y apellidos *</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className={styles.fieldError} role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className={`${styles.field} ${errors.email ? styles.fieldInvalid : ""}`}>
          <label htmlFor="contact-email">Email profesional *</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className={styles.fieldError} role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className={`${styles.field} ${errors.company ? styles.fieldInvalid : ""}`}>
          <label htmlFor="contact-company">Empresa *</label>
          <input
            id="contact-company"
            type="text"
            name="company"
            autoComplete="organization"
            required
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "contact-company-error" : undefined}
          />
          {errors.company && (
            <p id="contact-company-error" className={styles.fieldError} role="alert">
              {errors.company}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-phone">
            Teléfono <span className={styles.optionalTag}>(opcional)</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
          />
        </div>

        <div className={`${styles.field} ${styles.fieldWide} ${errors.motive ? styles.fieldInvalid : ""}`}>
          <label htmlFor="contact-motive">Motivo de contacto *</label>
          <select
            id="contact-motive"
            name="motive"
            required
            value={form.motive}
            onChange={(event) => update("motive", event.target.value)}
            aria-invalid={Boolean(errors.motive)}
            aria-describedby={errors.motive ? "contact-motive-error" : undefined}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {CONTACT_MOTIVES.map((motive) => (
              <option key={motive.value} value={motive.value}>
                {motive.label}
              </option>
            ))}
          </select>
          {errors.motive && (
            <p id="contact-motive-error" className={styles.fieldError} role="alert">
              {errors.motive}
            </p>
          )}
        </div>

        <div className={`${styles.field} ${styles.fieldWide} ${errors.message ? styles.fieldInvalid : ""}`}>
          <label htmlFor="contact-message">¿En qué podemos ayudarte? *</label>
          <textarea
            id="contact-message"
            name="message"
            required
            maxLength={MESSAGE_MAX_LENGTH}
            placeholder="Cuéntanos brevemente qué quieres mejorar, qué problema estás encontrando o qué proyecto tienes en mente."
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={["contact-message-helper", errors.message ? "contact-message-error" : null]
              .filter(Boolean)
              .join(" ")}
          />
          <p id="contact-message-helper" className={styles.helper}>
            No necesitas utilizar términos técnicos.
          </p>
          {errors.message && (
            <p id="contact-message-error" className={styles.fieldError} role="alert">
              {errors.message}
            </p>
          )}
          <div className={styles.textareaFooter}>
            <p className={styles.privacyNote}>
              Por seguridad, no incluyas contraseñas, datos bancarios ni información confidencial o sensible.
            </p>
            <span className={styles.charCount}>
              {form.message.length} / {MESSAGE_MAX_LENGTH}
            </span>
          </div>
        </div>

        <div className={`${styles.field} ${styles.fieldWide}`}>
          <label htmlFor="contact-tools">
            ¿Qué herramientas utilizáis actualmente? <span className={styles.optionalTag}>(opcional)</span>
          </label>
          <input
            id="contact-tools"
            type="text"
            name="tools"
            placeholder="Por ejemplo: Google Workspace, Microsoft 365, ERP, CRM, software contable..."
            value={form.tools}
            onChange={(event) => update("tools", event.target.value)}
          />
        </div>

        <label className={styles.privacy} htmlFor="contact-privacy">
          <input
            id="contact-privacy"
            type="checkbox"
            checked={form.accepted}
            onChange={(event) => update("accepted", event.target.checked)}
            aria-invalid={Boolean(errors.accepted)}
            aria-describedby={errors.accepted ? "contact-privacy-error" : undefined}
          />
          <span>
            He leído y acepto la Política de Privacidad.
            {errors.accepted && (
              <>
                <br />
                <span id="contact-privacy-error" className={styles.fieldError} role="alert">
                  {errors.accepted}
                </span>
              </>
            )}
          </span>
        </label>

        {status === "pending" && (
          <p className={styles.pendingNote} aria-live="polite">
            Hemos validado tu consulta, pero el envío automático todavía no
            está conectado — es el siguiente paso de integración pendiente.
            Mientras tanto, puedes empezar por{" "}
            <Link href="/analizar-mi-proceso">analizar tu proceso</Link>.
          </p>
        )}

        {status === "error" && (
          <p className={styles.formError} role="alert">
            No hemos podido enviar tu consulta. Inténtalo de nuevo.
          </p>
        )}

        <div className={styles.actions}>
          <button type="submit" className="btn btnPrimary" disabled={status === "submitting"}>
            {status === "submitting" ? "Enviando..." : "Enviar consulta"}
            <ArrowRightIcon size={16} />
          </button>
          <p className={styles.submitNote}>
            Revisaremos tu mensaje para entender el contexto antes de responder.
          </p>
        </div>
      </form>
    </div>
  );
}
