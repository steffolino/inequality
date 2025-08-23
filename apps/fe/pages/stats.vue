<template>
  <div class="min-h-dvh bg-base-100 text-base-content">
    <main id="main" class="mx-auto max-w-6xl px-4 py-8 space-y-8">
   <section
      class="relative overflow-hidden bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 py-4"
    >
      <div class="max-w-6xl mx-auto px-4 text-center space-y-6">
        <UiHeroStrip
          title="Stats & Simulations"
          subtitle="Explore interactive charts and simulate policy impacts on inequality."
        />
      </div>
    </section>

      <!-- CONTROLS -->
      <section class="rounded-2xl ring-1 ring-base-300/70 bg-base-100 p-4 space-y-4">
        <h2 class="text-lg font-bold uppercase tracking-wide text-base-content/70">Controls</h2>
        <p class="text-sm opacity-70">Choose what data and scenario to display.</p>

        <div class="flex flex-wrap gap-4 items-end">
          <!-- Region -->
          <label class="form-control w-44">
            <div class="label"><span class="label-text text-xs">Region</span></div>
            <select v-model="region" class="select select-sm select-bordered">
              <option value="DE">Germany (total)</option>
              <option value="DE-BD">Brandenburg</option>
              <option value="DE-BY">Bayern</option>
              <option value="DE-HB">Bremen</option>
              <option value="DE-HE">Hessen</option>
              <option value="DE-HH">Hamburg</option>
              <option value="DE-PR">Rheinland-Pfalz</option>
              <option value="DE-SN">Sachsen</option>
              <option value="DE-WU">Baden-Württemberg</option>
            </select>
          </label>

          <!-- Indicator -->
          <label class="form-control w-64">
            <div class="label"><span class="label-text text-xs">Indicator</span></div>
            <select v-model="indicator" class="select select-sm select-bordered">
              <option v-for="ind in filteredMetadata" :key="ind.variable" :value="ind.variable">
                {{ ind.shortname }}
              </option>
            </select>
          </label>

          <!-- Years -->
          <label class="form-control w-44">
            <div class="label"><span class="label-text text-xs">Years</span></div>
            <select v-model="timeframe" class="select select-sm select-bordered">
              <option value="1950-2024">1950–2024</option>
              <option value="1980-2024">1980–2024</option>
              <option value="2000-2024">2000–2024</option>
            </select>
          </label>

          <!-- Scenario -->
          <label class="form-control w-44">
            <div class="label"><span class="label-text text-xs">Scenario</span></div>
            <select v-model="scenario" class="select select-sm select-bordered">
              <option value="none">Original only</option>
              <option value="cap">Wealth Cap</option>
              <option value="tax">Wealth Tax</option>
            </select>
          </label>
        </div>

        <!-- Indicator description -->
        <div v-if="indicatorMeta" class="text-sm opacity-80 bg-base-200/60 p-3 rounded-xl">
          {{ indicatorMeta.description }}
        </div>
      </section>

      <!-- SIMULATION ASSUMPTIONS -->
      <section v-if="scenario !== 'none'" class="rounded-2xl ring-1 ring-base-300/70 bg-base-100 p-4 space-y-4">
        <h2 class="text-lg font-bold uppercase tracking-wide text-base-content/70">Simulation assumptions</h2>
        <p class="text-sm opacity-70">Adjust these sliders to model policies like caps or taxes.</p>

        <div v-if="scenario === 'cap'" class="form-control w-full">
          <label class="label"><span class="label-text">Wealth Cap (Mio €)</span></label>
          <input type="range" min="1" max="100" v-model="capValue" class="range range-primary" />
          <div class="text-right text-xs opacity-70">{{ capValue }} Mio €</div>
        </div>

        <div v-if="scenario === 'tax'" class="form-control w-full">
          <label class="label"><span class="label-text">Wealth Tax (%)</span></label>
          <input type="range" min="0" max="50" v-model="taxRate" class="range range-secondary" />
          <div class="text-right text-xs opacity-70">{{ taxRate }} %</div>
        </div>
      </section>

      <!-- RESULTS -->
      <section v-if="combinedRows.length" class="rounded-2xl bg-base-100 ring-1 ring-base-300/70 shadow-sm p-5">
        <h2 class="text-lg font-bold uppercase tracking-wide text-base-content/70 mb-1">Results</h2>
        <p class="text-sm opacity-70 mb-3">Compare original data with the chosen scenario.</p>
        <h3 class="text-xl font-semibold mb-3">{{ headline }}</h3>

        <VegaLite :spec="spec" :actions="false" />
      </section>

      <!-- PERSONAL OUTCOME -->
      <section class="rounded-2xl bg-base-100 ring-1 ring-base-300/70 shadow-sm p-5 space-y-4">
        <h2 class="text-lg font-bold uppercase tracking-wide text-base-content/70">Personal Outcome</h2>
        <p class="text-sm opacity-70">Enter your own data to estimate personal effects under current and simulated policies.</p>

        <div class="grid md:grid-cols-3 gap-4">
          <label class="form-control">
            <div class="label"><span class="label-text">Annual Income (€)</span></div>
            <input v-model.number="personalIncome" type="number" class="input input-bordered" />
          </label>
          <label class="form-control">
            <div class="label"><span class="label-text">Net Wealth (€)</span></div>
            <input v-model.number="personalWealth" type="number" class="input input-bordered" />
          </label>
          <label class="form-control">
            <div class="label"><span class="label-text">Region</span></div>
            <select v-model="personalRegion" class="select select-bordered">
              <option value="DE">Germany (total)</option>
              <option value="DE-BY">Bayern</option>
              <option value="DE-SN">Sachsen</option>
              <!-- etc -->
            </select>
          </label>
        </div>

        <div class="bg-base-200/60 p-4 rounded-xl">
          <p class="font-semibold">Your estimate:</p>
          <p class="text-sm opacity-80">Current policy: {{ formatCurrency(personalOutcome.current) }}</p>
          <p v-if="scenario!=='none'" class="text-sm opacity-80">Under scenario "{{ scenario }}": {{ formatCurrency(personalOutcome.simulated) }} (Δ {{ personalOutcome.diff }}%)</p>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useFetch } from '#app'
