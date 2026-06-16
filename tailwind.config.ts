import type { Config } from "tailwindcss";

/**
 * Rally Exterior Solutions design system.
 *
 * Brand palette is intentionally premium + trustworthy:
 *  - "ink"   : deep navy/charcoal (authority, cleanliness, water)
 *  - "gold"  : warm amber (lighting, warmth, premium feel)
 *  - "sky"   : clean accent blue (wash / clarity)
 *
 * Colors are exposed as CSS variables in globals.css so they can be
 * re-themed without touching component code.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B1A2B",
          50: "#F2F5F9",
          100: "#E2E8F0",
          200: "#C2CEDC",
          300: "#9DB0C6",
          400: "#5E7794",
          500: "#37506E",
          600: "#243A56",
          700: "#16273D",
          800: "#0F1D30",
          900: "#0B1A2B",
        },
        gold: {
          DEFAULT: "#E0A23B",
          50: "#FBF4E6",
          100: "#F7E6C5",
          200: "#F0CE8C",
          300: "#E9B85C",
          400: "#E0A23B",
          500: "#C9892A",
          600: "#A56C1F",
          700: "#7E521A",
        },
        sky: {
          DEFAULT: "#2F8FD6",
          50: "#EAF4FB",
          100: "#CFE6F6",
          400: "#2F8FD6",
          500: "#1F75B6",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(11, 26, 43, 0.18)",
        cardHover: "0 22px 48px -16px rgba(11, 26, 43, 0.28)",
        cta: "0 14px 30px -10px rgba(224, 162, 59, 0.5)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
