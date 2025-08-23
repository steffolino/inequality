<template>
  <nav class="border-b border-base-200 bg-base-100" role="navigation" aria-label="Desktop">
    <div class="mx-auto max-w-6xl px-4 h-12 flex items-center gap-2">
      <!-- Light logo (shown in light mode) -->
      <NuxtImg
        src="/img/logo_light.svg"
        alt="Logo"
        width="32"
        height="32"
        class="h-8 w-8 dark:hidden"
      />
      <!-- Dark logo (shown in dark mode) -->
      <NuxtImg
        src="/img/logo_dark.svg"
        alt="Logo"
        width="32"
        height="32"
        class="h-8 w-8 hidden dark:block"
      />

      <NuxtLink
        v-for="item in items" :key="item.to" :to="item.to"
        class="px-3 py-1.5 rounded-md text-sm"
        :class="route.path===item.to ? 'bg-base-200 text-base-content' : 'text-base-content/80 hover:text-base-content hover:bg-base-200'">
        <Icon :name="item.icon" class="text-base mr-1 align-[-2px]" /> {{ item.label }}
      </NuxtLink>

      <div class="ml-auto flex items-center gap-2">
        <button class="btn btn-sm btn-ghost" @click="toggleDarkMode" aria-label="Toggle dark mode">
          Dark mode
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'nuxt/app'

const route = useRoute()

const items = [
  { to: '/', label: 'Home', icon: 'tabler:home-2' },
  { to: '/explore', label: 'Explore', icon: 'tabler:compass' },
  { to: '/stats', label: 'Stats', icon: 'tabler:chart-line' },
]

function applyTheme(theme: string) {
  const html = document.documentElement
  html.setAttribute('data-theme', theme) // e.g. "inequality_dark" | "inequality_light"
  const isDark = theme === 'inequality_dark'
  html.classList.toggle('dark', isDark)  // <-- required for Tailwind `dark:` utilities
}

function toggleDarkMode() {
  const html = document.documentElement
  const current = html.getAttribute('data-theme') || 'inequality_light'
  const next = current === 'inequality_dark' ? 'inequality_light' : 'inequality_dark'
  applyTheme(next)
  localStorage.setItem('theme', next)
}

onMounted(() => {
  const saved = localStorage.getItem('theme') || 'inequality_light'
  applyTheme(saved)
})
</script>
