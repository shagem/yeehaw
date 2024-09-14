/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../index.htm"],
  theme: {
    extend: {
      colors: {
        white: '#fafafa',
        black: '#1a1a1a',
        primaryRed: '#ff2525',
        primaryBlue: '#139df2',
        primaryGreen: '#2bff47',
        primaryPurple: '#8338ec',
        primaryYellow: '#ffff00'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        patrick: ['Patrick Hand', 'cursive']
      },
      fontWeight: {
        hairline: '100',
        thin: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },

    },
  },
  plugins: [],
}

