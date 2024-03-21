import type { Config } from "tailwindcss";
import { pink } from "tailwindcss/colors";
import { tailwindConfig } from "@storefront-ui/react/tailwind-config";

const config: Config = {
  presets: [tailwindConfig],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@storefront-ui/react/**/*.{js,mjs}",
  ],
  safelist: [
    "w-6",
    "h-6",
    "col-span-2",
    "row-span-2",
    "scale-0",
    "scale-100",
    "translate-y-100",
    "translate-y-0",
    "h-368px",
    {
      pattern: /bg-(yellow|amber|orange)-.+/,
      variants: ["hover", "focus", "active"],
    },
  ],
  theme: {
    extend: {
      backgroundColor: {
        default: {
          main: "rgb(var(--background-rgb))",
          inverted: "rgb(var(--foreground-rgb))",
        },

        special: "#EC1171",
      },
      textColor: {
        default: {
          main: "rgb(var(--foreground-rgb))",
          inverted: "rgb(var(--background-rgb))",
        },
        special: "#EC1171",
      },

      colors: {
        primary: {
          ...pink,
          700: "#EC1171",
          // 900: "#EC1171",
        },
        secondary: {
          900: "#FFD12E",
          700: "#FFD12E",
        },
        accent: {
          700: "#7E73EE",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // ...
  ],
};
export default config;
