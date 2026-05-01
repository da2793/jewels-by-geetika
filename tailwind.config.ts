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
          100: "#FAFAFA",
          200: "#F5F5F5",
          300: "#EBEBEB",
          400: "#D6D6D6",
          500: "#C2C2C2",
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
        pearl: {
          50: "#FFFFFF",
          100: "#FEFEFE",
          200: "#F8F7F5",
          300: "#F0EDE8",
          400: "#E8E4DC",
          500: "#D8D2C8",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["Jost", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "pearl-sm": "0 1px 8px rgba(0,0,0,0.06)",
        "pearl-md": "0 4px 20px rgba(0,0,0,0.07)",
        "pearl-lg": "0 12px 40px rgba(0,0,0,0.08)",
        "gold-glow": "0 0 0 1px rgba(200,168,75,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
