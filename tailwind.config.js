const colors = require('tailwindcss/colors');
const plugin = require("tailwindcss/plugin");

const isRounded = true;

const colorScheme1 = {
  background: colors.zinc[100],
  textPrimary: colors.black,
  textSecondary: colors.zinc[100],
  textCategoryLabel: colors.zinc[100],
  textMuted: colors.zinc[700],
  borders: colors.zinc[600],
  postBackground: colors.zinc[100],
  postBackgroundHover: colors.zinc[200],
  boardBackground: colors.zinc[100],
  navBackground: colors.zinc[100],
  shadows: colors.zinc[900],
  gradientStart: colors.emerald[400],
  gradientEnd: colors.blue[400],
}

const retroBackground = "#ffffff"
const retroScheme = {
  background: retroBackground,
  textPrimary: colors.stone[800],
  textSecondary: retroBackground,
  codeBackground: colors.gray[900],
  textCategoryLabel: retroBackground,
  textMuted: colors.stone[800],
  borders: colors.stone[800],
  postBackground: retroBackground,
  postBackgroundHover: colors.zinc[200],
  boardBackground: retroBackground,
  navBackground: retroBackground,
  shadows: colors.stone[800],
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
              '--tw-prose-bullets': colors.stone[800],
              'ol > li::marker': {
              color: colors.stone[800],
              },
              'code::before': {
                content: 'none',
              },
              'code::after': {
                content: 'none'
              },
              'code': {
                fontWeight: 'normal',
              },
              'img': {
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              },
              'td': {
                textAlign: 'center',
              },
              'th': {
                textAlign: 'center',
              },
              'a': {
                fontWeight: 'normal',
                color: colors.blue[700],
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
              // 'pre': {
              //   backgroundColor: retroScheme.codeBackground, // Set custom background color for code blocks
              //   padding: theme('spacing.4'), // Optional: add padding for better spacing
              //   borderRadius: theme('borderRadius.md'), // Optional: add rounded corners
              // },
              fontFamily: {
                sans: ['var(--font-sans)'],
                serif: ['var(--font-serif)'],
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
      },
    },
    colors : {
      ...retroScheme,
    },
    fontFamily: {
      sans: ['var(--font-sans)'],
      serif: ['var(--font-serif)']
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addComponents }) {
      addComponents({
        ".prose code": {
          backgroundColor: "#f6f8fa", // GitHub-style background
          color: "#24292e",          // GitHub-style text color
          borderRadius: "3px",
          padding: "0.2em 0.4em",
          fontSize: "75%",
          fontFamily: 'ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
        },
      });
    }),
  ],
}

export default config;