import React from "react";
import { BRAND_CONTENT } from "@/data/content";

/**
 * Données structurées Schema.org (ProfessionalService localisé + FAQPage) injectées côté serveur.
 */
export default function JsonLd() {
  const activeSocialUrls = BRAND_CONTENT.identity.socialLinks
    .map((s) => s.href.trim())
    .filter(Boolean);

  const videoItems = BRAND_CONTENT.videoWall.items.filter(
    (item) => item.mediaType === "video" && item.poster
  );

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://www.alsek.fr/#agency",
        name: BRAND_CONTENT.identity.brand,
        alternateName: `${BRAND_CONTENT.identity.brand} — ${BRAND_CONTENT.identity.baseline}`,
        url: "https://www.alsek.fr",
        image: "https://www.alsek.fr/opengraph-image",
        telephone: "+33614308801",
        email: BRAND_CONTENT.identity.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: BRAND_CONTENT.identity.city,
          postalCode: BRAND_CONTENT.identity.postalCode,
          addressRegion: "Auvergne-Rhône-Alpes",
          addressCountry: "FR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 45.9896,
          longitude: 4.7188,
        },
        areaServed: [
          { "@type": "City", name: "Villefranche-sur-Saône" },
          { "@type": "AdministrativeArea", name: "Beaujolais" },
          { "@type": "City", name: "Lyon" },
          { "@type": "AdministrativeArea", name: "Rhône" },
          { "@type": "AdministrativeArea", name: "Ain" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Formules mensuelles de création de contenu réseaux sociaux",
          itemListElement: BRAND_CONTENT.pricing.offers.map((offer) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `Offre ${offer.name} (${offer.volumeHighlight})`,
              description: `${offer.idealFor} Inclus : ${offer.features.join(", ")}.`,
            },
          })),
        },
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
      {
        "@type": "ItemList",
        "@id": "https://www.alsek.fr/#video-showcase",
        name: "Réalisations vidéo 9:16 alsek — Villefranche-sur-Saône & alentours",
        itemListElement: videoItems.map((video, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "VideoObject",
            name: `${video.title} — ${video.client}`,
            description: `${video.categoryLabel} réalisé par alsek pour ${video.client} (${video.aspectInfo}).`,
            thumbnailUrl: `https://www.alsek.fr${video.poster}`,
            contentUrl: `https://www.alsek.fr${video.src}`,
            uploadDate: "2026-10-01T09:00:00+02:00",
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
