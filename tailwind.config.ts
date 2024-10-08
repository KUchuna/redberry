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
        firago: ['FiraGO', "serif"]
      },
      colors: {
        "primary": "#F93B1D",
        "primary-hover": "#DF3014",
        "secondary": "#808A93"
      },
    },
  },
  plugins: [],
  darkMode: "class",
  dark: "class"
};
export default config;
