const colors = require('tailwindcss/colors');

const isRounded = true;

const colorScheme1 = {
  background: colors.white,
  textPrimary: colors.black,
  textSecondary: colors.white,
  textCategoryLabel: colors.white,
  textMuted: colors.zinc[700],
  postBackground: colors.white,
  postBackgroundHover: colors.zinc[200],
  boardBackground: colors.white,
  navBackground: colors.white,
  gradientStart: colors.emerald[400],
  gradientEnd: colors.blue[400],
}

const darkGreenScheme = {
  background: colors.black,
  textPrimary: colors.white,
  textSecondary: colors.black,
  textCategoryLabel: colors.black,
  textMuted: colors.zinc[200],
  postBackground: colors.zinc[800],
  postBackgroundHover: colors.zinc[700],
  boardBackground: colors.black,
  navBackground: colors.black,
  gradientStart: colors.emerald[400],
  gradientEnd: colors.blue[400],
}

const lightGreenScheme = {
  background: '#508264',
  textPrimary: colors.white,
  textSecondary: colors.black,
  textCategoryLabel: colors.white,
  textMuted: colors.zinc[200],
  postBackground: '#508264',
  postBackgroundHover: '#578e6d',
  boardBackground: '#508264',
  navBackground: '#508264',
  gradientStart: "#e14d61",
  gradientEnd: "#6457ae",
}

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
              fontFamily: {
                sans: ['var(--font-mulish)'],
              },
            }
          }
        }
      },
      borderRadius: {
        custom: isRounded ? '0.375rem' : '0rem', 
      },
    },
    colors : {
      ...colorScheme1,
    },
    fontFamily: {
      sans: ['var(--font-mulish)'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config;