import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sun: {
          50: "#FFF9E5",
          100: "#FFF0B8",
          200: "#FFE27A",
          300: "#FFD23F",
          400: "#F5B800",
          500: "#D99A00",
        },
        sky: {
          50: "#EAF6FF",
          100: "#C9E7FF",
          200: "#92CDF8",
          300: "#5FB3F0",
          400: "#2E8FCB",
          500: "#1A6FA8",
          600: "#0F4F7A",
        },
        coral: {
          200: "#FFC9B6",
          300: "#FF9E7B",
          400: "#F47A4F",
        },
        mint: {
          200: "#C8EBD7",
          300: "#8FD4AC",
          400: "#5BB484",
        },
        cream: {
          50: "#FFFCF4",
          100: "#FBF4E3",
          200: "#F4E9CE",
        },
        ink: {
          900: "#1F2A37",
          700: "#3A4756",
          500: "#6B7785",
          300: "#B7BFC9",
        },
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      borderRadius: {
        sm: "10px",
        md: "18px",
        lg: "28px",
        xl: "40px",
      },
      boxShadow: {
        "soft-sm": "0 2px 6px rgba(31, 42, 55, 0.06), 0 1px 2px rgba(31, 42, 55, 0.04)",
        "soft-md": "0 8px 24px rgba(31, 42, 55, 0.08), 0 2px 6px rgba(31, 42, 55, 0.05)",
        "soft-lg": "0 24px 48px rgba(31, 42, 55, 0.12), 0 6px 16px rgba(31, 42, 55, 0.06)",
        glow: "0 12px 32px rgba(255, 210, 63, 0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
        wiggle: "wiggle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
