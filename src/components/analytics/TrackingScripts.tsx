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
    clarity?: (...args: unknown[]) => void;
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

function isValidClarityId(id: string | undefined): id is string {
  if (!id) return false;
  const trimmed = id.trim();
  return Boolean(trimmed) && trimmed !== "xxxxxxxxxx" && /^[a-z0-9]{6,24}$/i.test(trimmed);
}

/**
 * Déclenche les événements de conversion Lead (Meta Pixel + GA4 + Microsoft Clarity)
 * uniquement si l'utilisateur a explicitement consenti à la catégorie correspondante.
 */
export function trackLeadEvent(offerName: string): void {
  if (typeof window === "undefined") return;
  const currentConsent = readStoredConsent();
  if (!currentConsent) return;

  if (currentConsent.marketing && typeof window.fbq === "function") {
    window.fbq("track", "Lead", { content_name: offerName });
  }

  if (currentConsent.analytics) {
    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", { offer: offerName });
    }
    if (typeof window.clarity === "function") {
      window.clarity("set", "selected_offer", offerName);
      window.clarity("event", "generate_lead");
    }
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
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID?.trim();

  const shouldLoadGa =
    hasHydrated && Boolean(consent?.analytics) && isValidGaId(gaId);
  const shouldLoadClarity =
    hasHydrated && Boolean(consent?.analytics) && isValidClarityId(clarityId);
  const shouldLoadMeta =
    hasHydrated && Boolean(consent?.marketing) && isValidMetaPixelId(metaPixelId);

  // Suivi des navigations internes App Router + synchronisation Consent Mode v2 Clarity
  useEffect(() => {
    if (!pathname) return;
    if (shouldLoadGa && typeof window.gtag === "function" && gaId) {
      window.gtag("config", gaId, { page_path: pathname, anonymize_ip: true });
    }
    if (shouldLoadClarity && typeof window.clarity === "function") {
      window.clarity("consentv2", {
        ad_Storage: consent?.marketing ? "granted" : "denied",
        analytics_Storage: "granted",
      });
      window.clarity("set", "page_path", pathname);
    }
    if (shouldLoadMeta && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname, shouldLoadGa, shouldLoadClarity, shouldLoadMeta, gaId, consent?.marketing]);

  if (!shouldLoadGa && !shouldLoadClarity && !shouldLoadMeta) {
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

      {shouldLoadClarity && clarityId && (
        <Script id="alsek-microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId.replace(/[^a-zA-Z0-9]/g, "")}");
            window.clarity("consent");
            window.clarity("consentv2", {
              ad_Storage: "${consent?.marketing ? "granted" : "denied"}",
              analytics_Storage: "granted"
            });
          `}
        </Script>
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
