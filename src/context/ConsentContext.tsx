"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const COOKIE_CONSENT_STORAGE_KEY = "alsek_cookie_consent";
/** 180 jours (6 mois) conformément aux recommandations de la CNIL */
const CONSENT_TTL_MS = 180 * 24 * 60 * 60 * 1000;

export interface CookieConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  expiresAt: number;
}

interface ConsentContextValue {
  consent: CookieConsentState | null;
  hasHydrated: boolean;
  isBannerVisible: boolean;
  isPreferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: { analytics: boolean; marketing: boolean }) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined);

export function readStoredConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookieConsentState>;
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean" ||
      typeof parsed.expiresAt !== "number"
    ) {
      window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
      return null;
    }
    if (Date.now() > parsed.expiresAt) {
      window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
      return null;
    }
    return {
      necessary: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      timestamp: typeof parsed.timestamp === "number" ? parsed.timestamp : Date.now(),
      expiresAt: parsed.expiresAt,
    };
  } catch {
    return null;
  }
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsentState | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  useEffect(() => {
    setConsent(readStoredConsent());
    setHasHydrated(true);
  }, []);

  const persistConsent = useCallback((analytics: boolean, marketing: boolean) => {
    const now = Date.now();
    const nextState: CookieConsentState = {
      necessary: true,
      analytics,
      marketing,
      timestamp: now,
      expiresAt: now + CONSENT_TTL_MS,
    };
    try {
      window.localStorage.setItem(
        COOKIE_CONSENT_STORAGE_KEY,
        JSON.stringify(nextState)
      );
    } catch {
      /* stockage indisponible (navigation privée stricte) : état conservé en mémoire */
    }
    setConsent(nextState);
    setIsPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    persistConsent(true, true);
  }, [persistConsent]);

  const rejectAll = useCallback(() => {
    persistConsent(false, false);
  }, [persistConsent]);

  const savePreferences = useCallback(
    (prefs: { analytics: boolean; marketing: boolean }) => {
      persistConsent(prefs.analytics, prefs.marketing);
    },
    [persistConsent]
  );

  const openPreferences = useCallback(() => {
    setIsPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
  }, []);

  const isBannerVisible = hasHydrated && consent === null && !isPreferencesOpen;

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      hasHydrated,
      isBannerVisible,
      isPreferencesOpen,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences,
      closePreferences,
    }),
    [
      consent,
      hasHydrated,
      isBannerVisible,
      isPreferencesOpen,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences,
      closePreferences,
    ]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent doit être utilisé à l'intérieur d'un <ConsentProvider>.");
  }
  return ctx;
}
