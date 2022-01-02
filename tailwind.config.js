module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e2293f', // red
        secondary: '#1d1c1cd9', // black
        tertiary: 'hsl(44deg 97% 48%)', // yellow
        'tertiary-light': 'hsl(44deg 97% 52%)', // light yellow
      },
    },
  },
  plugins: [],
};
