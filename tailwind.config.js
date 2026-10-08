/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastelGreen: '#e6f2eb',
        deepGreen: '#2d4c3b',
        glassBorder: 'rgba(255, 255, 255, 0.4)',
        glassBg: 'rgba(255, 255, 255, 0.25)',
      }
    },
  },
  plugins: [],
}
