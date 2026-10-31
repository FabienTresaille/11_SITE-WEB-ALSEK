"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { readStoredConsent, useConsent } from "@/context/ConsentContext";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

function isValidGaId(id: string | undefined): id is string {
  if (!id) return false;
  const trimmed = id.trim();
  return Boolean(trimmed) && trimmed !== "G-XXXXXXXXXX";
}

function isValidMetaPixelId(id: string | undefined): id is string {
  if (!id) return false;
  const trimmed = id.trim();
  return Boolean(trimmed) && trimmed !== "123456789012345";
}

/**
 * Déclenche les événements de conversion Lead (Meta Pixel + GA4)
 * uniquement si l'utilisateur a explicitement consenti à la catégorie correspondante.
 */
export function trackLeadEvent(offerName: string): void {
  if (typeof window === "undefined") return;
  const currentConsent = readStoredConsent();
  if (!currentConsent) return;

  if (currentConsent.marketing && typeof window.fbq === "function") {
    window.fbq("track", "Lead", { content_name: offerName });
  }

  if (currentConsent.analytics && typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", { offer: offerName });
  }
}

/**
 * Injection conditionnelle stricte (CNIL) :
 * Aucun script tiers n'est injecté dans le DOM avant le consentement explicite.
 */
export default function TrackingScripts() {
  const { consent, hasHydrated } = useConsent();
  const pathname = usePathname();

  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();

  const shouldLoadGa =
    hasHydrated && Boolean(consent?.analytics) && isValidGaId(gaId);
  const shouldLoadMeta =
    hasHydrated && Boolean(consent?.marketing) && isValidMetaPixelId(metaPixelId);

  // Suivi des navigations internes App Router une fois les scripts consentis
  useEffect(() => {
    if (!pathname) return;
    if (shouldLoadGa && typeof window.gtag === "function" && gaId) {
      window.gtag("config", gaId, { page_path: pathname, anonymize_ip: true });
    }
    if (shouldLoadMeta && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname, shouldLoadGa, shouldLoadMeta, gaId]);

  if (!shouldLoadGa && !shouldLoadMeta) {
    return null;
  }

  return (
    <>
      {shouldLoadGa && gaId && (
        <>
          <Script
            id="alsek-ga4-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
            strategy="afterInteractive"
          />
          <Script id="alsek-ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaId.replace(/'/g, "")}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {shouldLoadMeta && metaPixelId && (
        <Script id="alsek-meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId.replace(/'/g, "")}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
