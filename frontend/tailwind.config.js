/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors:{
        bgWhite:'#ffffff'
      },
      screens:{
       'mobile': '400px',  //  📱  Mobile (até 640px)
        'tablet': '1024px', //  📲  Tablet (1024px)
        'hd': '1200px',     //  💻  HD (1366px)
        'fullhd': '1920px', //  🖥️  Full HD (1920px)
      }
    },

  },
  plugins: [
    flowbite.plugin(),
  ],
}

