<template>
  <div ref="root" class="w-full"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import embed from 'vega-embed'

const props = defineProps<{
  spec: any
  actions?: boolean | { export?: boolean; source?: boolean; editor?: boolean }
}>()

const root = ref<HTMLElement | null>(null)
let view: any = null
let mql: MediaQueryList | null = null

function deepClone(v: any) { return JSON.parse(JSON.stringify(v ?? {})) }

function sanitize(specIn: any) {
  const spec = deepClone(specIn)
  // Guard: remove root-level params to avoid duplicate signal names across re-embeds
  if (Array.isArray(spec.params)) delete spec.params
  // Don’t touch encodings/selection inside transforms etc.
  return spec
}

async function render() {
  if (!root.value || !props.spec) return
  const spec = sanitize(props.spec)
  // Theme toggling: let Vega pick up CSS vars without explicit color overrides
  if (view) await view.finalize()
  const result = await embed(root.value, spec, {
    actions: props.actions ?? { export: true, source: false, editor: false },
    renderer: 'canvas',
    tooltip: true
  })
  view = result.view
  await view.runAsync()
}

function onPrefChange() { render() }

onMounted(() => {
  mql = window.matchMedia('(prefers-color-scheme: dark)')
  mql.addEventListener?.('change', onPrefChange)
  render()
})
onBeforeUnmount(async () => {
  mql?.removeEventListener?.('change', onPrefChange)
  if (view) await view.finalize()
})

watch(() => props.spec, () => render(), { deep: true })
</script>
