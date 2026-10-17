/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060B14',
          900: '#0B1528',
          800: '#142342',
          700: '#1E3462',
          600: '#2A4680',
          500: '#3A5EA4',
        },
        gold: {
          500: '#C5A059',
          400: '#D4B374',
          300: '#E4CA97',
          200: '#F2E2C2',
          100: '#FAF4E8',
        },
        cream: {
          50: '#FDFBF7',
          100: '#F7F3EB',
          200: '#EEE6D7',
          300: '#E2D6C0',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
