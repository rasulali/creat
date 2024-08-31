import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'drop-shadow-button-creatBright': '0 0px 16px rgba(228, 20, 90, 1)',
        'drop-shadow-sm-creatBright': '0 1px 2px rgba(237, 20, 90, 0.05)',
        'drop-shadow-md-creatBright': '0 4px 4px rgba(237, 20, 90, 0.15)',
        'drop-shadow-lg-creatBright': '0 10px 15px rgba(237, 20, 90, 0.35)',
        'drop-shadow-xl-creatBright': '0 20px 25px rgba(237, 20, 90, 0.5)',
        'drop-shadow-2xl-creatBright': '0 25px 50px rgba(237, 20, 90, 0.6)',
        'drop-shadow-3xl-creatBright': '0 35px 60px rgba(237, 20, 90, 0.7)',
        'drop-shadow-inner-creatBright': 'inset 0 2px 4px rgba(237, 20, 90, 0.15)',
        'drop-shadow-sm-white': '0 1px 2px rgba(255, 255, 255, 0.05)',
        'drop-shadow-md-white': '0 4px 4px rgba(255, 255, 255, 0.15)',
        'drop-shadow-lg-white': '0 10px 15px rgba(255, 255, 255, 0.35)',
        'drop-shadow-xl-white': '0 20px 25px rgba(255, 255, 255, 0.5)',
        'drop-shadow-2xl-white': '0 25px 50px rgba(255, 255, 255, 0.6)',
        'drop-shadow-3xl-white': '0 35px 60px rgba(255, 255, 255, 0.7)',
        'drop-shadow-inner-white': 'inset 0 2px 4px rgba(237, 20, 90, 0.15)',
      },
      colors: {
        creatBright: "#ED145A",
        creatDark: "#C00848",
        creatBG: "#081731",
        creatBGLight: "#0C3D91",
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
