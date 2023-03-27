/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/**/*.{js,ts,jsx,tsx}',
    './page-components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './lib/get-status.js',
  ],
  variants: {
    extend: {
      myHover: ['responsive', 'hover'],
    },
  },
  darkMode: 'class',
  theme: {
    screens: {
      mobile: '640px',
      tablet: '960px',
      desktop: '1280px',
    },
    container: {
      screens: {
        mobile: '600px',
        tablet: '900px',
        desktop: '1200px',
      },
    },
    colors: {
      transparent: 'transparent',
      yellow: {
        100: '#fef9c3',
        DEFAULT: '#F9B100',
        light: '#FFE345',
        dark: '#F6D362',
      },
      red: {
        100: '#fee2e2',
        DEFAULT: '#f50505',
        light: '#fc4747',
      },
      orange: '#FFC519',
      gray: {
        50: '#F8F8F8',
        100: '#EFEFEF',
        200: '#e5e7eb',
        300: '#cbd5e1',
        400: '#9A9A9A',
        800: '#2D2D2D',
        light: '#E9EAF2',
        lighter: '#e5e5e5',
        'light-dark': '#424242',
        dark: '#292929',
        creamy: '#BDB7AA',
        'creamy-dark': '#282623',
      },
      slate: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
      },
      purple: {
        300: '#D285FD',
        400: '#A66DFD',
      },
      white: '#FCFCFC',
      black: '#000',
      darkgreen: '#356737',
      green: {
        DEFAULT: '#4DB350',
        100: '#dcfce7',
        dark: '#356737',
        darker: '#253D26',
        faded: '#6DA36F',
        cta: '#39a23c',
      },
      'bidstacker-green': '#275d2b',
    },
  },
  plugins: [],
};
