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
      'darkgrey' : '#303030',
      'medgrey' : '#969696',
      'lightgrey' : '#e5e5e5',
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config;