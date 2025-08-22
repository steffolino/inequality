<template>
  <div ref="el" class="w-full"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import embed from 'vega-embed'

const props = defineProps<{
  spec: any
  actions?: boolean | { export?: boolean; source?: boolean; editor?: boolean }
}>()

const el = ref<HTMLElement | null>(null)
let view: any = null
let renderToken = 0

async function render() {
  const token = ++renderToken
  try {
    if (view) {
      try { view.finalize() } catch {}
      view = null
    }
    if (!el.value) return

    el.value.innerHTML = ''

    const result = await embed(el.value, props.spec, {
      mode: 'vega-lite',
      actions: props.actions ?? { export: true, source: false, editor: false },
      renderer: 'canvas',
      hover: true
    })
    if (token !== renderToken) {
      try { result.view.finalize() } catch {}
      return
    }
    view = result.view
    await view.runAsync()
  } catch (e) {
    console.error('[VegaLite] render error:', e)
  }
}

onMounted(render)
watch(() => props.spec, render, { deep: true })

onBeforeUnmount(() => {
  if (view) {
    try { view.finalize() } catch {}
    view = null
  }
})
</script>
