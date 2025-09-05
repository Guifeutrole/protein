/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5E3FBE',
          dark: '#4A2F9E',
          light: '#7E5FDE',
        },
        swiss: {
          red: '#FF0008',
        },
        stores: {
          migros: '#FF6600',
          coop: '#E30613',
          lidl: '#0050AA',
          aldi: '#00A8E1',
        }
      }
    },
  },
  plugins: [],
}