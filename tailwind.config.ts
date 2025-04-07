import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/module/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "bg-light": "#ffffff",
        "bg-dark": "#001529",
        "text-light": "#001529",
        "text-dark": "#ffffff",
      },
      animation: {
        "move-left": "moveLeft 0.2s ease-out",
        "move-up": "moveUp 01s ease-out",
        "loading": "bounceLoading 1s infinite",
      },
      keyframes: {
        moveUp: {
          "0%": { transform: "translateY(30%)" },
          "100%": { transform: "translateY(0)" },
        },
        moveLeft: {
          "0%": { transform: "translateX(30%)" },
          "100%": { transform: "translateX(0)" },
        },
        bounceLoading: {
          "0%": {
            transform: "translateY(-100%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
          "100%": {
            transform: "translateY(-100%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
