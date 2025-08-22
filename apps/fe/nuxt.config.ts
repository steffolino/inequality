import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxt/image'],
  app: {
    head: {
      title: 'Inequality in the BRD',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Mobile-first statistics visualisation with sharable URL state.' },        
      ],
      link: [
        { rel: 'icon', href: '/favicon_light.svg', media: '(prefers-color-scheme: light)' },
        { rel: 'icon', href: '/favicon_dark.svg', media: '(prefers-color-scheme: dark)' }
      ]
    }
  },
  routeRules: {
    '/': { prerender: true },
    '/stats': { ssr: false },
    '/profile': { ssr: false },
    '/about': { ssr: false },
    '/privacy': { ssr: false },
    '/imprint': { ssr: false },
    'demo-sim': { ssr: false },
  },
  runtimeConfig: {
    public: {
      appName: 'Inequality in the BRD',
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    },
  },
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css']
  },
  nitro: {
    prerender: { routes: ['/'] }
  }
})