"use client";

import { useConsent } from "../../lib/consent/ConsentContext";

export default function CookiePreferencesTrigger({ className }) {
  const { openPreferences } = useConsent();

  return (
    <button type="button" onClick={openPreferences} className={className}>
      Preferencias de cookies
    </button>
  );
}
