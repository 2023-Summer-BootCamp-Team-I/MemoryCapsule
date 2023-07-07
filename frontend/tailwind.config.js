/** @type {import('tailwindcss').Config} */
export default {
  // eslint-disable-next-line quotes
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        openedCapsuleColor1: '#FFD26D',
        openedCapsuleColor2: '#60C6CF',
      },
    },
  },
  plugins: [],
};
