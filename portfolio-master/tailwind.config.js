/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        light: '0.8rem',
        thin: '1.2rem',
        'normal-lite': '1.4rem',
        normal: '1.6rem',
        'small-lite': '2rem',
        small: '2.4rem',
        'medium-lite': '3.2rem',
        medium: '4.8rem',
      },
      fontSize: {
        light: '0.8rem',
        thin: '1.2rem',
        'normal-lite': '1.4rem',
        normal: '1.6rem',
        'small-lite': '2rem',
        small: '2.4rem',
        'medium-lite': '3.2rem',
        medium: '4.8rem',
      },
      borderRadius: {
        light: '0.8rem',
        thin: '1.2rem',
        'normal-lite': '1.4rem',
        normal: '1.6rem',
        small: '2.4rem',
        'medium-lite': '3.2rem',
        medium: '4.8rem',
      },
      colors: {
        background: '#F5F6FA',
        brand: {
          DEFAULT: '#00e2dc',
          50: '#edfffe',
          100: '#c0fffe',
          200: '#81ffff',
          300: '#3affff',
          400: '#04fff7',
          500: '#00e2dc',
          600: '#00b7b6',
          700: '#009091',
          800: '#006f72',
          900: '#045b5d',
          950: '#00363a',
        },

        dark: {
          DEFAULT: '#2A2A2A',
          50: '#eaeaea',
          100: '#bdbdbd',
          200: '#9d9d9d',
          300: '#707070',
          400: '#555555',
          500: '#2a2a2a',
          600: '#262626',
          700: '#1e1e1e',
          800: '#171717',
          900: '#121212',
        },
        error: {
          DEFAULT: '#C30000',
          50: '#f9e6e6',
          100: '#ecb0b0',
          200: '#e38a8a',
          300: '#d75454',
          400: '#cf3333',
          500: '#c30000',
          600: '#b10000',
          700: '#8a0000',
          800: '#6b0000',
          900: '#520000',
        },
      },
    },
    // eslint-disable-next-line no-undef
    plugins: [],
  },
};
