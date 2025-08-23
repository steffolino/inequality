<template>
  <section
    class="p-5 rounded-2xl max-w-6xl mx-auto bg-base-100 shadow-sm ring-1 ring-base-300 space-y-4"
  >
    <header class="flex items-start justify-between gap-3">
      <div>
        <h2 class="text-sm font-medium uppercase tracking-wide text-base-content/70">
          Wealth Shares
        </h2>
        <p class="mt-1 text-2xl font-bold leading-tight">
          Wealth distribution in Germany ({{ timeframe }})
        </p>
        <p class="mt-1 text-xs text-base-content/60">
          Share of private wealth owned by each group
        </p>
      </div>
    </header>

    <ClientOnly>
      <VegaLite v-if="spec" :spec="spec" :actions="false" />
      <div v-else class="p-4 rounded bg-base-200 text-sm opacity-80">
        No data available
      </div>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useFetch } from '#app'
import VegaLite from '@/components/charts/VegaLite.vue'

type Row = { year: number; value: number; group: string }

const timeframe = '2000-2022'

const { data } = await useFetch<{ rows: Row[] }>(
  `/api/wid/shares?country=DEU&yearStart=2000&yearEnd=2022`
)

const rows = ref<Row[]>([])
watchEffect(() => {
  rows.value = data.value?.rows ?? []
})

const spec = computed(() => {
  if (!rows.value.length) return null
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    width: 'container',
    height: 320,
    data: { values: rows.value },
    mark: { type: 'line', point: true },
    encoding: {
      x: {
        field: 'year',
        type: 'temporal',
        axis: { title: 'Year', format: 'd' }
      },
      y: {
        field: 'value',
        type: 'quantitative',
        axis: { title: 'Wealth share (%)' }
      },
      color: {
        field: 'group',
        type: 'nominal',
        legend: { title: 'Group' }
      },
      tooltip: [
        { field: 'group', title: 'Group' },
        { field: 'year', title: 'Year' },
        { field: 'value', title: 'Share (%)', format: '.1f' }
      ]
    }
  }
})
</script>
