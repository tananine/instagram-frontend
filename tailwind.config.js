/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.js', './components/**/*.js'],
  theme: {
    extend: {},
    screens: {
      w0: '0px',
      w450: '450px',
      w470: '470px',
      w875: '875px',
      w999: '999px',
    },
  },
  plugins: [],
}
