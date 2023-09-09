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
              code: {
                color: theme('colors.slate.800'),
                backgroundColor: theme('colors.stone.100'),
                borderRadius: theme('borderRadius.DEFAULT'),
                paddingLeft: theme('spacing[1.5]'),
                paddingRight: theme('spacing[1.5]'),
                paddingTop: theme('spacing.1'),
                paddingBottom: theme('spacing.1'),
              },
            }
          }
        }
      }
    },
    colors : {
      ...colors,
      'site-background': '#f1f1ee',
      'cpale-yellow': '#fceec1',
      'cdarker-yellow': '#c9a020',
      'cred': '#cc8068',
      'cblue': '#8cb5d0',
      'clight-brown': '#ddcaa6',
      'cgreen': '#b6d8b4',

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