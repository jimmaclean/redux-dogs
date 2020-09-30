module.exports = {
  purge: ["./src/**/*.js"],
  theme: {
    colors: {
      brown: "#773f0e",
      black: "#000000",
      grey: "#999999",
      white: "#ffffff",
    },
    borderRadius: {
      default: '2px',
    },
    fontSize: {
      base: "16px",
      lg: "20px",
      xl: "30px",
    },
    extend: {
      spacing: {
        '96': '24rem',
      }
    }
  },
  variants: {},
  plugins: [],
};
