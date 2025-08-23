<template>
  <section
    class="p-5 rounded-2xl max-w-6xl mx-auto bg-base-100/70 backdrop-blur shadow-sm ring-1 ring-base-300/50 space-y-4 transition-all hover:shadow-md hover:ring-base-300"
  >
    <header class="flex items-start justify-between gap-3">
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
      <VegaLite v-if="spec" :spec="spec" :actions="false" />
    </ClientOnly>

    <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
      <article class="prose prose-sm max-w-none">
        <h3>How to read this</h3>
        <p>Each line shows the share for a population group across your selected years. Hover a point for exact values.</p>
      </article>
      <article class="prose prose-sm max-w-none">
        <h3>Sources & Methods</h3>
        <ul>
          <li><a class="link" href="https://ec.europa.eu/eurostat/statistics-explained/" target="_blank" rel="noreferrer noopener">Eurostat datasets</a></li>
          <li><a class="link" href="https://wid.world/document/methods/" target="_blank" rel="noreferrer noopener">WID.world methodology</a></li>
          <li><a class="link" href="https://example.org/method-notes" target="_blank" rel="noreferrer noopener">Calculation notes</a></li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import VegaLite from '@/components/charts/VegaLite.vue'
import { useStatsState } from '@/composables/useStatsState'

const { state } = useStatsState()

const indicator = computed(() => (state.dataset || 'wealthShare').toLowerCase())
const prettyDataset = computed(() =>
  indicator.value === 'wealthshare' ? 'Wealth Share' : 'Household Income'
)

type Row = { year: number; value: number; group: string }
const series = ref<Row[]>([]) // <- only filled if API data comes in

const hasAnyData = computed(() => series.value.length > 0)

const COLORS = ['#ff1d25', '#4d768d', '#e6c373']

const spec = computed(() => {
  if (!series.value.length) return null
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    width: 'container',
    height: 320,
    data: { values: series.value },
    mark: { type: 'line', point: true },
    encoding: {
      x: {
        field: 'year',
        type: 'quantitative',
        axis: { title: 'Year', format: 'd', labelAngle: -35 },
        sort: 'ascending'
      },
      y: {
        field: 'value',
        type: 'quantitative',
        axis: {
          title: indicator.value === 'wealthshare' ? 'Share (%)' : 'Value'
        }
      },
      color: {
        field: 'group',
        type: 'nominal',
        scale: { range: COLORS }
      }
    }
  }
})

const links = {
  eurostat: 'https://ec.europa.eu/eurostat/statistics-explained/',
  wid: 'https://wid.world/document/methods/',
  notes: 'https://example.org/method-notes'
}

const headline = computed(() => {
  const latestYear = state.timeframe.split('-')[1]
  return indicator.value === 'wealthshare'
    ? `Top groups’ wealth share in ${state.region} (${latestYear})`
    : `Household income trends in ${state.region} (${state.timeframe})`
})

const metaNote = computed(() =>
  indicator.value === 'wealthshare'
    ? 'Share of private wealth owned by each group'
    : 'Equivalized household income (real, index)'
)
</script>
