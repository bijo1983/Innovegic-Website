/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './js/*.js'],
  theme: {
    extend: {
      colors: {
        primary: '#0A7CBC',
        'primary-deep': '#086298',
        secondary: '#3B9FD6',
        accent: '#D84C72',
        dark: '#0F172A',
        light: '#F8FAFC',
        'bg-gray': '#F7F9FC',
        'bg-blue': '#F3F8FC',
        muted: '#64748B',
        brandpink: '#D84C72'
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
