module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: false,
      current: "#444444",
      colors: {
        primary: "#00E676",
        dark: "#444444",
        light: "#ECECEC",
        grey: "#C9C9C9",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss-rtl")],
};
