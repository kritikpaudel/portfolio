/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B0D12",
        surface: "#0F1218",
        primary: "#7C5CFC",
        accent: "#23D5AB",
      },
      borderRadius: {
        '2xl': '1rem',
      }
    },
  },
  darkMode: "class",
  plugins: [],
};
