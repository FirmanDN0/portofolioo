import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1B2587",
        blue: "#2339B0",
        subtle: "#6B7280",
        card: "#2F333B"
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 12px 32px -4px rgba(27,37,135,.08), 0 4px 12px -2px rgba(0,0,0,.04)",
        float: "0 20px 35px -5px rgba(0,0,0,.1), 0 10px 15px -5px rgba(0,0,0,.05)",
        btn: "0 10px 20px -5px rgba(27,37,135,.3)"
      }
    }
  },
  plugins: []
};

export default config;
