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
let themeObserver: MutationObserver | null = null
let mql: MediaQueryList | null = null

function deepClone(v: any) {
  return JSON.parse(JSON.stringify(v ?? {}))
}

function sanitizeSpec(inputSpec: any) {
  const spec = deepClone(inputSpec)
  if (Array.isArray(spec.params)) delete spec.params

  const stripTransforms = (obj: any) => {
    if (!obj) return
    if (Array.isArray(obj.transform)) {
      obj.transform = obj.transform.filter((t: any) => !(t && t.filter && t.filter.param))
      if (!obj.transform.length) delete obj.transform
    }
  }

  const stripEncodingConditions = (enc: any) => {
    if (!enc) return
    for (const ch of Object.keys(enc)) {
      const e = enc[ch]
      if (e && e.condition && e.condition.param) {
        if (typeof enc[ch].value !== 'undefined') {
          enc[ch] = { value: enc[ch].value }
        } else {
          delete enc[ch].condition
        }
      }
    }
  }

  const walk = (node: any) => {
    if (!node || typeof node !== 'object') return
    stripTransforms(node)
    if (node.encoding) stripEncodingConditions(node.encoding)
    if (Array.isArray(node.layer)) node.layer.forEach(walk)
    if (node.spec) walk(node.spec)
    if (Array.isArray(node.hconcat)) node.hconcat.forEach(walk)
    if (Array.isArray(node.vconcat)) node.vconcat.forEach(walk)
  }

  walk(spec)
  return spec
}

// --- Theme helpers ---
function parseRgb(str: string): { r: number, g: number, b: number } | null {
  const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
  if (!m) return null
  return { r: +m[1], g: +m[2], b: +m[3] }
}
function withAlpha(rgb: string, a: number) {
  const p = parseRgb(rgb)
  if (!p) return rgb
  return `rgba(${p.r}, ${p.g}, ${p.b}, ${Math.max(0, Math.min(1, a))})`
}
function mix(rgb: string, other: string, t: number) {
  const a = parseRgb(rgb), b = parseRgb(other)
  if (!a || !b) return rgb
  const mixc = (x: number, y: number) => Math.round(x * (1 - t) + y * t)
  return `rgb(${mixc(a.r, b.r)}, ${mixc(a.g, b.g)}, ${mixc(a.b, b.b)})`
}
function lightenForDark(rgb: string, t = 0.25) {
  return mix(rgb, 'rgb(255,255,255)', t)
}
function probeColorFromVar(rootEl: HTMLElement, cssVar: string) {
  const span = document.createElement('span')
  span.style.position = 'absolute'
  span.style.visibility = 'hidden'
  span.style.pointerEvents = 'none'
  span.style.backgroundColor = `oklch(var(${cssVar}))`
  rootEl.appendChild(span)
  const c = getComputedStyle(span).backgroundColor || ''
  span.remove()
  return c
}
function getRelativeLuminance(rgb: string) {
  const p = parseRgb(rgb)
  if (!p) return 1
  const lin = (u: number) => {
    const c = u / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }
  const r = lin(p.r), g = lin(p.g), b = lin(p.b)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function getThemePalette(rootEl: HTMLElement) {
  const cs = getComputedStyle(rootEl)
  const textColor = cs.color || 'rgb(75,85,99)'
  const baseBg = probeColorFromVar(rootEl, '--b1') || 'rgb(255,255,255)'
  const isDark = getRelativeLuminance(baseBg) < 0.45

  let palette = [
    probeColorFromVar(rootEl, '--p'),
    probeColorFromVar(rootEl, '--s'),
    probeColorFromVar(rootEl, '--a'),
    probeColorFromVar(rootEl, '--in'),
    probeColorFromVar(rootEl, '--su'),
    probeColorFromVar(rootEl, '--wa'),
    probeColorFromVar(rootEl, '--er')
  ].filter(Boolean) as string[]

  if (isDark && palette.length) {
    palette = palette.map(c => lightenForDark(c, 0.28))
  }

  return {
    isDark,
    textColor,
    baseBg,
    gridColor: isDark ? withAlpha(textColor, 0.12) : withAlpha(textColor, 0.14),
    domainColor: isDark ? withAlpha(textColor, 0.45) : withAlpha(textColor, 0.35),
    tickColor: isDark ? withAlpha(textColor, 0.45) : withAlpha(textColor, 0.35),
    labelColor: isDark ? withAlpha(textColor, 0.88) : withAlpha(textColor, 0.9),
    titleColor: isDark ? withAlpha(textColor, 0.95) : textColor,
    palette: palette.length ? palette : undefined
  }
}

function applyThemeToSpec(spec: any, rootEl: HTMLElement) {
  const themed = deepClone(spec)
  const theme = getThemePalette(rootEl)
  themed.config = themed.config || {}
  themed.config.background = 'transparent'

  if (theme.isDark) {
    const axisCfg = { ...(themed.config.axis || {}) }
    axisCfg.labelColor = withAlpha(theme.textColor, 0.9)
    axisCfg.titleColor = withAlpha(theme.textColor, 0.95)
    axisCfg.tickColor = withAlpha(theme.textColor, 0.45)
    axisCfg.domainColor = withAlpha(theme.textColor, 0.45)
    axisCfg.gridColor = withAlpha(theme.textColor, 0.15)
    axisCfg.gridDash = [1, 6]
    themed.config.axis = axisCfg

    const legendCfg = { ...(themed.config.legend || {}) }
    legendCfg.labelColor = withAlpha(theme.textColor, 0.9)
    legendCfg.titleColor = withAlpha(theme.textColor, 0.95)
    themed.config.legend = legendCfg

    const titleCfg = { ...(themed.config.title || {}) }
    titleCfg.color = withAlpha(theme.textColor, 0.95)
    themed.config.title = titleCfg

    themed.config.line = { ...(themed.config.line || {}), strokeWidth: 2.4 }
    themed.config.point = { ...(themed.config.point || {}), size: 70, filled: true }
    themed.config.text = { ...(themed.config.text || {}), fill: withAlpha(theme.textColor, 0.95) }

    if (!themed.config.range) themed.config.range = {}
    if (theme.palette) {
      themed.config.range.category = theme.palette.map(c => lightenForDark(c, 0.3))
    }
  }

  return themed
}

async function render() {
  const token = ++renderToken
  try {
    if (!props.spec) {
      if (el.value) el.value.innerHTML = ''
      return
    }

    if (view) {
      try { view.finalize() } catch {}
      view = null
    }
    if (!el.value) return

    el.value.innerHTML = ''

    const safeSpec = sanitizeSpec(props.spec)
    const themedSpec = applyThemeToSpec(safeSpec, el.value)

    const result = await embed(el.value, themedSpec, {
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

function startThemeWatchers() {
  themeObserver = new MutationObserver(() => render())
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] })
  try {
    mql = window.matchMedia('(prefers-color-scheme: dark)')
    mql.addEventListener('change', render)
  } catch {}
}
function stopThemeWatchers() {
  try { themeObserver?.disconnect() } catch {}
  themeObserver = null
  try { mql?.removeEventListener('change', render) } catch {}
  mql = null
}

onMounted(() => { render(); startThemeWatchers() })
watch(() => props.spec, render, { deep: true })
onBeforeUnmount(() => {
  stopThemeWatchers()
  if (view) {
    try { view.finalize() } catch {}
    view = null
  }
})
</script>
