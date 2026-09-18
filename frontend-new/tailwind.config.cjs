/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/game-events/**/*.{js,jsx,ts,tsx}',
    './src/events/pages/GamesEventPage.jsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
