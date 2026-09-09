"use client";

import { useState } from "react";
import { DIAGNOSIS_EVENTS, track } from "./data/analytics";
import styles from "./DiagnosisLeadForm.module.css";

const EMPTY_FORM = { name: "", company: "", email: "", phone: "", accepted: false };

export default function DiagnosisLeadForm({ mode = "review" }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.company.trim() || !form.email.trim() || !form.accepted) {
      setError("Completa los campos obligatorios y acepta la política de privacidad.");
      return;
    }

    setError("");
    // No existe todavía integración de envío (API / CRM / email). No se
    // simula una confirmación de envío: los datos quedan en este estado
    // hasta que se conecte un backend real.
    track(DIAGNOSIS_EVENTS.LEAD_SUBMITTED, { hasPhone: Boolean(form.phone) });
    setSubmitted(true);
  }

  return (
    <div className={styles.wrap}>
      <p className="eyebrow">Siguiente paso</p>
      <h2 className={styles.title}>¿Quieres que revisemos este proceso contigo?</h2>
      <p className={styles.text}>
        {mode === "email"
          ? "Déjanos tus datos y te enviaremos este análisis por email."
          : "Podemos profundizar en el proceso, validar estas oportunidades y determinar qué siguiente paso tiene sentido."}
      </p>

      <form className={styles.grid} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="lead-name">Nombre *</label>
          <input
            id="lead-name"
            type="text"
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            disabled={submitted}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="lead-company">Empresa *</label>
          <input
            id="lead-company"
            type="text"
            required
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
            disabled={submitted}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="lead-email">Email profesional *</label>
          <input
            id="lead-email"
            type="email"
            required
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            disabled={submitted}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="lead-phone">Teléfono (opcional)</label>
          <input
            id="lead-phone"
            type="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            disabled={submitted}
          />
        </div>

        <label className={styles.privacy}>
          <input
            type="checkbox"
            checked={form.accepted}
            onChange={(event) => update("accepted", event.target.checked)}
            disabled={submitted}
            required
          />
          He leído y acepto la Política de Privacidad.
        </label>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        {!submitted && (
          <div className={styles.actions}>
            <button type="submit" className="btn btnPrimary">
              Revisar mi proceso con Docusia →
            </button>
          </div>
        )}

        {submitted && (
          <p className={styles.pendingNote} aria-live="polite">
            Hemos guardado tus datos en este formulario. El envío automático
            (API, CRM o email) todavía no está conectado — es el siguiente
            paso de integración pendiente. Mientras tanto, contacta con
            Docusia directamente para continuar.
          </p>
        )}
      </form>
    </div>
  );
}
