/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#E32526',
        'secondary': '#1979C3',
        'light-dark': '#2B2B2B',
        'light-gray': '#EAEAEA',
      },
    },
  },
  plugins: [],
}