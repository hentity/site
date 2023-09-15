const colors = require('tailwindcss/colors');

const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography (theme) {
        return {
          DEFAULT: {
            css: {
              'code::before': {
                content: 'none',
              },
              'code::after': {
                content: 'none'
              },
              'fontFamily': 'Mulish',
            }
          }
        }
      }
    },
    colors : {
      ...colors,
    },
    fontFamily: {
      'mulish': ['Mulish', 'sans-serif']
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config;