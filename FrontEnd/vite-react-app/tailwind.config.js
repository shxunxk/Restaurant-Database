/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px',
        'sm': '540px',
        'md': '980px',
        'lg': '1536px',
        'xl': '2480px',
      },
    },
  },
  plugins: [],
}

