"use client";

import { useState } from "react";
import styles from "./DiagnosisQuestion.module.css";

function isQuestionValid(question, answer) {
  if (question.optional) return true;
  if (question.kind === "single") return Boolean(answer);
  if (question.kind === "multi") return Array.isArray(answer) && answer.length > 0;
  return true;
}

export default function DiagnosisQuestion({
  question,
  answer,
  otherText,
  onAnswer,
  onOtherText,
  onBack,
  onContinue,
  canGoBack,
  continueLabel = "Continuar",
}) {
  const { kind, question: title, helper, options, maxSelect } = question;
  const valid = isQuestionValid(question, answer);
  const [attemptedInvalid, setAttemptedInvalid] = useState(false);
  const error = attemptedInvalid && !valid
    ? kind === "single"
      ? "Selecciona una opción para continuar."
      : "Selecciona al menos una opción para continuar."
    : "";
  const selectedValues = kind === "multi" ? answer || [] : [];
  const otherOption = options?.find((option) => option.other);
  const showOtherInput = Boolean(
    otherOption &&
      (kind === "single" ? answer === otherOption.value : selectedValues.includes(otherOption.value))
  );

  function handleSingleSelect(value) {
    onAnswer(question.id, value);
  }

  function handleMultiToggle(value) {
    const current = selectedValues;
    const isSelected = current.includes(value);
    if (isSelected) {
      onAnswer(question.id, current.filter((item) => item !== value));
      return;
    }
    if (maxSelect && current.length >= maxSelect) return;
    onAnswer(question.id, [...current, value]);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && valid && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      onContinue();
    }
  }

  function handleContinueClick() {
    if (!valid) {
      setAttemptedInvalid(true);
      return;
    }
    onContinue();
  }

  return (
    <div onKeyDown={handleKeyDown}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{title}</legend>
        {helper && <p className={styles.helper}>{helper}</p>}

        {kind !== "textarea" && (
          <div className={styles.options} role={kind === "single" ? "radiogroup" : undefined}>
            {options.map((option) => {
              const isSelected =
                kind === "single" ? answer === option.value : selectedValues.includes(option.value);
              const isDisabled =
                kind === "multi" &&
                !isSelected &&
                Boolean(maxSelect) &&
                selectedValues.length >= maxSelect;

              return (
                <label
                  key={option.value}
                  className={`${styles.option} ${isSelected ? styles.selected : ""} ${
                    isDisabled ? styles.optionDisabled : ""
                  }`}
                >
                  <input
                    type={kind === "single" ? "radio" : "checkbox"}
                    name={question.id}
                    value={option.value}
                    checked={isSelected}
                    disabled={isDisabled}
                    onChange={() =>
                      kind === "single"
                        ? handleSingleSelect(option.value)
                        : handleMultiToggle(option.value)
                    }
                  />
                  <span
                    className={`${styles.optionMark} ${kind === "single" ? styles.circle : styles.square}`}
                    aria-hidden="true"
                  >
                    {isSelected ? "✓" : ""}
                  </span>
                  {option.label}
                </label>
              );
            })}
          </div>
        )}

        {kind === "multi" && maxSelect && (
          <p className={styles.selectionCount} aria-live="polite">
            {selectedValues.length} de {maxSelect} seleccionadas
          </p>
        )}

        {showOtherInput && (
          <input
            type="text"
            className={styles.otherInput}
            placeholder="Cuéntanos brevemente..."
            value={otherText || ""}
            onChange={(event) => onOtherText(question.id, event.target.value)}
            aria-label={`Detalle para "${otherOption.label}"`}
          />
        )}

        {kind === "textarea" && (
          <>
            <label className={styles.textareaLabel} htmlFor={`diagnosis-${question.id}`}>
              {question.optional ? "Opcional" : "Respuesta"}
            </label>
            <textarea
              id={`diagnosis-${question.id}`}
              className={styles.textarea}
              placeholder={question.placeholder}
              maxLength={question.maxLength}
              value={answer || ""}
              onChange={(event) => onAnswer(question.id, event.target.value)}
            />
            <div className={styles.textareaFooter}>
              <p className={styles.privacyNote}>
                No incluyas contraseñas, datos bancarios ni información confidencial o sensible.
              </p>
              <span className={styles.charCount}>
                {(answer || "").length} / {question.maxLength}
              </span>
            </div>
          </>
        )}
      </fieldset>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.nav}>
        {canGoBack ? (
          <button type="button" className={styles.backButton} onClick={onBack}>
            ← Atrás
          </button>
        ) : (
          <span />
        )}
        <div className={styles.navRight}>
          <button type="button" className={`btn btnPrimary ${styles.btn}`} onClick={handleContinueClick}>
            {continueLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
