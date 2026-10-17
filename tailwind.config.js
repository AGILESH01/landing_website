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
          950: '#070D14',
          900: '#0D1B2A', // Provisional brand deep navy
          800: '#14253B',
          700: '#1D3557',
          600: '#2A4B75',
        },
        cream: {
          50: '#FAF8F5',
          100: '#F7F4EE', // Provisional warm cream
          200: '#EFECE4',
          300: '#E2DDD4',
          400: '#C8C2B5',
        },
        gold: {
          300: '#E5CD95',
          400: '#D9BA7A',
          500: '#C5A059', // Provisional muted gold accent
          600: '#A6823C',
          700: '#876526',
        },
        charcoal: {
          900: '#1A202C',
          800: '#2D3748',
          700: '#4A5568',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'fabric-card': '0 10px 30px -10px rgba(13, 27, 42, 0.15), 0 2px 6px -1px rgba(13, 27, 42, 0.08)',
        'fabric-elevated': '0 20px 40px -15px rgba(13, 27, 42, 0.25), 0 4px 12px -2px rgba(13, 27, 42, 0.12)',
        'fabric-tactile': 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 12px 24px -8px rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        'weave-pattern': "radial-gradient(#C5A059 0.75px, transparent 0.75px), radial-gradient(#C5A059 0.75px, #0D1B2A 0.75px)",
      },
      animation: {
        'gentle-float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
