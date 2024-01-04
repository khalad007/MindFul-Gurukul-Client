/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
  extend: {
    colors: {
      "gray60": "#ECE3CE",
      "green-fade": "#739072",
      "green-medium": "#4F6F52",
      "green-dark": "#3A4D39"
    }
  },
},
  daisyui: {
  themes: [],
},
plugins: [require("daisyui")],
}