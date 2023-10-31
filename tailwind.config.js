const colors = require('tailwindcss/colors');

const isRounded = false;

const colorScheme1 = {
  background: colors.zinc[100],
  textPrimary: colors.black,
  textSecondary: colors.zinc[100],
  textCategoryLabel: colors.zinc[100],
  textMuted: colors.zinc[700],
  borders: colors.zinc[900],
  postBackground: colors.zinc[100],
  postBackgroundHover: colors.zinc[200],
  boardBackground: colors.zinc[100],
  navBackground: colors.zinc[100],
  shadows: colors.zinc[900],
  gradientStart: colors.emerald[400],
  gradientEnd: colors.blue[400],
}

const retroScheme = {
  background: "#eae5d9",
  textPrimary: "#332433",
  textSecondary: "#eae5d9",
  textCategoryLabel: "#eae5d9",
  textMuted: "#443144",
  borders: "#332433",
  postBackground: "#eae5d9",
  postBackgroundHover: colors.zinc[200],
  boardBackground: "#eae5d9",
  navBackground: "#eae5d9",
  shadows: "#332433",
  gradientStart: colors.emerald[400],
  gradientEnd: colors.blue[400],
}

const darkGreenScheme = {
  background: colors.zinc[900],
  textPrimary: colors.white,
  textSecondary: colors.zinc[900],
  textCategoryLabel: colors.zinc[900],
  textMuted: colors.zinc[200],
  borders: colors.emerald[400],
  postBackground: colors.zinc[900],
  postBackgroundHover: colors.zinc[800],
  boardBackground: colors.zinc[900],
  navBackground: colors.zinc[900],
  shadows: colors.zinc[900],
  gradientStart: colors.emerald[400],
  gradientEnd: colors.blue[400],
}

const lightGreenScheme = {
  background: '#508264',
  textPrimary: colors.zinc[100],
  textSecondary: colors.black,
  textCategoryLabel: colors.zinc[100],
  textMuted: colors.zinc[200],
  borders: colors.zinc[200],
  postBackground: '#508264',
  postBackgroundHover: '#578e6d',
  boardBackground: '#508264',
  navBackground: '#508264',
  shadows: colors.zinc[900],
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
      boxShadow: {
        xl: '10px 10px 0px 0px rgba(0, 0, 0, 0.3)',
        lg: '5px 5px 0px 0px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        spin: 'spin 1s ease-in-out',
      }
    },
    colors : {
      ...retroScheme,
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