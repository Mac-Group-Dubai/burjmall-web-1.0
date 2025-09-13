/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'burj-orange': '#FF6B35',
        'burj-dark': '#2C3E50',
        'burj-light-gray': '#F8F9FA',
        'burj-gray': '#6C757D',
        'burj-pink': '#E91E63',
        'burj-yellow': '#FFD700',
      },
    },
  },
  plugins: [],
}

