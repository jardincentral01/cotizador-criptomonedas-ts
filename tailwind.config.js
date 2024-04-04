/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        
    },
  },
  plugins: [
    plugin(function({addBase}){
        addBase({
            'html': {
                'font-size': '62.5%'
            }
        })
    })
  ],
}

