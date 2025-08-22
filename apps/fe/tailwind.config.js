/** @type {import('tailwindcss').Config} */

import { silk, black } from 'daisyui/src/theming/themes'

module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}'
  ],
  theme: { extend: {} },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        inequality_light: {
          ...silk,
        }
      },
      {
        inequality_dark: {
          ...black,
        }
      }
    ]
  }
}