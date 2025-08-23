<template>
  <div class="min-h-dvh bg-base-100 text-base-content">
    <main id="main" class="mx-auto max-w-6xl px-4 py-8 space-y-8">
      <!-- Breadcrumb / Title -->
      <header class="space-y-2">
        <p class="text-xs opacity-70">
          <NuxtLink to="/" class="link link-hover">Home</NuxtLink> / Statistics
        </p>
        <h1 class="text-3xl font-extrabold tracking-tight">Statistics</h1>
        <p class="text-base-content/70 max-w-prose">
          A guided overview of inequality in plain language. Start with the quick summary, then see general and personal
          outcomes. Hover the <span class="font-semibold">?</span> icons for explanations.
        </p>
      </header>

      <!-- Primary controls -->
      <section class="rounded-2xl ring-1 ring-base-300/70 bg-base-100 p-4">
        <div class="flex flex-wrap gap-3 items-end">
          <label class="form-control w-44">
            <div class="label"><span class="label-text text-xs">Timeframe</span></div>
            <select v-model="timeframe" class="select select-sm select-bordered">
              <option value="2010-2025">2010–2025</option>
              <option value="2000-2025">2000–2025</option>
              <option value="1995-2025">1995–2025</option>
            </select>
          </label>

          <label class="form-control w-56">
            <div class="label"><span class="label-text text-xs">Metric</span></div>
            <select v-model="metric" class="select select-sm select-bordered">
              <option value="gini">Gini (EU‑SILC)</option>
              <option value="s8020">S80/S20 (EU‑SILC)</option>
              <option value="arop">AROP 60% (EU‑SILC)</option>
              <option value="arope">AROPE (EU‑SILC)</option>
            </select>
          </label>

          <div class="ml-auto flex flex-wrap items-center gap-2 text-xs">
            <span class="badge badge-outline">{{ prettyRegion('DE') }}</span>
            <span class="badge badge-outline">{{ prettyRegion('EU27_2020') }}</span>
            <span class="badge badge-ghost">{{ timeframe }}</span>
          </div>
        </div>
      </section>

      <!-- Main chart card -->
      <section
        v-if="rows.length"
        class="rounded-2xl bg-base-100 ring-1 ring-base-300/70 shadow-sm overflow-hidden"
      >
        <div class="px-6 pt-5 pb-3 border-b border-base-300/60">
          <h2 class="text-xl font-semibold">
            {{ headline }}
            <span class="ml-2 badge badge-ghost">{{ metricLabel }}</span>
            <span class="ml-1 badge badge-outline">{{ prettyRegion('DE') }}</span>
            <span class="ml-1 badge badge-outline">{{ prettyRegion('EU27_2020') }}</span>
            <span class="ml-1 badge badge-outline">{{ timeframe }}</span>
          </h2>
        </div>
        <div class="p-5">
          <VegaLiteEmbed :spec="spec" :actions="{export:true, source:false, editor:false}" />

          <div class="mt-3 grid md:grid-cols-2 gap-4 text-sm">
            <div class="rounded-xl bg-base-200/60 p-3">
              <p class="font-semibold">How to read this</p>
              <p class="opacity-80">
                Each line shows the indicator for a region across your selected years. Higher Gini or S80/S20 =
                higher inequality; higher AROP/AROPE = more people in poverty or social exclusion.
              </p>
            </div>
            <div class="rounded-xl bg-base-200/60 p-3">
              <p class="font-semibold">Sources & Methods</p>
              <ul class="list-disc ml-5">
                <li><a :href="links[datasetLinkKey]" target="_blank" class="link link-primary">Dataset page</a></li>
                <li><a :href="links.method_eusilc" target="_blank" class="link link-primary">EU‑SILC methodology</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- General Outcome (your existing component) -->
      <OutcomeCard />

      <!-- Personal Outcome (your existing component) -->
      <PersonalEffectsCard />

      <!-- Further info -->
      <section class="rounded-2xl bg-base-100 ring-1 ring-base-300/70 shadow-sm p-5">
        <h2 class="text-lg font-bold uppercase tracking-wide text-base-content/70">Further information</h2>
        <ul class="list-disc ml-5 mt-2 space-y-1 text-sm">
          <li><a :href="links.oecd_inequality" target="_blank" class="link link-primary">OECD — Income inequality indicators</a></li>
          <li><a :href="links.wid_country_de" target="_blank" class="link link-primary">WID — Germany country page</a></li>
          <li><a :href="links.iza_labour_2025" target="_blank" class="link link-primary">IZA — German labour market after the long boom (2025)</a></li>
          <li><a :href="links.diw_wealth_2024" target="_blank" class="link link-primary">DIW — Wealth and its distribution in Germany, 1895–2021</a></li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'

