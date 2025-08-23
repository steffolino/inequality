import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  compatibilityDate: '2025-08-01',
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
    '~': fileURLToPath(new URL('./', import.meta.url)),
  },
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
    '/': { prerender: true, ssr: false },
    '/stats': { ssr: false },
    '/explore': { ssr: false },
    '/profile': { ssr: false },
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

  // Load ONLY your other css; Tailwind will be injected via the module's cssPath
  css: ['~/assets/css/cookiecontrol.css'],

  // Tell the Tailwind module which file has the @tailwind directives
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  nitro: {
    prerender: { routes: ['/'] }
  }
})
