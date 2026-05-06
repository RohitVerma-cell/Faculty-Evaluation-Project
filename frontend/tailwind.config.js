/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        border: '#e5e7eb', // or any color
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      animation: {
        'fade-in':    'fadeIn .25s ease',
        'slide-up':   'slideUp .28s cubic-bezier(.34,1.56,.64,1)',
        'toast-in':   'toastIn .3s cubic-bezier(.34,1.56,.64,1)',
        'shimmer':    'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn:   { from: { opacity: 0 },                         to: { opacity: 1 } },
        slideUp:  { from: { opacity: 0, transform: 'translateY(16px) scale(.97)' }, to: { opacity: 1, transform: 'translateY(0) scale(1)' } },
        toastIn:  { from: { opacity: 0, transform: 'translateX(20px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        shimmer:  { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
      },
    },
  },
  plugins: [],
}


// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
