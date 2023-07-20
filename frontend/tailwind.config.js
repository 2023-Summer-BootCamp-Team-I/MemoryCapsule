// @type {import('tailwindcss').Config}
export default {
  // eslint-disable-next-line quotes
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      boxShadow: {
        // open capsule page
        ButtonShadow: '7px 7px 5px 1px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        MyYellow: '#FEEFCF',
        red: '#FF0000',
      },
      fontFamily: {
        Yeongdeok: ['Yeongdeok', 'Yeongdeok'],
        cachildren_kkum: ['cachildren_kkum', 'cachildren_kkum'],
        Omu: ['Omu', 'Omu'],
        neodgm: ['neodgm', 'neodgm'],
        neo_pro: ['neo_pro', 'neo_pro'],
      },
    },
  },
  plugins: [],
};
