<template>
  <span class="relative inline-flex align-baseline">
    <button
      ref="btn"
      type="button"
      class="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px] leading-none
             focus:outline-none focus-visible:ring
             /* DaisyUI (if present) */ border-base-300 text-base-content/70 hover:text-base-content focus-visible:ring-primary
             /* Plain Tailwind fallbacks */ border-gray-300 text-gray-600 hover:text-gray-900 focus-visible:ring-blue-500
             dark:text-gray-300 dark:hover:text-white"
      :aria-label="ariaLabel || 'More info'"
      :aria-expanded="open ? 'true' : 'false'"
      :aria-controls="idAttr"
      @click="toggle"
      @keydown.esc.prevent="open = false"
    >?</button>

    <transition name="fade">
      <teleport to="body" v-if="open">
        <div
          :id="idAttr"
          role="tooltip"
          :style="panelStyle"
          class="fixed z-[9999] w-72 max-w-[90vw] rounded-2xl p-3 text-sm shadow-xl ring-1
                 /* DaisyUI first */ bg-base-100 text-base-content ring-base-300/60
                 /* Tailwind fallbacks */ bg-white text-gray-900 ring-gray-200
                 dark:bg-gray-900 dark:text-gray-50 dark:ring-gray-700"
        >
          <header v-if="title" class="mb-1 font-semibold">{{ title }}</header>
          <slot />
          <footer v-if="source" class="mt-2 text-xs opacity-70">
            Source:
            <a
              class="underline underline-offset-2"
              :href="source"
              target="_blank"
              rel="noreferrer noopener"
            >{{ sourceLabel || 'External link' }}</a>
          </footer>
        </div>
      </teleport>
    </transition>
  </span>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  title?: string
  ariaLabel?: string
  source?: string
  sourceLabel?: string
  id?: string
}>()

const open = ref(false)
const btn = ref<HTMLElement | null>(null)
const idAttr = computed(() => props.id ?? `tt-${Math.random().toString(36).slice(2)}`)
const panelStyle = ref<Record<string, string>>({})

function positionPanel () {
  const el = btn.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const panelW = 320 // ~ w-72
  const gap = 8
  let left = r.left
  if (left + panelW > window.innerWidth - 8) left = Math.max(8, window.innerWidth - panelW - 8)
  if (left < 8) left = 8
  const top = r.bottom + gap
  panelStyle.value = { left: `${left}px`, top: `${Math.min(top, window.innerHeight - 16)}px` }
}

function toggle () {
  open.value = !open.value
  if (open.value) nextTick(positionPanel)
}

function handle() { if (open.value) positionPanel() }
onMounted(() => {
  window.addEventListener('resize', handle, { passive: true })
  window.addEventListener('scroll', handle, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handle)
  window.removeEventListener('scroll', handle)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .12s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
