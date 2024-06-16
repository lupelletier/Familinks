/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/**/*.{tsx,js}'],
  theme:  {
    extend: {
    fontFamily: {
      custom: ['Satoshi', 'sans-serif'],
    },
  },
},
  plugins: [],
};
