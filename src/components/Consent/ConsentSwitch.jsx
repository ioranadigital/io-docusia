"use client";

import styles from "./ConsentSwitch.module.css";

export default function ConsentSwitch({ id, checked, disabled, onChange, label }) {
  return (
    <label htmlFor={id} className={`${styles.switch} ${disabled ? styles.switchDisabled : ""}`}>
      <span className="visuallyHidden">{label}</span>
      <input
        id={id}
        type="checkbox"
        role="switch"
        aria-checked={checked}
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        className={styles.input}
      />
      <span
        aria-hidden="true"
        className={styles.track}
        data-checked={checked ? "true" : undefined}
      >
        <span className={styles.thumb} />
      </span>
    </label>
  );
}
