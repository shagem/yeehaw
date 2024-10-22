import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          light: '',
          DEFAULT: '',
          dark: ''
        },
        'secondary': {
          light: '',
          DEFAULT: '',
          dark: ''
        },
        'off-white': {
          light: '',
          DEFAULT: '#faf9f6',
          dark: '#ebebe6'
        },
      },
      fontFamily: {
        
      },
    },
  },
  plugins: [],
};
export default config;
