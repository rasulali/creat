import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        creatBright: "#ED145A",
        creatDark: "#C00848",
      },
      animation: {
        "spin-fast": "spin 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
