/** @type {import('tailwindcss').Config} */
export default {
  // eslint-disable-next-line quotes
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        Yeondeok: ['Yeongdeok', 'Yeongdeok'],
        cachildren_kkum: ['cachildren_kkum', 'cachildren_kkum'],
        Omu: ['Omu', 'Omu'],
      },
    },
  },
  plugins: [],
};
