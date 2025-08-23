<!-- components/layout/SiteFooter.vue -->
<template>
  <footer class="border-t border-base-200 bg-base-100 text-base-content">
    <div class="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row md:justify-between gap-6">
      <!-- Brand -->
      <div>
        <NuxtLink to="/" class="inline-flex items-center gap-2">
          <NuxtImg src="/img/logo_light.svg" alt="Logo" width="32" height="32" class="h-8 w-8 dark:hidden" />
          <NuxtImg src="/img/logo_dark.svg" alt="Logo (dark)" width="32" height="32" class="h-8 w-8 hidden dark:block" />
          <span class="font-semibold text-lg">{{ siteName }}</span>
        </NuxtLink>
        <p v-if="tagline" class="text-sm opacity-70 mt-2">{{ tagline }}</p>
      </div>

      <!-- Legal Links -->
      <nav class="flex gap-6 text-sm">
        <NuxtLink to="/impressum" class="hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/40 rounded px-1 py-0.5">
          Impressum
        </NuxtLink>
        <NuxtLink to="/datenschutz" class="hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/40 rounded px-1 py-0.5">
          Datenschutz
        </NuxtLink>
      </nav>

      <!-- Social -->
      <div class="flex gap-3">
        <a
          v-for="s in socials"
          :key="s.label"
          :href="s.href"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/40 rounded p-1"
          :aria-label="s.label"
        >
          <Icon :name="s.icon" class="w-5 h-5" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface Social { label: string; href: string; icon: string }

const props = withDefaults(defineProps<{
  siteName?: string
  tagline?: string
  socials?: Social[]
}>(), {
  siteName: 'inequalityInTheBRD',
  tagline: 'Transparente Daten. Nachvollziehbare Methoden.',
  socials: () => ([
    { label: 'GitHub', href: 'https://github.com/yourorg/yourrepo', icon: 'tabler:brand-github' },
  ]),
})
</script>
