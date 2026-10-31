import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

/**
 * Apple Touch Icon strictement typographique (AGENTS.md §1).
 */
export default function AppleIcon() {
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
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(30, 58, 255, 0.45) 0%, rgba(11, 15, 41, 0) 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 54,
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
            marginTop: 8,
            width: 96,
            height: 5,
            borderRadius: 99,
            backgroundColor: "#00E676",
          }}
        />
        <span
          style={{
            marginTop: 10,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.24em",
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          MARKETING DIGITAL
        </span>
      </div>
    ),
    { ...size }
  );
}
