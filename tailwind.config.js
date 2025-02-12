/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        goorm: ['goorm-sans'], // 커스텀 폰트 추가
      },
      colors: {
        contentGray: '#6b6b6b',
        lightBottom: '#d1d1d6',
        inputBg: '#f9f9f9',
        helper: '#c94a4a',
      },
    },
  },
  plugins: [],
}
