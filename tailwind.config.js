/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx,jsx}',
    './app.{js,ts,tsx,jsx}',
    './app/**/*.{js,ts,tsx,jsx}',
    './components/**/*.{js,ts,tsx,jsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#904a4b',
        'on-primary': '#FFFFFF',
        background: '#FFF8F7',
        'on-background': '#221919',
        outline: '#857372',
        'outline-variant': '#D7C1C1',
        error: '#BA1A1A',
        'on-error': '#FFFFFF',
        'error-container': '#FFDAD6',
        'on-error-container': '#93000A',
        'primary-container': '#FFDAD9',
        'on-primary-container': '#733335',
      },
    },
  },
  plugins: [],
};
