/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#1d7299", dark: "#14526f", deep: "#0f3a50", soft: "#eaf3f8" },
        ink: "#171717",
        muted: "#4b5563",
        line: "#d0d5dd",
        sale: "#d13d4b",
      },
      fontFamily: { sans: ["Jost", "Arial", "sans-serif"] },
      boxShadow: { card: "0 4px 12px rgba(0,0,0,.15)" },
    },
  },
  plugins: [],
};