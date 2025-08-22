<template>
  <div class="min-h-dvh bg-base-100 text-base-content" data-theme="avefi_light">
    <a href="#main" class="sr-only ...">Skip to content</a>

    <!-- aus <MobileHeader> wird: -->
    <UiMobileHeader class="block md:hidden" :title="pageTitle" @open-nav="navOpen = true" @open-actions="openActions" />

    <!-- Desktop-Nav einblenden -->
    <UiDesktopNavBar class="hidden md:block" />

    <main id="main">
      <slot />
    </main>

    <!-- aus <BottomTabBar> wird: -->
    <UiBottomTabBar class="md:hidden" />

    <!-- aus <FiltersDrawer> wird: -->
    <StatsFiltersDrawer v-model:open="navOpen" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const pageTitle = computed(() => (route.meta?.title as string) || 'App')
const navOpen = ref(false)
function openActions(){ navigator.vibrate?.(10) }
</script>