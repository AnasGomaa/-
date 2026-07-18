import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Tahoma", "Arial", "system-ui", "sans-serif"]
      },
      colors: {
        royal: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
          950: "#172554"
        },
        gold: {
          100: "#fef3c7",
          300: "#fcd34d",
          500: "#f59e0b",
          700: "#b45309"
        }
      },
      boxShadow: {
        glass: "0 24px 70px rgba(29, 78, 216, 0.16)",
        neuro: "10px 10px 24px rgba(148, 163, 184, 0.22), -10px -10px 24px rgba(255, 255, 255, 0.92)"
      },
      backgroundImage: {
        "hero-mesh": "radial-gradient(circle at 18% 18%, rgba(245,158,11,.22), transparent 28%), radial-gradient(circle at 80% 10%, rgba(37,99,235,.20), transparent 30%), linear-gradient(135deg, #ffffff 0%, #f8fafc 45%, #eff6ff 100%)"
      }
    }
  },
  plugins: []
};

export default config;
