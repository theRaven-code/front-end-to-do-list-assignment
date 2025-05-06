/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main app colors
        "todo-bg": "#f9fafb",

        // Category colors - flattened
        "fruit-bg": "rgba(253, 186, 116, 0.7)",
        "fruit-light": "rgba(254, 215, 170, 0.8)",
        "fruit-text": "#c2410c",
        "fruit-border": "rgba(249, 115, 22, 0.6)",
        "fruit-hover": "rgba(254, 215, 170, 0.9)",
        "fruit-progress": "rgba(249, 115, 22, 0.85)",
        "fruit-timer": "#ea580c",

        "vegetable-bg": "rgba(134, 239, 172, 0.7)",
        "vegetable-light": "rgba(187, 247, 208, 0.8)",
        "vegetable-text": "#15803d",
        "vegetable-border": "rgba(34, 197, 94, 0.6)",
        "vegetable-hover": "rgba(187, 247, 208, 0.9)",
        "vegetable-progress": "rgba(34, 197, 94, 0.85)",
        "vegetable-timer": "#16a34a",

        // Playful colors - flattened
        "bubblegum-light": "rgba(251, 207, 232, 0.7)",
        "bubblegum-medium": "rgba(244, 114, 182, 0.6)",
        "bubblegum-dark": "#db2777",

        "blueberry-light": "rgba(191, 219, 254, 0.7)",
        "blueberry-medium": "rgba(96, 165, 250, 0.6)",
        "blueberry-dark": "#2563eb",

        "lemon-light": "rgba(254, 240, 138, 0.7)",
        "lemon-medium": "rgba(250, 204, 21, 0.6)",
        "lemon-dark": "#ca8a04",

        "grape-light": "rgba(216, 180, 254, 0.7)",
        "grape-medium": "rgba(192, 132, 252, 0.6)",
        "grape-dark": "#9333ea",
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in",
        slideIn: "slideIn 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        countdown: "countdown 5s linear forwards",
        float: "float 6s ease-in-out infinite",
        "bounce-small": "bounce-small 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        countdown: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "bounce-small": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "rainbow-gradient":
          "linear-gradient(to right, #ff9a9e, #fad0c4, #fad0c4, #fbc2eb, #a6c1ee)",
        "sunset-gradient": "linear-gradient(to right, #fa709a, #fee140)",
        "candy-gradient": "linear-gradient(to right, #43e97b, #38f9d7)",
      },
    },
  },
  plugins: [],
};
