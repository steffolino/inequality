<template>
  <div v-if="ready" class="cc-root">
    <!-- Banner -->
    <aside
      v-if="showBanner"
      class="fixed inset-x-0 bottom-0 z-50"
      role="region"
      aria-label="Cookie consent"
    >
      <div
        class="mx-auto max-w-5xl rounded-t-2xl border border-base-300 bg-base-100/95 shadow-xl backdrop-blur md:rounded-2xl md:mb-4"
      >
        <div class="grid gap-4 p-4 md:grid-cols-[1fr_auto] md:items-center md:p-5">
          <div>
            <h2 class="text-base font-semibold">Cookies & privacy</h2>
            <p class="mt-1 text-sm text-base-content/70">
              We use essential cookies to run the site. Optional cookies help us improve
              analytics and content. You can change your choices any time.
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-end gap-2">
            <button class="btn btn-ghost btn-sm" @click="openPrefs" aria-haspopup="dialog">
              Manage choices
            </button>
            <button class="btn btn-outline btn-sm" @click="rejectAll">
              Reject non‑essential
            </button>
            <button class="btn btn-primary btn-sm" @click="acceptAll">
              Accept all
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Preferences Modal -->
    <dialog ref="dialogRef" class="modal">
      <div class="modal-box max-w-2xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-3 top-3" aria-label="Close">
            ✕
          </button>
        </form>

        <header class="space-y-1">
          <h3 class="text-lg font-semibold">Cookie preferences</h3>
          <p class="text-sm text-base-content/70">
            Choose which categories to allow. Your selection will be saved on this device.
          </p>
        </header>

        <section class="mt-4 space-y-3">
          <!-- Essential (locked) -->
          <label class="flex items-start justify-between gap-3 rounded-xl border border-base-300 bg-base-100 p-3">
            <div>
              <div class="font-medium">Essential</div>
              <p class="text-xs text-base-content/70">
                Required for basic site functionality (cannot be disabled).
              </p>
            </div>
            <input type="checkbox" class="toggle toggle-primary" checked disabled aria-label="Essential enabled" />
          </label>

          <!-- Analytics -->
          <label class="flex items-start justify-between gap-3 rounded-xl border border-base-300 bg-base-100 p-3">
            <div>
              <div class="font-medium">Analytics</div>
              <p class="text-xs text-base-content/70">
                Anonymous usage metrics to improve performance and usability.
              </p>
            </div>
            <input
              type="checkbox"
              class="toggle"
              :checked="prefs.analytics"
              @change="prefs.analytics = !prefs.analytics"
              aria-label="Analytics toggle"
            />
          </label>

          <!-- Marketing -->
          <label class="flex items-start justify-between gap-3 rounded-xl border border-base-300 bg-base-100 p-3">
            <div>
              <div class="font-medium">Marketing</div>
              <p class="text-xs text-base-content/70">
                Content personalization or 3rd‑party embeds that may track across sites.
              </p>
            </div>
            <input
              type="checkbox"
              class="toggle"
              :checked="prefs.marketing"
              @change="prefs.marketing = !prefs.marketing"
              aria-label="Marketing toggle"
            />
          </label>
        </section>

        <div class="mt-5 flex flex-wrap items-center justify-end gap-2">
          <button class="btn btn-ghost" @click="closePrefs">Cancel</button>
          <button class="btn btn-outline" @click="rejectNonEssential">Save (essential only)</button>
          <button class="btn btn-primary" @click="savePrefs">Save preferences</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button aria-label="Close preferences"></button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

type ConsentPrefs = {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

const STORAGE_KEY = 'cookie-consent:v1'
const ready = ref(false)
const showBanner = ref(false)
const prefs = ref<ConsentPrefs>({ essential: true, analytics: false, marketing: false })
const dialogRef = ref<HTMLDialogElement | null>(null)

function getStored(): ConsentPrefs | null {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return s ? (JSON.parse(s) as ConsentPrefs) : null
  } catch { return null }
}
function store(p: ConsentPrefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
  // Emit a custom event so analytics/embeds can react
  window.dispatchEvent(new CustomEvent('cookie-consent:update', { detail: p }))
}

function acceptAll() {
  const p = { essential: true, analytics: true, marketing: true }
  prefs.value = p
  store(p)
  showBanner.value = false
}
function rejectAll() {
  const p = { essential: true, analytics: false, marketing: false }
  prefs.value = p
  store(p)
  showBanner.value = false
}
function rejectNonEssential() { rejectAll() }
function savePrefs() {
  prefs.value.essential = true
  store(prefs.value)
  showBanner.value = false
  closePrefs()
}
function openPrefs() { dialogRef.value?.showModal() }
function closePrefs() { dialogRef.value?.close() }

onMounted(() => {
  // Respect Do Not Track: if enabled, default to essential only
  const dnt = navigator.doNotTrack === '1' || (window as any).doNotTrack === '1'
  const existing = getStored()
  if (existing) {
    prefs.value = existing
    showBanner.value = false
  } else {
    prefs.value = dnt ? { essential: true, analytics: false, marketing: false } : prefs.value
    showBanner.value = true
  }
  // Safe ready flag
  ready.value = true
})
</script>

<style scoped>
/* Soft highlight ring to match your gradient mood */
.cc-root :is(.btn-primary) {
  box-shadow: 0 8px 24px var(--cc-shadow, color-mix(in oklab, var(--fallback-p,oklch(0.7 0.1 260)) 30%, transparent));
}
</style>
