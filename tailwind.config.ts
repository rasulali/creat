import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    plugin(({ addVariant }) => {
      addVariant("parent-group-hover", ":merge(.parent-group):hover &");
      addVariant("child-group-hover", ":merge(.child-group):hover &");
    }),
    require("tailwindcss-animate"),
  ],
};

export default config;
