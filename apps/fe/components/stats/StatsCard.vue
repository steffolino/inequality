<template>
  <section class="p-5 rounded-2xl bg-base-100/70 backdrop-blur shadow-sm ring-1 ring-base-300/50 space-y-4 transition-all hover:shadow-md hover:ring-base-300">
    <header class="flex items-end justify-between gap-3">
      <div>
        <h2 class="text-sm font-medium uppercase tracking-wide text-base-content/70">Statistics</h2>
        <p class="mt-1 text-2xl font-bold leading-tight">{{ headline }}</p>
        <p v-if="metaNote" class="mt-1 text-xs text-base-content/60">{{ metaNote }}</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="badge badge-ghost">{{ prettyDataset }}</span>
        <span class="badge badge-outline">{{ state.region }}</span>
        <span class="badge badge-outline">{{ state.timeframe }}</span>
      </div>
    </header>

    <ClientOnly>
      <div class="rounded-xl border border-base-300/60 p-3 bg-base-200/40 relative min-h-[260px]">
        <div v-if="loading" class="absolute inset-0 rounded-xl overflow-hidden">
          <div class="skeleton w-full h-full"></div>
        </div>
        <template v-else>
          <VegaLite
            :key="specKey"
            :spec="spec"
            :actions="{ export: true, source: false, editor: false }"
          />
          <div v-if="!hasAnyData" class="absolute inset-0 grid place-content-center text-base-content/60 text-sm">
            No data for this selection.
          </div>
        </template>
      </div>
    </ClientOnly>

    <transition-group name="kpi" tag="div" class="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <div key="k1" class="p-3 rounded-xl bg-base-200/60 hover:bg-base-200 transition-all hover:-translate-y-[1px]">
        <p class="text-xs uppercase tracking-wide text-base-content/60">Top 1%</p>
        <p class="mt-1 text-xl font-semibold tabular-nums">{{ kpis.top1.toFixed(1) }}%</p>
      </div>
      <div key="k2" class="p-3 rounded-xl bg-base-200/60 hover:bg-base-200 transition-all hover:-translate-y-[1px]">
        <p class="text-xs uppercase tracking-wide text-base-content/60">Top 10%</p>
        <p class="mt-1 text-xl font-semibold tabular-nums">{{ kpis.top10.toFixed(1) }}%</p>
      </div>
      <div key="k3" class="p-3 rounded-xl bg-base-200/60 hover:bg-base-200 transition-all hover:-translate-y-[1px]">
        <p class="text-xs uppercase tracking-wide text-base-content/60">Bottom 50%</p>
        <p class="mt-1 text-xl font-semibold tabular-nums">{{ kpis.bottom50.toFixed(1) }}%</p>
      </div>
    </transition-group>

    <details class="mt-1">
      <summary class="cursor-pointer text-sm">Description</summary>
      <p class="text-sm opacity-80 mt-2">
        Interactive time-series. Drag on the chart to brush/zoom the time window.
        Hover to see values. Click legend items to hide/show series.
      </p>
    </details>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import VegaLite from '../../components/charts/VegaLite.vue'
import { useStatsState } from '../../composables/useStatsState'
import mock from '../../public/data/mock.json'
import { useApi } from '../../composables/useApi'

// stable random suffix per component instance
const selId = Math.random().toString(36).slice(2, 8)
const XSEL = `${selId}_xsel`
const LSEL = `${selId}_legendSel`
const HSEL = `${selId}_hoverSel`

const { state } = useStatsState()
const api = useApi()

type Row = { year: number; value: number; group: string }
const apiRows = ref<Row[] | null>(null)
const loading = ref(false)

const indicator = computed(() => (state.dataset || 'gini').toLowerCase())
const prettyDataset = computed(() => indicator.value === 'gini' ? 'Gini' : state.dataset)
const yTitle = computed(() => indicator.value === 'gini' ? 'Gini (0–1)' : 'Share (%)')
const valueFmt = (v: number) => indicator.value === 'gini' ? v.toFixed(3) : v.toFixed(1)

const hasAnyData = computed(() => !!(apiRows.value?.length) || (mock as any).series?.length > 0)
const metaNote = computed(() => null)

async function loadSeries() {
  loading.value = true
  try {
    const [from, to] = state.timeframe.split('-').map(Number)
    const series = await api.getSeries({
      indicator: indicator.value,
      region: state.region,
      t: state.timeframe,
      from, to
    })
    apiRows.value = (series || []).map((d: any) => ({
      year: Number(d.year),
      value: Number(d.value),
      group: indicator.value === 'gini' ? 'Gini' : (d.group || 'Series')
    }))
  } catch (e) {
    console.warn('API series failed, using mock', e)
    apiRows.value = null
  } finally {
    loading.value = false
  }
}
onMounted(loadSeries)
watch(() => [state.region, state.dataset, state.timeframe], loadSeries)

function valueAt(group: string, year: number) {
  if (apiRows.value?.length) {
    const row = apiRows.value.find(r => r.group === group && r.year === year)
    return row?.value ?? 0
  }
  const s = (mock as any).series.find((s: any) => s.group === group)
  return s?.values.find((v: any) => v.year === year)?.value ?? 0
}

