import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#0D3B2E",
          dark: "#082820",
          light: "#1A5240",
        },
        gold: {
          DEFAULT: "#B8963E",
          light: "#D4AE5A",
          pale: "#F0DFA0",
        },
        cream: {
          DEFAULT: "#F7F3EC",
          dark: "#EDE6D8",
          light: "#FDFAF6",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.2em",
        widest3: "0.3em",
      },
    },
  },
  plugins: [],
};

export default config;
