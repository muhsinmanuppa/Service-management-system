/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        secondary: "#64748b",
        accent: "#0ea5e9",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};