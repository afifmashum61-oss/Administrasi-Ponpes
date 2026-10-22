/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#071A11',
          900: '#0D2B1D',
          850: '#103423',
          800: '#15412A',
          700: '#1D5A3A',
          600: '#2A7A50',
          500: '#3A9D68',
          400: '#5BBF88',
          300: '#86DAA9',
          200: '#B6ECCB',
          100: '#DDF7E8',
          50: '#F2FAF5'
        },
        cream: {
          bg: '#F7F8F6',
          card: '#F0F2EE',
          muted: '#E6E9E3'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'float': '0 12px 35px -8px rgba(13, 43, 29, 0.25)',
        'card': '0 4px 20px -2px rgba(13, 43, 29, 0.06)'
      }
    },
  },
  plugins: [],
}
