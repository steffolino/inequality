<template>
  <nav class="fixed bottom-0 inset-x-0 z-40 border-t border-base-200 bg-base-100" role="navigation" aria-label="Primary">
    <ul class="grid grid-cols-4 gap-0 h-14 pb-[env(safe-area-inset-bottom)]">
      <li v-for="item in items" :key="item.to" class="contents">
        <NuxtLink :to="item.to" class="flex flex-col items-center justify-center text-xs" :aria-label="item.label" :class="linkClass(item.to)">
          <Icon :name="item.icon" class="text-xl mb-0.5" /><span class="leading-none">{{ item.label }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
const route = useRoute()
const items = [
  { to: '/', label: 'Home', icon: 'tabler:home-2' },
  { to: '/explore', label: 'Explore', icon: 'tabler:compass' },
  { to: '/stats', label: 'Stats', icon: 'tabler:chart-line' },
  { to: '/profile', label: 'Profile', icon: 'tabler:user' }
]
function linkClass(to){ return route.path===to ? 'text-primary font-medium' : 'text-base-content/70 hover:text-base-content' }
</script>
<style scoped> a{ padding-inline:2px } </style>