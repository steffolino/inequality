<template>
  <header class="sticky top-0 z-40 bg-base-100/90 backdrop-blur supports-[backdrop-filter]:bg-base-100/70 border-b border-base-200" role="banner">
    <div class="flex items-center gap-2 px-4 h-14">
      <button type="button" class="btn btn-ghost btn-sm px-2" aria-label="Open menu" @click="$emit('open-nav')">
        <Icon name="tabler:menu-2" class="text-xl" />
      </button>
      <h1 class="text-base font-semibold line-clamp-1" :title="title">{{ title }}</h1>
      <div class="ml-auto flex items-center gap-1">
        <NuxtLink to="/stats" class="btn btn-ghost btn-sm px-2" aria-label="Stats">
          <Icon name="tabler:chart-area-line" class="text-xl" />
        </NuxtLink>
        <button type="button" class="btn btn-ghost btn-sm px-2" aria-label="Actions" @click="$emit('open-actions')">
          <Icon name="tabler:dots-vertical" class="text-xl" />
        </button>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
defineProps<{ title: string }>(); defineEmits<{(e:'open-nav'):void,(e:'open-actions'):void}>()
</script>