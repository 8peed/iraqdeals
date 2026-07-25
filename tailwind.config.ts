import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgpage: "#f5f7fb",
        surface2: "#eef1f6",
        border: "#e7e9ef",
        borderStrong: "#d7dbe4",
        green: { 100: "#DCF3E9", 500: "#00A06B", 600: "#00875A", 900: "#00432D" },
        red: { 100: "#FFE4E4", 500: "#FF4747", 600: "#E23B3B" },
        teal: { 100: "#DFF3F1", 600: "#0F766E" },
        amber: { 100: "#FDECC8", 500: "#F5A623", 800: "#7A4E06" },
        texthi: "#161A22",
        textmid: "#5B6270",
        textlow: "#98A0AD",
      },
      fontFamily: {
        display: ["Changa", "sans-serif"],
        body: ["Tajawal", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        sm2: "0 5px 20px rgba(20,30,50,.06)",
        md2: "0 10px 25px rgba(20,30,50,.09)",
        lift: "0 16px 34px rgba(20,30,50,.14)",
      },
    },
  },
  plugins: [],
};
export default config;
