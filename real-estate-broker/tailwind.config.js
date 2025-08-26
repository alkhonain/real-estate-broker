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
        'montserrat': ['Montserrat', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}