const headline = computed(() => {
  const yearEnd = Number(state.timeframe.split('-')[1])
  if (indicator.value === 'gini') {
    const v = apiRows.value?.find(r => r.year === yearEnd)?.value ?? 0
    return `Gini in ${yearEnd}: ${valueFmt(v)}`
  } else {
    const v = valueAt('top10', yearEnd)
    return `Top 10% owns ${v.toFixed(1)}%`
  }
})

const kpis = computed(() => {
  const yearEnd = Number(state.timeframe.split('-')[1])
  return {
    top1: valueAt('top1', yearEnd),
    top10: valueAt('top10', yearEnd),
    bottom50: valueAt('bottom50', yearEnd)
  }
})

const specKey = computed(() =>
  `${indicator.value}|${state.region}|${state.timeframe}|${apiRows.value?.length ?? 0}`
)

const spec = computed(() => {
  const [start, end] = state.timeframe.split('-').map(Number)

  const values: Row[] = []
  if (apiRows.value?.length) {
    for (const r of apiRows.value) if (r.year >= start && r.year <= end) values.push(r)
  } else {
    for (const s of (mock as any).series) {
      for (const v of s.values) {
        if (v.year >= start && v.year <= end) values.push({ year: v.year, value: v.value, group: s.group })
      }
    }
  }

  const yFormat = indicator.value === 'gini' ? '.3f' : '.1f'

  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    width: 'container',
    height: 240,
    data: { values },
    config: {
      axis: { labelFontSize: 12, titleFontSize: 12, labelColor: '#6b7280', titleColor: '#4b5563' },
      legend: { labelFontSize: 12, titleFontSize: 12 },
      view: { stroke: null }
    },
params: [
      { name: XSEL, select: { type: 'interval', encodings: ['x'] } },
      { name: LSEL, select: { type: 'point', fields: ['group'], bind: 'legend' } },
      { name: HSEL, select: { type: 'point', fields: ['year', 'group'], on: 'mousemove', nearest: true, clear: 'mouseout' } }
    ],
    transform: [{ filter: { param: XSEL } }],
    layer: [
      {
        mark: { type: 'area', interpolate: 'monotone', opacity: 0.12 },
        encoding: {
          x: { field: 'year', type: 'quantitative', axis: { title: 'Year', tickMinStep: 1, format: 'd', grid: true, gridDash: [2,4] } },
          y: { field: 'value', type: 'quantitative', scale: { nice: true, zero: false } },
          color: { field: 'group', type: 'nominal', legend: null },
          opacity: { condition: { param: 'legendSel', value: 0.12 }, value: 0.06 }
        }
      },
      {
        mark: { type: 'line', interpolate: 'monotone', strokeWidth: 2.5 },
        encoding: {
          x: { field: 'year', type: 'quantitative', axis: { title: 'Year', tickMinStep: 1, format: 'd', grid: true, gridDash: [2,4] } },
          y: { field: 'value', type: 'quantitative', axis: { title: yTitle.value, format: yFormat }, scale: { nice: true, zero: false } },
          color: { field: 'group', type: 'nominal', legend: { title: 'Series', orient: 'top', symbolType: 'circle' } },
          opacity: { condition: { param: 'legendSel', value: 1 }, value: 0.25 }
        }
      },
      {
        transform: [{ filter: { param: 'hoverSel' } }],
        mark: { type: 'point', filled: true, size: 80 },
        encoding: {
          x: { field: 'year', type: 'quantitative' },
          y: { field: 'value', type: 'quantitative' },
          color: { field: 'group', type: 'nominal', legend: null }
        }
      },
      {
        transform: [{ filter: { param: 'hoverSel' } }],
        mark: { type: 'rule', strokeDash: [4,4] },
        encoding: { x: { field: 'year', type: 'quantitative' }, color: { value: '#9AA1AF' } }
      },
      {
        transform: [{ filter: { param: 'hoverSel' } }],
        mark: { type: 'text', dx: 6, dy: -6, fontSize: 11 },
        encoding: {
          x: { field: 'year', type: 'quantitative' },
          y: { field: 'value', type: 'quantitative' },
          text: { field: 'value', type: 'quantitative', format: yFormat },
          color: { value: '#4b5563' }
        }
      },
      {
        mark: { type: 'point', opacity: 0 },
        encoding: {
          x: { field: 'year', type: 'quantitative' },
          y: { field: 'value', type: 'quantitative' },
          color: { field: 'group', type: 'nominal', legend: null },
          tooltip: [
            { field: 'group', title: 'Series' },
            { field: 'year', title: 'Year', type: 'quantitative', format: 'd' },
            { field: 'value', title: indicator.value === 'gini' ? 'Gini' : 'Share', type: 'quantitative', format: yFormat }
          ]
        }
      }
    ]
  }
})
</script>

<style scoped>
.skeleton {
  --shimmer: linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.5) 15%, rgba(255,255,255,0) 30%);
  background:
    linear-gradient(var(--b2), var(--b2)) padding-box,
    var(--shimmer) border-box;
  animation: shimmer 1.2s infinite;
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.kpi-enter-active, .kpi-leave-active { transition: all .25s ease; }
.kpi-enter-from { opacity: 0; transform: translateY(6px); }
.kpi-leave-to   { opacity: 0; transform: translateY(-6px); }
.tabular-nums { font-variant-numeric: tabular-nums; }
</style>
