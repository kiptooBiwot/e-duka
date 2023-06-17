/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter'],
        sans: ['Inter'],
        title: ['Nunito'],
        display: ['Inter'],
        serif: ['Inter']
      }
    },
  },
  plugins: [],
}

