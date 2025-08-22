<template>
  <section class="px-4 py-6 space-y-4">
    <h2 class="text-xl font-semibold">Welcome</h2>
    <p class="opacity-80">Mobile-first visualisation. Jump straight to stats.</p>
    <NuxtLink to="/stats" class="btn btn-primary">Go to Statistics</NuxtLink>
  </section>
</template>
<script setup lang="ts">
definePageMeta({ title: 'Home' })
</script>