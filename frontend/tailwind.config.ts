import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-montserrat)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        card: 'var(--card)',
        txt: {
          DEFAULT: "var(--text-primary)",
          secondary: "var(--text-secondary)"
        },
        btn: {
          primary: "var(--btn-primary)",
          "primary-hover": "var(--btn-primary-hover)",
          secondary: "var(--btn-secondary)",
        },

        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        "formigo-blue": "#0A77FF",
        "formigo-grey": "#252525",
        "formigo-dark/base-3rd": "#2B2D2F",
        "formigo-dark/stroke-base": "#323539",
        "formigo-dark/text-2nd": "#979AA0",
        "formigo-darkgrey": "#181818",
        "formigo-bluegreen": "#537E81",
        "formigo-teal": "#40E0D0",
        "formigo-orange": "#FF5500",
        "formigo-lightOrange": "#FFE1D2",
      },
      borderRadius: {
        lg: "calc(var(--radius) + 2px)",
        md: "var(--radius)",
        sm: "calc(var(--radius) - 2px)",
      },
    },
    screens: {
      xs: "280px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
