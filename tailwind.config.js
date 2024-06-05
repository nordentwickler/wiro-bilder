module.exports = {
  mode: 'jit',
  content: [
    './templates/**/*.twig',
    './src/**/*.{js,jsx,ts,tsx,vue,scss}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Aller', 'sans-serif'],
        display: ['"Aller Display"', 'sans-serif'],
      },
      aspectRatio: {
        '3/2': '3 / 2',
      },
      colors:{
        'wiro-red': '#df0019',
        'wiro-red-hover': '#af0014',
        'ihk-blue': '#245e8e',
        'ihk-green': '#afcc7a'
      }
    }
  },
  variants: {},
  plugins: []
}
