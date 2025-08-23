<template>
  <div class="min-h-dvh bg-base-100 text-base-content" :data-theme="theme">
    <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:inset-x-0 focus:top-0 focus:m-2 focus:rounded-lg focus:bg-base-100 focus:p-3 focus:shadow">Skip to content</a>

    <!-- Top bar -->
    <nav class="sticky top-0 z-40 border-b border-base-300/60 bg-base-100/90 backdrop-blur">
      <div class="mx-auto flex h-12 max-w-6xl items-center gap-3 px-4">
        <NuxtLink to="/" class="flex items-center gap-2 font-semibold no-underline">
          <NuxtImg src="/img/logo_light.svg" alt="Logo" width="28" height="28" class="h-7 w-7 dark:hidden" />
          <NuxtImg src="/img/logo_dark.svg" alt="Logo" width="28" height="28" class="hidden h-7 w-7 dark:block" />
          <span>inequality</span>
        </NuxtLink>

        <div class="ml-auto flex items-center gap-1">
          <NuxtLink to="/stats" class="btn btn-ghost btn-sm">Statistics</NuxtLink>
          <NuxtLink to="/explore" class="btn btn-ghost btn-sm">Explore</NuxtLink>
          <button class="btn btn-outline btn-sm" @click="toggleTheme" aria-label="Toggle theme">Theme</button>
        </div>
      </div>
    </nav>

    <!-- Optional Page Hero (subpages can opt-in with slot="hero") -->
    <div v-if="$slots.hero" class="relative">
      <div class="pointer-events-none absolute inset-0 -z-10 animate-gradient opacity-50 dark:opacity-40">
        <div class="h-full w-full bg-[radial-gradient(60%_40%_at_50%_0%,_oklch(0.95_0.02_250)_0%,_transparent_60%),_conic-gradient(from_0deg,_oklch(0.9_0.05_230),_oklch(0.9_0.07_20),_oklch(0.9_0.06_140),_oklch(0.9_0.05_230))]"></div>
      </div>
      <div class="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <slot name="hero" />
      </div>
    </div>

    <!-- Page Header -->
    <header v-if="$route.meta?.title" class="border-b border-base-300/60">
      <div class="mx-auto max-w-6xl px-4 py-6">
        <nav aria-label="Breadcrumb" class="text-xs text-base-content/60">
          <ol class="flex items-center gap-2">
            <li><NuxtLink to="/" class="link link-hover">Home</NuxtLink></li>
            <li aria-hidden="true">/</li>
            <li class="text-base-content/70">{{ $route.meta.title }}</li>
          </ol>
        </nav>
        <h1 class="mt-2 text-2xl font-bold md:text-3xl">{{ $route.meta.title }}</h1>
        <p v-if="$route.meta?.subtitle" class="mt-1 max-w-2xl text-sm text-base-content/70">
          {{ $route.meta.subtitle }}
        </p>
      </div>
    </header>

    <!-- Content grid -->
    <main id="main" class="mx-auto max-w-6xl px-4 py-6 md:py-8">
      <div class="grid grid-cols-1 gap-6">
        <article class="space-y-6">
          <slot />
        </article>

      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-base-300/60">
      <div class="mx-auto grid max-w-6xl gap-3 px-4 py-6 text-sm text-base-content/70 md:grid-cols-3">
        <div>&copy; {{ new Date().getFullYear() }} inequalityInTheBRD</div>
        <div class="md:text-center">
          <NuxtLink to="/impressum" class="link link-hover">Imprint</NuxtLink>
          <span class="mx-2">·</span>
          <NuxtLink to="/datenschutz" class="link link-hover">Privacy</NuxtLink>
        </div>
        <div class="md:text-right">
          <button class="btn btn-ghost btn-xs" @click="openCookiePrefs">Cookie settings</button>
        </div>
      </div>
    </footer>

    <CookieConsent />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CookieConsent from '../components/ui/CookieConsent.vue'

const theme = ref<string | undefined>(undefined)

function toggleTheme() {
  if (!theme.value) {
    // First toggle: read current theme from DOM
    const html = document.documentElement
    theme.value = html.getAttribute('data-theme') || 'inequality_light';
    html.classList.toggle('dark', theme.value === 'inequality_dark') // <-- required for Tailwind `dark:` utilities
  }
  theme.value = theme.value === 'inequality_dark' ? 'inequality_light' : 'inequality_dark';
  
}

function openCookiePrefs() {
  // Re-dispatch a synthetic click on the banner "Manage" if present
  // Or open the modal via a global event:
  const evt = new Event('open-cookie-prefs')
  window.dispatchEvent(evt)
}
</script>

<style scoped>
@keyframes bg-pan {
  0% { filter: hue-rotate(0deg) saturate(110%); }
  50% { filter: hue-rotate(25deg) saturate(120%); }
  100% { filter: hue-rotate(0deg) saturate(110%); }
}
.animate-gradient { animation: bg-pan 16s ease-in-out infinite; }
</style>
