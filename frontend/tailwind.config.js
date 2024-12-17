/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,css}"
  ],
  theme: {
    extend: {
      fontFamily: {
        onest: ['Onest', 'sans-serif'],
      },
      animation: {
        'typer-border': 'blink 0.5s infinite step-start'
      },
      keyframes: {
        blink: {
          '0%, 100%': {borderColor: 'transparent'},
          '50%': {borderColor: 'white'}
        }
      },
    },
  },
  plugins: [],
}

