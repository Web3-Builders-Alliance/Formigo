/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        card: "var(--card)",
        destructive:{
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        } ,
        txt: {
          DEFAULT: "var(--text-primary)",
          secondary: "var(--text-secondary)",
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
        "formigo-light/primary-2nd": "#9062FF",
        "formigo-danger": "#E33B32",
      },
    },
    borderRadius: {
      full: "9999px",
      lg: "calc(var(--radius) + 2px)",
      md: "var(--radius)",
      sm: "calc(var(--radius) - 2px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: 0 },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: 0 },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
