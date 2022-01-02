module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e2293f', // red
        secondary: '#1d1c1cd9', // black
        tertiary: 'var(--tertiary-color)', // yellow
        'tertiary-light': 'hsl(44deg 97% 52%)', // light yellow
      },
    },
  },
  plugins: [],
};
