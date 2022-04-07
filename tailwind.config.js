module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-green': '#1db954',
        'green': '#1ed760',
      },
      
    },
  },
  plugins: [require('tailwind-scrollbar')],
}