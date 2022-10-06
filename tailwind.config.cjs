/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.white'),
            h1: {
              color: theme("colors.blue.400"),
              "fontWeight": "500",
            },
            h2: {
              color: theme("colors.blue.400"),
              "fontWeight": "400",
              '@media (min-width: 1024px)': {
                "margin-top": "0px!important",
              }
            },
            h3: {
              color: theme("colors.blue.400"),
              "fontWeight": "400",
            },
            strong: {
              color: theme("colors.pink.500")
            },
            li: {
              '&::marker': {
                color: theme("colors.green.400")
              },
            },
            hr: {
              margin: "25px 0px 25px 0px",
              borderColor: theme("colors.green.400"),
              '@media (min-width: 1024px)': {
                "margin": "25px 0px 25px 0px!important",
              }
            },
            blockquote: {
              borderLeftColor: theme("colors.green.400")
            }
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
}
