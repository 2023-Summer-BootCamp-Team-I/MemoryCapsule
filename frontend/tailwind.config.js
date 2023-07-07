/** @type {import('tailwindcss').Config} */
export default {
  // eslint-disable-next-line quotes
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      boxShadow: {
        // open capsule page
        ButtonShadow: '7px 7px 5px 1px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
