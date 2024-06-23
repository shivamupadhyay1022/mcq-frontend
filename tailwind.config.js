/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      'hind': ['Hind', 'sans-serif'], // Ensure fonts with spaces have " " surrounding it.
    },
    extend: {},
  },
  plugins: [require('daisyui'),],
}

