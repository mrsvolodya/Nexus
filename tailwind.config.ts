import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        warm: {
          DEFAULT: "hsl(var(--warm))",
          foreground: "hsl(var(--warm-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        brand: {
          teal: "#0EA5A5",
          cyan: "#06B6D4",
          aqua: "#5EEAD4",
          sky: "#38BDF8",
          amber: "#F59E0B",
          honey: "#FBBF24",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glass:
          "0 1px 0 rgba(255, 255, 255, 0.6) inset, 0 20px 40px -24px rgba(12, 74, 110, 0.25), 0 8px 20px -14px rgba(6, 95, 70, 0.15)",
        "glass-sm":
          "0 1px 0 rgba(255, 255, 255, 0.6) inset, 0 12px 24px -18px rgba(12, 74, 110, 0.25)",
        "glass-lg":
          "0 1px 0 rgba(255, 255, 255, 0.7) inset, 0 40px 80px -30px rgba(6, 78, 99, 0.3), 0 18px 40px -20px rgba(6, 95, 70, 0.2)",
        "glow-teal":
          "0 0 40px -8px rgba(14, 165, 165, 0.45)",
        "glow-amber":
          "0 0 40px -8px rgba(245, 158, 11, 0.45)",
      },
      backgroundImage: {
        "aurora":
          "radial-gradient(at 12% 8%, hsl(var(--primary) / 0.18) 0, transparent 45%), radial-gradient(at 88% 12%, hsl(var(--warm) / 0.20) 0, transparent 48%), radial-gradient(at 68% 86%, hsl(var(--accent) / 0.18) 0, transparent 55%), radial-gradient(at 10% 90%, hsl(var(--primary) / 0.10) 0, transparent 50%)",
        "ring-conic":
          "conic-gradient(from 180deg at 50% 50%, hsl(var(--primary) / 0.25), hsl(var(--accent) / 0.25), hsl(var(--warm) / 0.25), hsl(var(--primary) / 0.25))",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "aurora-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(1%, -2%, 0) scale(1.03)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "aurora-drift": "aurora-drift 22s ease-in-out infinite",
        float: "float 8s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
