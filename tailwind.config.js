const px0_2000 = { ...Array.from(Array(2001)).map((_, i) => `${i}px`) };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '20px',
    },

    colors: {
      transparent: 'transparent',
      primary: '#FFA3AE',
      white: '#fff',
      black: '#000',
      slate: {
        100: '#f6f7fb',
        200: '#e0e4ea',
        300: '#282f37',
      },
      gray: {
        100: '#f9f9f9',
        200: '#eaeaea',
        300: '#d7d7d7',
        400: '#ababab',
        500: '#777',
        600: '#333',
      },
      blue: {
        100: '#6898dd',
        200: '#5793f3',
      },
      red: '#f20909',
      orange: '#fd9800',
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '15px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
    },
    fontFamily: {
      sans: ['Noto Sans KR', 'Malgun Gothic', 'sans-serif'],
    },
    fontWeight: {
      normal: 400,
      bold: 700,
    },
    letterSpacing: {
      tighter: '-1px',
      tight: '-0.5px',
      normal: '0',
    },
    borderRadius: {
      none: 0,
      sm: '4px',
      md: '8px',
      lg: '16px',
      xl: '20px',
      '2xl': '40px',
      full: '9999px',
    },
    extend: {
      minWidth: px0_2000,
      maxWidth: px0_2000,
      minHeight: px0_2000,
      spacing: px0_2000,
    },
  },
  plugins: [],
};
