module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'CircularSpotifyText': ['CircularSpotifyText', 'sans-serif'],
        'spotibold': ['CircularSpotifyTextBold', 'sans-serif'] 
      },
      colors: {
        'light-green': '#1db954',
        'green': '#1ed760',
        'spotiblue': 'rgb(41, 65, 171)',
        'spotiblack': '#191414',
        'spoticeleste': '#007CAD',
      },
      backgroundImage: {
        'spotify': "url('/bursts.svg')",
        'spotifyblue': "url('/bluebg.jpg')",
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
}