"use client";

import { useConsent } from "../../lib/consent/ConsentContext";
import CookieBanner from "./CookieBanner";
import CookiePreferencesPanel from "./CookiePreferencesPanel";

export default function CookieConsentRoot() {
  const { bannerVisible, panelOpen } = useConsent();

  return (
    <>
      {bannerVisible && !panelOpen && <CookieBanner />}
      {panelOpen && <CookiePreferencesPanel />}
    </>
  );
}
