/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Quicksand", "Helvetica", "Arial", "sans-serif"],
    },
    extend: {
      colors: {
        uil: {
          400: "#000560",
          500: "#00044b",
        },
      },
    },
  },
  plugins: [],
};
