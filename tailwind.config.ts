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
          50: "#FFFDF9",
          100: "#FDFBF7",
          200: "#FAF6EE",
          300: "#F5EFE0",
          400: "#EDE5D0",
          500: "#E5DBC2",
        },
        gold: {
          50: "#FFF9E6",
          100: "#FFF0BF",
          200: "#FFE699",
          300: "#FFD966",
          400: "#D4AF37",
          500: "#C9A84C",
          600: "#B8941F",
          700: "#8B7014",
          800: "#5E4B0D",
          900: "#312706",
        },
        charcoal: {
          50: "#F5F5F5",
          100: "#E0E0E0",
          200: "#BDBDBD",
          300: "#9E9E9E",
          400: "#757575",
          500: "#616161",
          600: "#424242",
          700: "#2D2D2D",
          800: "#1A1A1A",
          900: "#0D0D0D",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
