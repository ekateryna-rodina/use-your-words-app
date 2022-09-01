module.exports = {
  mode: "jit",
  content: [
    "./src/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/containers/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        light: "#FEF4FF",
        dark: {
          800: "#37233A",
          700: "#523457",
          600: "#634069",
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
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
