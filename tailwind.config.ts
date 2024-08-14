import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('parent-group-hover', ':merge(.parent-group):hover &')
      addVariant('child-group-hover', ':merge(.child-group):hover &')
    })
  ],
};
export default config;
