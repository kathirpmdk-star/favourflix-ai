/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ott-dark': '#0f0f0f',
        'ott-gray': '#1a1a1a',
        'ott-light': '#2a2a2a',
        'accent-primary': '#e50914',
        'accent-secondary': '#b20710',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(229, 9, 20, 0.3)',
        'glow-strong': '0 0 30px rgba(229, 9, 20, 0.5)',
      },
    },
  },
  plugins: [],
}
