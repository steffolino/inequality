<template>
  <nav class="border-b border-base-200 bg-base-100" role="navigation" aria-label="Desktop">
    <!-- Light logo (shown in light mode) -->
    <div class="mx-auto max-w-6xl px-4 h-12 flex items-center gap-2">
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
      <NuxtLink v-for="item in items" :key="item.to" :to="item.to"
        class="px-3 py-1.5 rounded-md text-sm"
        :class="route.path===item.to ? 'bg-base-200 text-base-content' : 'text-base-content/80 hover:text-base-content hover:bg-base-200'">
        <Icon :name="item.icon" class="text-base mr-1 align-[-2px]" /> {{ item.label }}
      </NuxtLink>
      <div class="ml-auto flex items-center gap-2">
        <button class="btn btn-sm btn-ghost" @click="toggleDarkMode()">
          Dark mode
        </button>
          <Icon name="tabler:dots-vertical" class="text-lg" />
        <NuxtLink to="/stats" class="btn btn-sm btn-primary">Open Stats</NuxtLink>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { useRoute } from 'nuxt/app';
const route = useRoute();
const items = [
  { to: '/', label: 'Home', icon: 'tabler:home-2' },
  { to: '/explore', label: 'Explore', icon: 'tabler:compass' },
  { to: '/stats', label: 'Stats', icon: 'tabler:chart-line' },
  { to: '/profile', label: 'Profile', icon: 'tabler:user' }
]

function toggleDarkMode() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'inequality_dark' ? 'inequality_light' : 'inequality_dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}
</script>