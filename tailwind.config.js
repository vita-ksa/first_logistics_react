/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./public/index.html', './src/**/*.{html,js,jsx,ts,tsx}'],
  mode: 'jit',

  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
      extend: {
        colors: {
          primary: 'linear-gradient(to right, rgb(0, 0, 0), rgb(67, 67, 67))',
          secondary: '#00f6ff',
          dimWhite: 'rgba(255, 255, 255, 0.7)',
          dimBlue: 'rgba(9, 151, 124, 0.1)',
        },
        dimWhite: 'rgba(255, 255, 255, 0.7)',
        dimBlue: 'rgba(9, 151, 124, 0.1)',
      },
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    },
  },
  plugins: [],
}
