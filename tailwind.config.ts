import type { Config } from "tailwindcss";

/**
 * Rally Exterior Solutions design system — matches the brand identity.
 *
 * Brand palette:
 *  - "ink"   : deep navy   #173D59 (authority, trust, water)   → token `ink`
 *  - "gold"  : coral        #EA6F61 (brand pop / CTAs)          → token `gold`
 *  - "sky"   : teal         #39ABA8 (secondary accent / waves)  → token `sky`
 *  - "cream" : warm sand    #FAF0D7 (soft, premium backgrounds)
 *
 * NOTE: the token name `gold` is kept for code stability, but its VALUE is the
 * brand coral — so changing the palette never requires touching components.
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
        // Deep navy base — backgrounds (800/900) + dark body text (500–700)
        ink: {
          DEFAULT: "#173D59",
          50: "#EEF3F7",
          100: "#D9E3EC",
          200: "#B6C8D7",
          300: "#88A2B6",
          400: "#557188",
          500: "#34546C",
          600: "#244761",
          700: "#1C415C",
          800: "#173D59",
          900: "#112F45",
        },
        // Brand coral — primary accent + CTAs
        gold: {
          DEFAULT: "#EA6F61",
          50: "#FDF1EF",
          100: "#FBDDD8",
          200: "#F6BCB2",
          300: "#F0978A",
          400: "#EA6F61",
          500: "#DC5749",
          600: "#C23F32",
          700: "#9B3023",
        },
        // Brand teal — secondary accent
        sky: {
          DEFAULT: "#39ABA8",
          50: "#E8F5F4",
          100: "#C7E8E6",
          200: "#9BD6D3",
          300: "#6CC2BE",
          400: "#39ABA8",
          500: "#2C8A88",
          600: "#20706E",
        },
        // Warm sand
        cream: {
          DEFAULT: "#FAF0D7",
          50: "#FCF7E9",
          100: "#F7E9C9",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Rockwell", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(16, 44, 65, 0.18)",
        cardHover: "0 22px 48px -16px rgba(16, 44, 65, 0.28)",
        cta: "0 14px 30px -10px rgba(234, 111, 97, 0.45)",
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
