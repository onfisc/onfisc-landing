import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'onfisc-beige': '#E9DECD',
        'onfisc-orange': '#F39200',
        'onfisc-brown': '#915E35',
        'onfisc-dark': '#432918',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
