import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.75rem",
        lg: "2.5rem",
        xl: "3rem",
      },
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#FAF7F2",
          secondary: "#F3ECE1",
          elevated: "#FFFFFF",
          hover: "#EAE0D1",
        },
        ink: {
          DEFAULT: "#1C1613",
          secondary: "#4E433B",
          muted: "#786A5E",
        },
        // Remapped primary accent -> Warm Terracotta / Solar Orange (Zero green/blue/violet)
        lime: {
          DEFAULT: "#D9481E",
          bright: "#FF6B35",
          dim: "rgba(234, 88, 12, 0.11)",
          border: "rgba(217, 72, 30, 0.30)",
          hover: "#C23B14",
        },
        // Remapped secondary accent -> Pure Crimson / Scarlet Red (Zero green/blue/violet)
        violet: {
          DEFAULT: "#DC2626",
          dim: "rgba(220, 38, 38, 0.10)",
          border: "rgba(220, 38, 38, 0.28)",
        },
        hairline: "rgba(28, 22, 19, 0.10)",
        "hairline-strong": "rgba(28, 22, 19, 0.19)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        bungee: ["'Bungee Inline'", "sans-serif"],
        aldrich: ["'Aldrich'", "sans-serif"],
        londrina: ["'Londrina Shadow'", "sans-serif"],
        quantico: ["'Quantico'", "sans-serif"],
        gochi: ["'Gochi Hand'", "cursive"],
        kanit: ["'Kanit'", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "scan-sweep": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "20%": { opacity: "0.8" },
          "80%": { opacity: "0.8" },
          "100%": { transform: "translateY(420%)", opacity: "0" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
        "marquee-left": {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
        "marquee-right": {
          "0%": { transform: "translate3d(-50%, 0, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(3deg)" },
        },
        "spin-3d": {
          "0%": { transform: "rotateX(-22deg) rotateY(0deg)" },
          "100%": { transform: "rotateX(-22deg) rotateY(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-up": "accordion-up 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
        "scan-sweep": "scan-sweep 7s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 2.8s ease-in-out infinite",
        "marquee-left": "marquee-left 34s linear infinite",
        "marquee-right": "marquee-right 38s linear infinite",
        "float-slow": "float-slow 5.5s ease-in-out infinite",
        "spin-3d": "spin-3d 18s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
