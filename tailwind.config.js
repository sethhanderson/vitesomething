/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E6F7FF',
          200: '#BAE7FF',
          300: '#91D5FF',
          400: '#69C0FF',
          500: '#40A9FF',
          600: '#1890FF',
          700: '#096DD9',
          800: '#0050B3',
          900: '#003A8C',
        },
      },
    },
  },
  plugins: [],
}
