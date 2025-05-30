/** @type {import('tailwindcss').Config} */

const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    screens: {
      xs: "320px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
        gamja: ["'Gamja Flower'", "cursive"],
        poppins: ["'Poppins'", "sans-serif"],
        rock: ['"Rock Slayers"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
