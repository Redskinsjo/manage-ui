const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      fontWeight: "group-hover",
      letterSpacing: "group-hover",
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".max-h-3-4": {
          maxHeight: "75%",
        },
        ".min-h-16": {
          minHeight: "4rem",
        },
        ".w-92%": {
          width: "92%",
        },
        ".text-xxxs": {
          fontSize: "0.625rem",
          lineHeight: "0.75rem",
        },
        ".border-b-width-0_5": {
          borderBottomWidth: "0.5px",
          lineHeight: "0.75rem",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
