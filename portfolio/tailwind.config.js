/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#FFFFFF',
        paper: '#0A0A0A',
        line: 'rgba(10,10,10,0.14)',
      },
      fontFamily: {
        serif: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
    },
  },
  plugins: [],
}
