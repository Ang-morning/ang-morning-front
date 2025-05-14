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
      colors: {
        // 시스템 컬러 변수 (light/dark theme 전환용)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // 테마 컬러
        primary: {
          DEFAULT: "#6CBAA3", // 메인 민트
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#FFD372", // 연노랑 포인트
          foreground: "#1f1f1f",
        },
        accent: {
          DEFAULT: "#FF9E9E", // 복숭아 코랄
          foreground: "#1f1f1f",
        },
        muted: {
          DEFAULT: "#F5F5F5",
          foreground: "#555555",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#222222",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#222222",
        },
        destructive: {
          DEFAULT: "#ff4949",
          foreground: "#ffffff",
        },

        // 차트용 파레트 (넣고 싶으면)
        chart: {
          1: "#6CBAA3",
          2: "#FFD372",
          3: "#FF9E9E",
          4: "#8492a6",
          5: "#FF7849",
        },
      },
    },
  },
  plugins: [],
};

export default config;
