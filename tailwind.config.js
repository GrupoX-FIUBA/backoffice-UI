module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-green': '#1db954',
        'green': '#1ed760',
        'spotiblue': 'rgb(41, 65, 171)',
      },
      backgroundImage: {
        'spotify': "url('/bursts.svg')",
        'spotifyblue': "url('/bluebg.jpg')",
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
}