<!-- components/ui/SectionCard.vue -->
<template>
  <section class="rounded-2xl border border-base-300/60 bg-base-100/70 p-4 shadow-sm backdrop-blur md:p-6">
    <header v-if="title || caption" class="mb-3 md:mb-4">
      <h2 v-if="title" class="text-lg font-semibold md:text-xl">{{ title }}</h2>
      <p v-if="caption" class="mt-1 text-sm text-base-content/70">{{ caption }}</p>
    </header>
    <div class="space-y-3">
      <slot />
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps<{ title?: string; caption?: string }>()
</script>
