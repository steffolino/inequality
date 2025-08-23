<template>
  <section class="relative overflow-hidden">
    <!-- Animated gradient backdrop -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 animate-gradient opacity-60 dark:opacity-40"
      aria-hidden="true"
    >
      <div class="h-full w-full gradient-bg"></div>
    </div>

    <div class="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <header class="space-y-3 md:text-center">
        <p
          v-if="eyebrow"
          class="text-xs font-semibold uppercase tracking-widest text-base-content/60"
        >
          {{ eyebrow }}
        </p>
        <h1
          v-if="title"
          class="text-3xl font-extrabold tracking-tight md:text-5xl"
        >
          {{ title }}
        </h1>
        <p
          v-if="subtitle"
          class="max-w-2xl text-base text-base-content/70 md:mx-auto md:text-lg"
        >
          {{ subtitle }}
        </p>
        <div
          v-if="$slots.actions"
          class="mt-3 flex flex-wrap gap-2 md:justify-center"
        >
          <slot name="actions" />
        </div>
      </header>

      <div v-if="$slots.default" class="mt-6">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ title?: string; subtitle?: string; eyebrow?: string }>()
</script>

<style scoped>
.gradient-bg {
  background:
    radial-gradient(
      60% 40% at 50% 0%,
      oklch(0.95 0.02 250) 0%,
      transparent 60%
    ),
    conic-gradient(
      from 0deg,
      oklch(0.9 0.05 230),
      oklch(0.9 0.07 20),
      oklch(0.9 0.06 140),
      oklch(0.9 0.05 230)
    );
  background-repeat: no-repeat;
  background-size: cover;
}

/* Animation */
@keyframes bg-pan {
  0% {
    filter: hue-rotate(0deg) saturate(110%);
  }
  50% {
    filter: hue-rotate(25deg) saturate(120%);
  }
  100% {
    filter: hue-rotate(0deg) saturate(110%);
  }
}
.animate-gradient {
  animation: bg-pan 16s ease-in-out infinite;
}
</style>
