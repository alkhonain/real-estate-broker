/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'property-blue': '#2389DA',
        'property-red': '#E44D2E',
        'luxury-gold': '#FFCC33',
        'estate-green': '#4CAF50',
        'realtor-purple': '#9C27B0',
        'map-bg': '#F5EEE6',
        'game-bg': '#D8B192',
        'card-bg': '#FFFFFF',
        'premium-bg': '#FFF8E1',
        'text-dark': '#333333',
        'text-light': '#FFFFFF',
        'accent': '#FF5722',
        'success': '#4CAF50',
        'warning': '#FFC107',
        'error': '#F44336',
      },
      fontFamily: {
        'montserrat': ['Tajawal', 'sans-serif'],
        'roboto': ['Tajawal', 'sans-serif'],
        'roboto-mono': ['Tajawal', 'monospace'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out 1s infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'shimmer': 'shimmer 1.5s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.8)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}