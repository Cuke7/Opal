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
              "margin": "15px 0px 15px 0px!important",
            },
            h2: {
              color: theme("colors.blue.400"),
              "fontWeight": "400",
              "margin": "5px 0px 5px 0px!important",
            },
            h3: {
              color: theme("colors.blue.400"),
              "fontWeight": "400",
              "margin": "5px 0px 5px 0px!important",
            },
            h4: {
              color: theme("colors.blue.400"),
              "fontWeight": "400",
              "margin": "5px 0px 5px 0px!important",
            },
            strong: {
              color: theme("colors.pink.500")
            },
            li: {
              "margin": "0px 0px 0px 0px!important",
              '&::marker': {
                color: theme("colors.green.400")
              },
            },
            hr: {
              margin: "15px 0px 15px 0px!important",
              borderColor: theme("colors.green.400"),
            },
            blockquote: {
              "margin": "15px 0px 15px 0px!important",
              borderLeftColor: theme("colors.green.400")
            },
            p: {
              "margin": "0px 0px 5px 0px!important",
            },
            ul: {
              "margin": "5px 0px 0px 0px!important",
            }
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
}
