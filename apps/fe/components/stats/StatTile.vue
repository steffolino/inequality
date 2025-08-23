<!-- components/ui/StatTile.vue -->
<template>
  <div class="rounded-xl border border-base-300/60 bg-base-100 p-4 shadow-sm">
    <div class="text-xs uppercase tracking-wide text-base-content/60">{{ label }}</div>
    <div class="mt-1 text-2xl font-bold">{{ value }}</div>
    <div v-if="hint" class="mt-1 text-xs text-base-content/60">{{ hint }}</div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ label: string; value: string | number; hint?: string }>()
</script>
