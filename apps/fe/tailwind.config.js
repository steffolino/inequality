/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}',
  ],
  darkMode: ['class', '[data-theme="inequality_dark"]'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        inequality_light: {
          /* silk theme (hard-coded) */
          primary: '#1C1917', // pick your preferred "primary"
          secondary: '#2563eb',
          accent: '#16a34a',
          neutral: '#3d4451',
          'base-100': '#ffffff',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
        },
      },
      {
        inequality_dark: {
          /* black theme (hard-coded) */
          primary: '#ffffff',
          secondary: '#737373',
          accent: '#fbbf24',
          neutral: '#191D24',
          'base-100': '#000000',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
        },
      },
    ],
    styled: true,
    base: true,
    utils: true,
    logs: true,
    prefix: "",
    darkTheme: "inequality_dark",
  },
}
