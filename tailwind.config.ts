import type { Config } from "tailwindcss";
import { pink } from "tailwindcss/colors";
import { tailwindConfig } from "@storefront-ui/react/tailwind-config";

const config: Config = {
  presets: [tailwindConfig],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
  ],
  theme: {
    extend: {
      backgroundColor: {
        default: "rgb(var(--background-rgb))",
        special: "#EC1171",
      },
      textColor: {
        default: "rgb(var(--foreground-rgb))",
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