// ✅ use your existing components/paths
import OutcomeCard from '@/components/stats/OutcomeCard.vue'
import PersonalEffectsCard from '@/components/stats/PersonalEffectsCard.vue'
import VegaLiteEmbed from '@/components/charts/VegaLiteEmbed.vue'
import { useInequalityData } from '@/composables/useInequalityData'

// data access
const { fetchEurostatTidy } = useInequalityData()

/** Links */
const links = {
  ilc_di12:   'https://ec.europa.eu/eurostat/databrowser/view/ilc_di12/default/table',
  ilc_di11:   'https://ec.europa.eu/eurostat/databrowser/view/ilc_di11/default/table',
  ilc_li02:   'https://ec.europa.eu/eurostat/databrowser/view/ilc_li02/default/table',
  ilc_peps01: 'https://ec.europa.eu/eurostat/databrowser/view/ilc_peps01/default/table',
  method_eusilc:   'https://ec.europa.eu/eurostat/statistics-explained/index.php/Living_conditions_in_Europe_-_income_distribution_and_income_inequality',
  oecd_inequality: 'https://www.oecd.org/en/data/indicators/income-inequality.html',
  wid_country_de:  'https://wid.world/country/germany/',
  iza_labour_2025: 'https://docs.iza.org/dp17862.pdf',
  diw_wealth_2024: 'https://www.diw.de/de/diw_01.c.933594.de/publikationen/diskussionspapiere/2024_2105/wealth_and_its_distribution_in_germany__1895-2021.html'
}

/** UI state */
const timeframe = ref<'2010-2025'|'2000-2025'|'1995-2025'>('2000-2025')
const metric = ref<'gini'|'s8020'|'arop'|'arope'>('gini')

/** Data rows for the main chart */
const rows = ref<any[]>([])

/** Compute start year from timeframe */
const startYear = computed(()=> Number(timeframe.value.split('-')[0]))

/** Re-fetch whenever timeframe / metric changes */
watch([timeframe, metric], () => loadMain(), { immediate: true })

async function loadMain(){
  rows.value = []
  try {
    if (metric.value === 'gini') {
      const res = await fetchEurostatTidy({ dataset: 'ilc_di12', regions: ['DE','EU27_2020'], yearStart: startYear.value })
      rows.value = res.rows ?? []
    } else if (metric.value === 's8020') {
      const res = await fetchEurostatTidy({ dataset: 'ilc_di11', regions: ['DE','EU27_2020'], yearStart: startYear.value })
      rows.value = res.rows ?? []
    } else if (metric.value === 'arop') {
      const res = await fetchEurostatTidy({ dataset: 'ilc_li02', regions: ['DE','EU27_2020'], yearStart: startYear.value })
      rows.value = res.rows ?? []
    } else if (metric.value === 'arope') {
      const res = await fetchEurostatTidy({ dataset: 'ilc_peps01', regions: ['DE','EU27_2020'], yearStart: startYear.value })
      rows.value = res.rows ?? []
    }
  } catch (e) {
    console.warn('Main stats load failed', e)
    rows.value = []
  }
}

/** Headings & labels */
const headline = computed(()=> {
  const label = ({
    gini: 'Income inequality (Gini)',
    s8020: 'Income inequality (S80/S20)',
    arop: 'At‑risk‑of‑poverty (AROP)',
    arope: 'Poverty or social exclusion (AROPE)'
  })[metric.value]
  return `${label} in Germany vs EU`
})
const metricLabel = computed(()=> ({
  gini: 'Gini (EU‑SILC)',
  s8020: 'S80/S20',
  arop: 'AROP 60%',
  arope: 'AROPE'
})[metric.value])

/** Dataset link key to match the metric */
const datasetLinkKey = computed(() => ({
  gini: 'ilc_di12',
  s8020: 'ilc_di11',
  arop: 'ilc_li02',
  arope: 'ilc_peps01'
})[metric.value])

/** Vega-Lite spec */
const spec = computed(()=> ({
  $schema:'https://vega.github.io/schema/vega-lite/v5.json',
  description: metricLabel.value,
  data:{ values: rows.value },
  mark:{ type:'line', point:true, tooltip:true },
  encoding:{
    x:{ field:'year', type:'temporal', title:'Year' },
    y:{ field:'value', type:'quantitative', title: metricLabel.value },
    color:{ field:'region', type:'nominal', title:'Region' }
  },
  width:'container', height:320
}))

/** Helpers */
function prettyRegion(code:string){
  if (code==='DE') return 'Germany'
  if (code.startsWith('EU')) return 'EU‑27'
  return code
}
</script>
