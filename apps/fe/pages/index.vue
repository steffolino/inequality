<template>
  <section class="relative overflow-hidden">
    <!-- Hero -->
     <UiHeroStrip
      eyebrow="Mobile‑first insights"
      title="See inequality clearly—fast."
      subtitle="Explore transparent statistics, compare regions, and share views."
    >
      <template #actions>
        <NuxtLink to="/stats" class="btn btn-primary btn-lg no-underline">Go to Statistics</NuxtLink>
        <NuxtLink to="/explore" class="btn btn-ghost btn-lg no-underline">Explore</NuxtLink>
      </template>
    </UiHeroStrip>

    <!-- Features -->
    <div id="features" class="border-t border-base-300/60 bg-base-100/60">
      <div class="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 class="text-xl font-semibold md:text-2xl">What to expect</h2>
        <p class="mt-1 text-base opacity-80">
          Clean, reproducible stats with transparent sources and shareable views.
        </p>

        <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article class="group card border border-base-300/60 bg-base-100 shadow-sm transition-all hover:shadow-md reveal">
            <div class="card-body">
              <div class="flex items-start gap-3">
                <div class="rounded-xl bg-primary/10 p-2">
                  <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19h16M4 5l8 7 8-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </div>
                <div>
                  <h3 class="text-base font-semibold">Interactive charts</h3>
                  <p class="mt-1 text-sm text-base-content/70">
                    Pin, zoom, and filter by timeframes and regions. Save states via URL.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article class="group card border border-base-300/60 bg-base-100 shadow-sm transition-all hover:shadow-md reveal" style="--reveal-delay:80ms">
            <div class="card-body">
              <div class="flex items-start gap-3">
                <div class="rounded-xl bg-secondary/10 p-2">
                  <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M5 12a7 7 0 1114 0 7 7 0 01-14 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </div>
                <div>
                  <h3 class="text-base font-semibold">Transparent methods</h3>
                  <p class="mt-1 text-sm text-base-content/70">
                    Clear assumptions &amp; sources (Eurostat, Destatis, WID). Re‑runnable logic.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article class="group card border border-base-300/60 bg-base-100 shadow-sm transition-all hover:shadow-md reveal" style="--reveal-delay:160ms">
            <div class="card-body">
              <div class="flex items-start gap-3">
                <div class="rounded-xl bg-accent/10 p-2">
                  <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7h18M6 12h12M9 17h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </div>
                <div>
                  <h3 class="text-base font-semibold">Shareable presets</h3>
                  <p class="mt-1 text-sm text-base-content/70">
                    Copy permalinks for any view. Embed charts in posts or reports.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article class="group card border border-base-300/60 bg-base-100 shadow-sm transition-all hover:shadow-md reveal" style="--reveal-delay:240ms">
            <div class="card-body">
              <div class="flex items-start gap-3">
                <div class="rounded-xl bg-primary/10 p-2">
                  <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 6v12m6-6H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </div>
                <div>
                  <h3 class="text-base font-semibold">Compare scenarios</h3>
                  <p class="mt-1 text-sm text-base-content/70">
                    Simulate policy changes and see who gains—instantly.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article class="group card border border-base-300/60 bg-base-100 shadow-sm transition-all hover:shadow-md reveal" style="--reveal-delay:320ms">
            <div class="card-body">
              <div class="flex items-start gap-3">
                <div class="rounded-xl bg-secondary/10 p-2">
                  <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 6h8m-4 12V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </div>
                <div>
                  <h3 class="text-base font-semibold">Region‑aware</h3>
                  <p class="mt-1 text-sm text-base-content/70">
                    State &amp; district breakdowns with consistent baselines.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article class="group card border border-base-300/60 bg-base-100 shadow-sm transition-all hover:shadow-md reveal" style="--reveal-delay:400ms">
            <div class="card-body">
              <div class="flex items-start gap-3">
                <div class="rounded-xl bg-accent/10 p-2">
                  <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </div>
                <div>
                  <h3 class="text-base font-semibold">Smooth UX</h3>
                  <p class="mt-1 text-sm text-base-content/70">
                    Fast loads, subtle motion, keyboard &amp; screen‑reader friendly.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div class="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-between">
          <NuxtLink to="/stats" class="btn btn-primary no-underline">
            Show statistics with general and personal outcomes
          </NuxtLink>
          <NuxtLink to="/explore" class="btn btn-primary no-underline">
            Explore interactive charts, data sources and get furhter information
          </NuxtLink>
          <p class="text-sm text-base-content/60">
            Tip: Use the share button on charts to copy a permalink to your current view.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({ title: 'Home' })

import { onMounted, onBeforeUnmount, ref } from 'vue'

/**
 * Lightweight parallax: tracks mouse on desktop and tilts the background dots.
 * Disabled for reduced motion and on touch devices (no listener added).
 */
const parallaxStyle = ref<Record<string, string>>({})
let onMove: ((e: MouseEvent) => void) | null = null

onMounted(() => {
  const preferReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  // Reveal-on-scroll observer
  const io = new IntersectionObserver(
    entries => {
      for (const e of entries) {
        if (e.isIntersecting) e.target.classList.add('reveal--in')
      }
    },
    { threshold: 0.15 }
  )
  document.querySelectorAll<HTMLElement>('.reveal').forEach(el => io.observe(el))

  // Parallax (desktop only, no reduced motion)
  if (!preferReduced && !isTouch) {
    onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 2 // -1..1
      const y = (e.clientY / innerHeight - 0.5) * 2
      parallaxStyle.value = {
        transform: `translate3d(${x * 10}px, ${y * 10}px, 0)`,
        transition: 'transform 160ms ease-out',
      }
    }
    window.addEventListener('mousemove', onMove)
  }

  onBeforeUnmount(() => {
    io.disconnect()
    if (onMove) window.removeEventListener('mousemove', onMove)
  })
})
</script>

<style scoped>
/* Hero gradient animation */
@keyframes bg-pan {
  0% { filter: hue-rotate(0deg) saturate(110%); }
  50% { filter: hue-rotate(25deg) saturate(120%); }
  100% { filter: hue-rotate(0deg) saturate(110%); }
}
.animate-gradient { animation: bg-pan 16s ease-in-out infinite; }

/* Reveal-on-scroll */
.reveal {
  opacity: 0;
  transform: translateY(10px) scale(0.995);
  will-change: transform, opacity;
  transition:
    opacity 500ms cubic-bezier(.2,.65,.3,1),
    transform 600ms cubic-bezier(.2,.65,.3,1);
  transition-delay: var(--reveal-delay, 0ms);
}
.reveal--in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Utility icon (fallback if no icon library is present) */
.i-lucide-sparkles::before {
  content: "✦";
  display: inline-block;
  line-height: 1;
}
</style>
