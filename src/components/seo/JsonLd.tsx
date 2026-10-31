import React from "react";
import { BRAND_CONTENT } from "@/data/content";

/**
 * Données structurées Schema.org (ProfessionalService localisé + FAQPage) injectées côté serveur.
 */
export default function JsonLd() {
  const activeSocialUrls = BRAND_CONTENT.identity.socialLinks
    .map((s) => s.href.trim())
    .filter(Boolean);

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://www.alsek.fr/#agency",
        name: BRAND_CONTENT.identity.brand,
        alternateName: `${BRAND_CONTENT.identity.brand} — ${BRAND_CONTENT.identity.baseline}`,
        url: "https://www.alsek.fr",
        telephone: "+33614308801",
        email: BRAND_CONTENT.identity.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: BRAND_CONTENT.identity.city,
          postalCode: BRAND_CONTENT.identity.postalCode,
          addressRegion: "Auvergne-Rhône-Alpes",
          addressCountry: "FR",
        },
        areaServed: [
          "Villefranche-sur-Saône",
          "Beaujolais",
          "Lyon",
          "Rhône",
          "Ain",
        ],
        description: BRAND_CONTENT.hero.subtitle,
        ...(activeSocialUrls.length > 0 ? { sameAs: activeSocialUrls } : {}),
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.alsek.fr/#faq-schema",
        mainEntity: BRAND_CONTENT.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
}
