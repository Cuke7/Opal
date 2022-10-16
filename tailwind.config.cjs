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
        light: {
          "primary": "#2563eb",
          "secondary": "#c026d3",
          "accent": "#065f46",
          "neutral": "#cbd5e1",
          "base": "#e7e5e4",
          "base-content": "black",
          "info": "#4f46e5",
          "neutral-content": "black"
        },
      }
    ]
  },
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme("colors.primary"),
              "fontWeight": "500",
              "margin": "0px 0px 30px 0px!important",
            },
            h2: {
              color: theme("colors.primary"),
              "fontWeight": "400",
              "margin": "15px 0px 5px 0px!important",
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
              "border-top-width": "3px",
              "max-width": "800px"
            },
            blockquote: {
              "margin": "15px 0px 15px 0px!important",
              borderLeftColor: theme("colors.accent")
            },
            p: {
              "margin": "0px 0px 5px 0px!important",
            },
            ul: {
              "margin": "0px 0px 10px 0px!important",
            },
            ol: {
              "margin": "0px 0px 10px 0px!important",
            },
            pre: {
              "margin": "0px 0px 0px 0px!important",
              // '@media (min-width: 2000px)': {
              //   "width": "fit-content"
              // }
            },
            a: {
              color: theme("colors.secondary")
            },
            img: {
              "margin": "15px 0px 15px 0px!important",
              "max-width": "100%",
              '@media (min-width: 2000px)': {
                "max-width": "600px"
              }
            }
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
}
