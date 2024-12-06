import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";


const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jost: ["var(--jost)"],
        manrope: ["var(--manrope)"]
      },
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
        'drop-shadow-inner-white': 'inset 0 2px 4px rgba(237, 20, 90, 0.15)'
      },
      colors: {
        creatBright: '#ED145A',
        creatDark: '#C00848',
        creatBG: '#081731',
        creatBGLight: '#0C3D91',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      animation: {
        'spin-fast': 'spin 0.5s ease-in-out forwards',
        aurora: 'aurora 60s linear infinite'
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%'
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%'
          }
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    plugin(({ addVariant }) => {
      addVariant('parent-group-hover', ':merge(.parent-group):hover &')
      addVariant('child-group-hover', ':merge(.child-group):hover &')
    }),
    addVariablesForColors,
    require("tailwindcss-animate")
  ],
};
export default config;
