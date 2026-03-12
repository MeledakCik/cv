import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // tailwind.config.ts
  theme: {
    extend: {
      fontFamily: {
        // Menghubungkan variabel font dari layout ke utility class Tailwind
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
      },
      colors: {
        background: "#0d0f14",
        secondary: "#1e212b",
        primary: {
          DEFAULT: "#22c55e",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;