import VegaLite from '../components/charts/VegaLite.vue'
import HeroStrip from '../components/ui/HeroStrip.vue'

/** State */
const region = ref('DE')
const indicator = ref('')
const timeframe = ref('2000-2024')
const scenario = ref<'none' | 'cap' | 'tax'>('none')
const capValue = ref(20) // Mio €
const taxRate = ref(10)  // %

/** Personal outcome state */
const personalIncome = ref(40000)
const personalWealth = ref(500000)
const personalRegion = ref('DE')

/** Metadata + indicator filtering */
const metadata = ref<any[]>([])
watchEffect(async () => {
  const { data } = await useFetch(`/api/wid/metadata/${region.value}`)
  metadata.value = data.value?.rows ?? []
  if (!indicator.value && metadata.value.length) {
    indicator.value = metadata.value[0].variable
  }
})

const allowedIndicators = [
  'shweal901i','shweal910i','shweal950i',
  'sfiinct992','sptinct992','acaincj992'
]

const filteredMetadata = computed(() => 
  metadata.value.filter(m => allowedIndicators.includes(m.variable))
)

const indicatorMeta = computed(() => 
  filteredMetadata.value.find(m => m.variable === indicator.value)
)

/** Rows */
const rows = ref<any[]>([])
const scenarioRows = ref<any[]>([])

watchEffect(async () => {
  if (!indicator.value) return
  const { data } = await useFetch(`/api/wid/${region.value}?indicator=${indicator.value}&yearStart=${timeframe.value.split('-')[0]}&yearEnd=${timeframe.value.split('-')[1]}`)
  rows.value = data.value?.rows ?? []
})

/** Build scenario rows */
watchEffect(() => {
  if (!rows.value.length) return

  if (scenario.value === 'cap') {
    scenarioRows.value = rows.value.map(r => ({
      ...r,
      value: Math.min(r.value, capValue.value * 1_000_000),
      dataType: 'Scenario'
    }))
  } else if (scenario.value === 'tax') {
    scenarioRows.value = rows.value.map(r => ({
      ...r,
      value: r.value * (1 - taxRate.value / 100),
      dataType: 'Scenario'
    }))
  } else {
    scenarioRows.value = []
  }
})

/** Merge */
const combinedRows = computed(() => {
  const orig = rows.value.map(r => ({ ...r, dataType: 'Original' }))
  return [...orig, ...scenarioRows.value]
})

/** Headline */
const headline = computed(() => {
  return `${indicatorMeta.value?.shortname ?? indicator.value} in ${region.value}`
})

/** Chart type: line vs bar */
const isShare = computed(() => {
  const u = indicatorMeta.value?.unit?.toLowerCase() || ''
  return u.includes('share') || u.includes('%')
})

/** VegaLite */
const spec = computed(() => {
  if (!combinedRows.value.length) return null

  if (isShare.value) {
    // bar chart for share/distribution
    return {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: { values: combinedRows.value },
      mark: "bar",
      encoding: {
        x: { field: 'year', type: 'ordinal', axis: { labelAngle: -30 } },
        xOffset: { field: 'dataType' },
        y: { field: 'value', type: 'quantitative', title: indicatorMeta.value?.unit ?? '' },
        color: { field: 'dataType', type: 'nominal', title: 'Data' }
      },
      width: 'container',
      height: 320
    }
  }

  // line chart default
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: { values: combinedRows.value },
    mark: { type: 'line', point: true },
    encoding: {
      x: { field: 'year', type: 'ordinal', axis: { labelAngle: -30 } },
      y: { field: 'value', type: 'quantitative', title: indicatorMeta.value?.unit ?? '' },
      color: { field: 'dataType', type: 'nominal', title: 'Data' },
      detail: { field: 'region' }
    },
    width: 'container',
    height: 320
  }
})

/** Personal outcome calculation */
const personalOutcome = computed(() => {
  const current = personalIncome.value
  let simulated = current

  if (scenario.value === 'cap' && personalWealth.value > capValue.value * 1_000_000) {
    simulated = current - 0.05 * current // simplistic cut effect
  }
  if (scenario.value === 'tax') {
    simulated = current * (1 - taxRate.value / 100)
  }

  const diff = ((simulated - current) / current * 100).toFixed(1)
  return { current, simulated, diff }
})

function formatCurrency(v:number){
  return new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(v)
}
</script>
