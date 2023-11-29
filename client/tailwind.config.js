/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px'
      },
      colors: {
        'side-text' : '#7C7B84',
        'main-orange': '#FF9130'
      },
    },
  },
  plugins: [],
}

