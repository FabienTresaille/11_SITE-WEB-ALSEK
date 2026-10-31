import { ImageResponse } from "next/og";

export const alt =
  "alsek | MARKETING DIGITAL — 1 Mois de Contenu à Poster Tous les Jours sur Vos Réseaux Sociaux";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 76px",
          backgroundColor: "#0B0F29",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(30, 58, 255, 0.45) 0%, rgba(11, 15, 41, 0) 55%), radial-gradient(circle at 15% 85%, rgba(0, 230, 118, 0.18) 0%, rgba(11, 15, 41, 0) 50%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        {/* En-tête : Logo strictement typographique alsek (AGENTS.md §1) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 56,
                fontWeight: 800,
                letterSpacing: "-0.05em",
                lineHeight: 0.95,
                color: "#FFFFFF",
              }}
            >
              alsek
            </span>
            <span
              style={{
                marginTop: 8,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.28em",
                color: "rgba(255, 255, 255, 0.78)",
              }}
            >
              MARKETING DIGITAL
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 22px",
              borderRadius: 999,
              backgroundColor: "rgba(30, 58, 255, 0.28)",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.16em",
              color: "#00E676",
            }}
          >
            1 TOURNAGE = 30 JOURS
          </div>
        </div>

        {/* Accroche centrale */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            maxWidth: 980,
          }}
        >
          <div style={{ display: "flex" }}>
            <span
              style={{
                backgroundColor: "#00E676",
                color: "#0B0F29",
                padding: "8px 22px",
                borderRadius: 14,
                fontSize: 58,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              1 MOIS DE CONTENU
            </span>
          </div>
          <span
            style={{
              fontSize: 48,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.12,
              color: "#FFFFFF",
            }}
          >
            À POSTER TOUS LES JOURS SUR VOS RÉSEAUX SOCIAUX !
          </span>
        </div>

        {/* Pied de carte */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 24,
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.78)",
            }}
          >
            Photos • Stories • Shorts & Reels 9:16 • Vidéos Scénarisées
          </span>
          <span
            style={{
              backgroundColor: "#1E3AFF",
              color: "#FFFFFF",
              padding: "10px 24px",
              borderRadius: 999,
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "0.12em",
            }}
          >
            WWW.ALSEK.FR
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
