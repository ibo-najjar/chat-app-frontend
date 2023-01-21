/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ptext: "#6E6E6E",
        secondary: "#212121",
        primary: "#111111",
        accent: "#6AC46D",
      },
    },
  },
  plugins: [],
};
