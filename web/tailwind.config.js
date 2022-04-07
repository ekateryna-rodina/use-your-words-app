module.exports = {
  mode: "jit",
  content: ["./src/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        white: "#FFFFF",
        dark: {
          800: "#37233A",
          700: "#634069",
          600: "#523457",
          500: "#734B79",
        },
        purple: "#BB2AD2",
        green: "#2EC0A6",
        yellow: "#D1AA3F",
        red: "#DE214F",
        gray: {
          800: "#AAAAAA",

          200: "#F8F8F8",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
