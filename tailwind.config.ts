import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // grid-cols-gallery
        gallery: "repeat(auto-fit, minmax(275px, 1fr))",
      },
      maxWidth: {
        "gallery-item": "600px",
      },
      screens: {
        xs: "475px",
        md: "900px",
      },
    },
  },
  plugins: [],
};
export default config;
