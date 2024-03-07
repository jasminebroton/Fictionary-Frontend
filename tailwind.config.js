/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundColor: {
        'button-color': '#D2A24C',
        'button-darker': '#A37E3B',
        'background-color' : '#ECE6C2',
      },
      colors: {
        text: '#6F5643',
        'text-lighter' : '#B28665',
      }
    },
  },
  plugins: [
  ],
};
