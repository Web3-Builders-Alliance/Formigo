import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "formigo-blue": "#0A77FF",
        "formigo-grey": "#252525",
        "formigo-dark/base-3rd": "#2B2D2F",
        "formigo-dark/stroke-base": "#323539",
        "formigo-dark/text-2nd": "#979AA0",
        "formigo-darkgrey": "#181818",
        "formigo-teal": "#40E0D0",
        "formigo-orange": "#FF5500",
        "formigo-lightOrange": "#FFE1D2"
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
  plugins: [],
};
export default config;
