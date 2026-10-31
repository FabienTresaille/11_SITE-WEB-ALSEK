import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

/**
 * Favicon strictement typographique (AGENTS.md §1 : « alsek » en minuscules, aucun symbole abstrait).
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0F29",
          borderRadius: 14,
          border: "2px solid rgba(30, 58, 255, 0.75)",
          fontFamily: "sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 21,
            fontWeight: 900,
            letterSpacing: "-0.06em",
            color: "#FFFFFF",
            lineHeight: 1,
          }}
        >
          alsek
        </span>
        <div
          style={{
            marginTop: 4,
            width: 34,
            height: 3,
            borderRadius: 99,
            backgroundColor: "#00E676",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
