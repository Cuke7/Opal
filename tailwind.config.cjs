/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#60a5fa",
          "secondary": "#f472b6",
          "accent": "#51A800",
          "neutral": "#1D283A",
          "base-100": "#111827",
          "info": "#1e40af",
          "neutral-content": "white"
        },
      },
    ],
  },
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme("colors.primary"),
              "fontWeight": "500",
              "margin": "15px 0px 15px 0px!important",
            },
            h2: {
              color: theme("colors.primary"),
              "fontWeight": "400",
              "margin": "10px 0px 5px 0px!important",
            },
            h3: {
              color: theme("colors.primary"),
              "fontWeight": "400",
              "margin": "8px 0px 5px 0px!important",
            },
            h4: {
              color: theme("colors.primary"),
              "fontWeight": "400",
              "margin": "5px 0px 5px 0px!important",
            },
            strong: {
              color: theme("colors.secondary")
            },
            li: {
              "margin": "0px 0px 0px 0px!important",
              '&::marker': {
                color: theme("colors.accent")
              },
            },
            hr: {
              margin: "15px 0px 15px 0px!important",
              borderColor: theme("colors.accent"),
            },
            blockquote: {
              "margin": "15px 0px 15px 0px!important",
              borderLeftColor: theme("colors.accent")
            },
            p: {
              "margin": "0px 0px 5px 0px!important",
            },
            ul: {
              "margin": "5px 0px 15px 0px!important",
            },
            ol: {
              "margin": "5px 0px 15px 0px!important",
            },
            pre: {
              "margin": "10px 0px 1px 0px!important",
            },
            a: {
              color: theme("colors.secondary")
            },
            img: {
              "margin": "10px 0px 10px 0px!important",
            }
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
}
