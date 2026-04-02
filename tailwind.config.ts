
import type { Config } from "tailwindcss";
import * as textStroke from "@designbycode/tailwindcss-text-stroke";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1200px',
      '2xl': '1536px',
    },
  },
  plugins: [
    // @ts-ignore
    textStroke,
  ],
};

export default config;
