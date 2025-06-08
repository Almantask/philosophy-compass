import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [typography],
};

export default config;
