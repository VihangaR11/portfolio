/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Corporate Sapphire palette for SAP/ERP/BA roles
        // blue-* already in Tailwind — these extend with precise brand values
        sapphire: {
          300: '#93c5fd',
          400: '#4da6ff',
          500: '#1e6bc4',
          600: '#1557a0',
          700: '#103d72',
        },
        gold: {
          300: '#fcd34d',
          400: '#c8a03c',
          500: '#b8920f',
          600: '#9a7b0c',
        },
        navy: {
          950: '#060d1a',
          900: '#0a1628',
          800: '#0f1e35',
          700: '#142440',
        },
      },
    },
  },
  plugins: [],
}
