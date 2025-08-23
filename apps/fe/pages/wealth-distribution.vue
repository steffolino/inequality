<template>
  <div class="mx-auto max-w-6xl px-4 py-4 md:py-6 space-y-6">
    <header class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 class="text-2xl md:text-3xl font-extrabold">Wealth Distribution</h1>
        <p class="mt-1 max-w-prose text-sm text-base-content/70">
          This page shows how wealth is distributed between population groups and how inequality evolves over time.
          Hover the <span class="inline-block">?</span> icons for short explanations.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn btn-sm btn-ghost" @click="copyShareUrl">Share</button>
      </div>
    </header>

    <section class="rounded-2xl border border-base-300/60 bg-base-100/80 p-3 backdrop-blur">
      <FiltersBar v-model="state" :regions="REGIONS" :ranges="RANGES" @reset="resetFilters" />
    </section>

    <!-- Personal Outcome cards -->
    <section class="space-y-2">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-semibold uppercase tracking-wide text-base-content/70">Personal Outcome</h2>
        <small class="opacity-60">{{ prettyHeader }}</small>
      </div>

      <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
        <MetricCard label="Top 1% share" :value="cards.top1" unit="%" :trend="trends.top1" :definition="defs.wealthShare" subtitle="Share owned by the richest 1%." />
        <MetricCard label="Top 10% share" :value="cards.top10" unit="%" :trend="trends.top10" :definition="defs.wealthShare" subtitle="Share owned by the richest 10%." />
        <MetricCard label="Bottom 50% share" :value="cards.bottom50" unit="%" :trend="trends.bottom50" :definition="defs.wealthShare" subtitle="Share owned by the poorer half." />
      </div>
    </section>

    <!-- Trend chart -->
    <section class="space-y-2">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-semibold uppercase tracking-wide text-base-content/70">Trends Over Time</h2>
        <small class="opacity-60">Legend toggles series</small>
      </div>

      <div class="rounded-2xl bg-base-100/70 p-3 ring-1 ring-base-300/60">
        <VegaLite v-if="chartSpec && series.length" :spec="chartSpec" :actions="false" />
        <p v-else class="p-4 text-sm opacity-70">No data available for the selected settings.</p>
      </div>
    </section>

    <!-- Sources & Methods -->
    <section class="rounded-2xl border border-base-300/60 bg-base-100/80 p-3">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-base-content/70">Sources & Methods</h2>
      <ul class="mt-2 prose prose-sm max-w-none">
        <li><a class="link" :href="links.eurostat" target="_blank" rel="noreferrer noopener">Eurostat dataset</a></li>
        <li><a class="link" :href="links.wid" target="_blank" rel="noreferrer noopener">WID.world methodology</a></li>
        <li><a class="link" :href="links.notes" target="_blank" rel="noreferrer noopener">Calculation notes</a></li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watchEffect, onMounted } from 'vue'
import VegaLite from '@/components/charts/VegaLite.vue'
import FiltersBar from '@/components/stats/FiltersBar.vue'
import MetricCard from '@/components/stats/MetricCard.vue'

const RANGES = ['1995-2025','2000-2025','2008-2025','2015-2025']
const REGIONS = [
  { value: 'DE', label: 'Germany' },
  { value: 'EU27_2020', label: 'EU-27' }
]
const state = reactive({ yearStart: 2000, yearEnd: 2025, region: 'EU27_2020', dataset: 'wealthShare' })
function resetFilters(){ Object.assign(state, { yearStart:2000, yearEnd:2025, region:'EU27_2020', dataset:'wealthShare' }) }

type YearPoint = { year:number; top1?:number; top10?:number; bottom50?:number; gini?:number; palma?:number; atkinson?:number }
const series = ref<YearPoint[]>([])

/** Replace with your real data composable */
async function fetchData(){
  const ys:number[] = Array.from({length: state.yearEnd - state.yearStart + 1}, (_,i)=> state.yearStart + i)
  series.value = ys.map((y, i) => ({
    year: y,
    top1: 24 + i*0.2,
    top10: 30 + i*0.15,
    bottom50: 8 - i*0.03,
    gini: 0.39 + i*0.0006,
    palma: 1.35 + i*0.001,
    atkinson: 0.20 + i*0.0002
  }))
}
onMounted(fetchData)
watchEffect(fetchData)

const latest = computed(() => series.value.at(-1))
const first = computed(() => series.value[0])

const cards = computed(() => ({
  top1: latest.value?.top1 ?? null,
  top10: latest.value?.top10 ?? null,
  bottom50: latest.value?.bottom50 ?? null
}))
const trends = computed(() => ({
  top1: trendOf(first.value?.top1, latest.value?.top1, first.value?.year),
  top10: trendOf(first.value?.top10, latest.value?.top10, first.value?.year),
  bottom50: trendOf(first.value?.bottom50, latest.value?.bottom50, first.value?.year)
}))
function trendOf(a?:number, b?:number, since?:number, unit:string='%'){
  if (a==null || b==null || since==null) return null
  return { value: (b-a), since: String(since), unit }
}

const prettyHeader = computed(() => {
  const r = REGIONS.find(r => r.value===state.region)?.label || state.region
  return `${r} · ${state.yearStart}–${state.yearEnd}`
})

const links = {
  eurostat: 'https://ec.europa.eu/eurostat/statistics-explained/',
  wid: 'https://wid.world/document/methods/',
  notes: 'https://example.org/method-notes'
}

const chartSpec = computed(() => {
  if (!series.value.length) return null
  const data = series.value.map(p => ([
    { year: p.year, value: p.top1, group:'Top 1%' },
    { year: p.year, value: p.top10, group:'Top 10%' },
    { year: p.year, value: p.bottom50, group:'Bottom 50%' },
  ])).flat().filter(d => d.value != null)

  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Wealth shares by group',
    width: 'container',
    height: 300,
    data: { values: data },
    transform: [{ sort: [{ field: 'year', order: 'ascending' }] }],
    mark: { type: 'line', point: true },
    encoding: {
      // FIX: year is integer → quantitative (not temporal)
      x: {
        field: 'year',
        type: 'quantitative',
        axis: { title: 'Year', labelColor: '#6b7280', grid: true, gridOpacity: 0.2 },
        scale: { nice: false }
      },
      y: {
        field: 'value',
        type: 'quantitative',
        axis: { title: 'Share (%)', labelColor: '#6b7280', grid: true, gridOpacity: 0.2 },
        scale: { nice: true }
      },
      color: { field:'group', type:'nominal' },
      tooltip: [
        { field:'group', type:'nominal', title:'Group' },
        { field:'year', type:'quantitative', title:'Year' },
        { field:'value', type:'quantitative', title:'Share (%)', format:'.1f' }
      ]
    },
    config: { view: { stroke: null } }
  }
})

async function copyShareUrl(){
  const url = new URL(location.href)
  url.searchParams.set('region', state.region)
  url.searchParams.set('from', String(state.yearStart))
  url.searchParams.set('to', String(state.yearEnd))
  try { await navigator.clipboard.writeText(url.toString()) } catch {}
}
</script>
