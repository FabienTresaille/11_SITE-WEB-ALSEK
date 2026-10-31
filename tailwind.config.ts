import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0B0F29",
          blue: "#1E3AFF",
          neon: "#00E676",
          light: "#F4F5F8",
          coral: "#FF3B5C",
          sky: "#00A3FF",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(3deg)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "float-slow": "floatSlow 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
