/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors :{
        primary: '#ACD25F',
        unactive: '#303030',
        'dark-section': '#444141',
      },
      backgroundImage: {
        'grey-noise': "url('/img/grey-noise.png')",
      },
      boxShadow: {
        'card-shadow': '2px 2px 10px 0px rgba(0, 0, 0, 0.20)'
      }
    },
  },
  plugins: [],
}
