/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './js/*.js'],
  theme: {
    extend: {
      colors: {
        primary: '#0F4C81',
        secondary: '#00B4D8',
        accent: '#34D399',
        dark: '#0F172A',
        light: '#F8FAFC',
        brandpink: '#E94560'
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
