/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3E9BD0",
        secondary: "#216287",
        accent: "#fc9827",
        dark: "#3a3b36",
      },

      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(2)" },
          "50%": { transform: "translateX(-2)" },
          "75%": { transform: "translateX(2)" },
          "100%": { transform: "translateX(0)" },
        },
        loading: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shake: "shake .2s ease-in-out ",
        loading: "loading 1.5s ease-in infinite",
        spin: "spin 1s linear infinite",
      },
    },
  },
  plugins: [],
};
