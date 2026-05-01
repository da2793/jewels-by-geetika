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
        cream: {
          50: "#FFFFFF",
          100: "#FDFCFA",
          200: "#F9F6F1",
          300: "#F3E9DC",   // Champagne Beige — primary accent bg
          400: "#E8D9C5",
          500: "#D4C4AB",
        },
        gold: {
          50: "#FFFBEE",
          100: "#FFF3CC",
          200: "#FFE999",
          300: "#F5D36A",
          400: "#D4AF37",
          500: "#C8A84B",
          600: "#A8881A",
          700: "#806610",
          800: "#574508",
          900: "#2E2404",
        },
        charcoal: {
          50: "#F7F7F7",
          100: "#E3E3E3",
          200: "#C8C8C8",
          300: "#A0A0A0",
          400: "#787878",
          500: "#585858",
          600: "#3A3A3A",
          700: "#252525",
          800: "#111111",
          900: "#050505",
        },
      },
      fontFamily: {
        display: ["Cinzel", "Georgia", "serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Jost", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "pearl-sm": "0 1px 8px rgba(0,0,0,0.05)",
        "pearl-md": "0 4px 20px rgba(0,0,0,0.06)",
        "pearl-lg": "0 12px 40px rgba(0,0,0,0.07)",
        "gold-glow": "0 0 0 1px rgba(200,168,75,0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
