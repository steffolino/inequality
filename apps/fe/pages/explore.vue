<template>
  <main class="mx-auto max-w-7xl px-4 py-8 space-y-10">
    <!-- Page title -->
    <header class="space-y-3">
      <h1 class="text-3xl font-extrabold tracking-tight">Explore Inequality</h1>
      <p class="text-base-content/70 max-w-3xl">
        Compare key indicators for Germany and the EU since 2010. Each chart links to its source and includes a short
        explanation. If a dataset can’t be loaded, that card (or the whole section) is simply hidden.
      </p>

      <!-- Big, clear tabs -->
      <nav
        role="tablist"
        aria-label="Explore tabs"
        class="mt-4 grid grid-cols-2 overflow-hidden rounded-2xl ring-1 ring-base-300 bg-base-100"
      >
        <button
          role="tab"
          :aria-selected="tab==='overview'"
          :tabindex="tab==='overview' ? 0 : -1"
          @click="tab='overview'"
          class="py-3 px-4 text-center text-sm font-semibold transition-all"
          :class="tab==='overview'
            ? 'bg-primary text-primary-content shadow-inner'
            : 'bg-base-100 hover:bg-base-200 text-base-content/80'"
        >
          Overview
        </button>
        <button
          role="tab"
          :aria-selected="tab==='playground'"
          :tabindex="tab==='playground' ? 0 : -1"
          @click="tab='playground'"
          class="py-3 px-4 text-center text-sm font-semibold transition-all"
          :class="tab==='playground'
            ? 'bg-primary text-primary-content shadow-inner'
            : 'bg-base-100 hover:bg-base-200 text-base-content/80'"
        >
          Build‑Your‑Own
        </button>
      </nav>
    </header>

    <!-- Quick anchors (only for overview) -->
    <div v-show="tab==='overview'" class="flex flex-wrap gap-2 text-sm" aria-label="Jump to topic">
      <a v-if="hasIncome" href="#income" class="badge badge-outline">Income inequality</a>
      <a v-if="hasPoverty" href="#poverty" class="badge badge-outline">Poverty & AROPE</a>
      <a v-if="hasWealth" href="#wealth" class="badge badge-outline">Wealth</a>
      <a v-if="hasLabour" href="#labour" class="badge badge-outline">Labour & pay gaps</a>
      <a href="#sources" class="badge badge-ghost">Sources & methods</a>
      <a href="#reading" class="badge badge-ghost">Further information</a>
    </div>

    <!-- ================= Overview ================= -->
    <section v-show="tab==='overview'" class="space-y-10">
      <!-- Income -->
      <section
        v-if="hasIncome"
        id="income"
        class="rounded-2xl bg-base-100 ring-1 ring-base-300/70 shadow-sm overflow-hidden"
        aria-labelledby="income-h"
      >
        <div class="px-6 pt-5 pb-4 border-b border-base-300/60">
          <h2 id="income-h" class="text-xl font-semibold">Income inequality</h2>
          <p class="text-xs text-base-content/70 mt-1 max-w-3xl">
            These series come from EU‑SILC. Higher values in Gini or S80/S20 mean more unequal disposable income distribution.
            Germany (DE) is compared with the EU27 average.
          </p>
        </div>

        <div class="p-5 grid md:grid-cols-2 gap-5">
          <!-- Gini -->
          <article
            v-if="giniRows.length"
            class="p-4 rounded-xl ring-1 ring-base-300/70 bg-base-50 min-h-[240px] space-y-3"
            aria-labelledby="gini-h"
          >
            <header class="flex items-start justify-between gap-3">
              <div>
                <h3 id="gini-h" class="font-semibold">Gini (equivalised disposable income)</h3>
                <p class="text-[11px] opacity-70">Eurostat • <code>ilc_di12</code></p>
                <p class="text-xs opacity-80 mt-1">
                  The Gini coefficient ranges from 0 (perfect equality) to 1 (max inequality). Here: annual post‑tax,
                  post‑transfer household income, equivalised.
                </p>
              </div>
              <a :href="links.ilc_di12" target="_blank" class="btn btn-ghost btn-xs shrink-0">Dataset</a>
            </header>
            <VegaLiteEmbed :spec="giniSpec" :actions="{export:true, source:false, editor:false}" />
            <details class="text-xs">
              <summary class="cursor-pointer font-medium">How to get this data</summary>
              <div class="mt-2 space-y-1">
                <p>Eurostat browser: <a :href="links.ilc_di12" class="link link-primary" target="_blank">ilc_di12</a></p>
                <p>In code: <code>fetchEurostatTidy({ dataset:'ilc_di12', regions:['DE','EU27_2020'], yearStart:2010 })</code></p>
              </div>
            </details>
          </article>

          <!-- S80/S20 -->
          <article
            v-if="s8020Rows.length"
            class="p-4 rounded-xl ring-1 ring-base-300/70 bg-base-50 min-h-[240px] space-y-3"
            aria-labelledby="s8020-h"
          >
            <header class="flex items-start justify-between gap-3">
              <div>
                <h3 id="s8020-h" class="font-semibold">S80/S20 income quintile ratio</h3>
                <p class="text-[11px] opacity-70">Eurostat • <code>ilc_di11</code></p>
                <p class="text-xs opacity-80 mt-1">
                  Ratio of total income received by the top 20% to that of the bottom 20%. Higher = more unequal.
                </p>
              </div>
              <a :href="links.ilc_di11" target="_blank" class="btn btn-ghost btn-xs shrink-0">Dataset</a>
            </header>
            <VegaLiteEmbed :spec="s8020Spec" :actions="{export:true, source:false, editor:false}" />
            <details class="text-xs">
              <summary class="cursor-pointer font-medium">How to get this data</summary>
              <div class="mt-2 space-y-1">
                <p>Eurostat browser: <a :href="links.ilc_di11" class="link link-primary" target="_blank">ilc_di11</a></p>
                <p>In code: <code>fetchEurostatTidy({ dataset:'ilc_di11', regions:['DE','EU27_2020'], yearStart:2010 })</code></p>
              </div>
            </details>
          </article>

          <!-- NEW: Median equivalised disposable income -->
          <article
            v-if="medianIncRows.length"
            class="p-4 rounded-xl ring-1 ring-base-300/70 bg-base-50 min-h-[240px] space-y-3 md:col-span-2"
            aria-labelledby="median-h"
          >
            <header class="flex items-start justify-between gap-3">
              <div>
                <h3 id="median-h" class="font-semibold">Median equivalised disposable income</h3>
                <p class="text-[11px] opacity-70">Eurostat • <code>ilc_di03</code></p>
                <p class="text-xs opacity-80 mt-1">
                  Median annual disposable income per person (equivalised). Tracks typical living standards.
                </p>
              </div>
              <a :href="links.ilc_di03" target="_blank" class="btn btn-ghost btn-xs shrink-0">Dataset</a>
            </header>
            <VegaLiteEmbed :spec="medianIncSpec" :actions="{export:true, source:false, editor:false}" />
            <details class="text-xs">
              <summary class="cursor-pointer font-medium">How to get this data</summary>
              <div class="mt-2 space-y-1">
                <p>Eurostat browser: <a :href="links.ilc_di03" class="link link-primary" target="_blank">ilc_di03</a></p>
                <p>In code: <code>fetchEurostatTidy({ dataset:'ilc_di03', regions:['DE','EU27_2020'], yearStart:2010 })</code></p>
              </div>
            </details>
          </article>
        </div>
      </section>

      <!-- Poverty -->
      <section
        v-if="hasPoverty"
        id="poverty"
        class="rounded-2xl bg-base-100 ring-1 ring-base-300/70 shadow-sm overflow-hidden"
        aria-labelledby="poverty-h"
      >
        <div class="px-6 pt-5 pb-4 border-b border-base-300/60">
          <h2 id="poverty-h" class="text-xl font-semibold">Poverty & social exclusion</h2>
          <p class="text-xs text-base-content/70 mt-1 max-w-3xl">
            AROP measures the share of people with income below 60% of national median.
            AROPE counts people who are at risk of poverty, severely materially and socially deprived, or living in very low work intensity households.
          </p>
        </div>
        <div class="p-5 grid md:grid-cols-2 gap-5">
          <article v-if="aropRows.length" class="p-4 rounded-xl ring-1 ring-base-300/70 bg-base-50 min-h-[240px] space-y-3">
            <header class="flex items-start justify-between gap-3">
              <div>
                <h3 class="font-semibold">AROP (60% of median)</h3>
                <p class="text-[11px] opacity-70">Eurostat • <code>ilc_li02</code></p>
                <p class="text-xs opacity-80 mt-1">Share of people below 60% of the national median equivalised income.</p>
              </div>
              <a :href="links.ilc_li02" target="_blank" class="btn btn-ghost btn-xs shrink-0">Dataset</a>
            </header>
            <VegaLiteEmbed :spec="aropSpec" :actions="{export:true, source:false, editor:false}" />
            <details class="text-xs">
              <summary class="cursor-pointer font-medium">How to get this data</summary>
              <div class="mt-2 space-y-1">
                <p>Eurostat browser: <a :href="links.ilc_li02" class="link link-primary" target="_blank">ilc_li02</a></p>
                <p>In code: <code>fetchEurostatTidy({ dataset:'ilc_li02', regions:['DE','EU27_2020'], yearStart:2010 })</code></p>
              </div>
            </details>
          </article>

          <article v-if="aropeRows.length" class="p-4 rounded-xl ring-1 ring-base-300/70 bg-base-50 min-h-[240px] space-y-3">
            <header class="flex items-start justify-between gap-3">
              <div>
                <h3 class="font-semibold">AROPE (poverty or social exclusion)</h3>
                <p class="text-[11px] opacity-70">Eurostat • <code>ilc_peps01</code></p>
                <p class="text-xs opacity-80 mt-1">Composite indicator: at risk of poverty OR severely deprived OR (0–64) in very low work intensity.</p>
              </div>
              <a :href="links.ilc_peps01" target="_blank" class="btn btn-ghost btn-xs shrink-0">Dataset</a>
            </header>
            <VegaLiteEmbed :spec="aropeSpec" :actions="{export:true, source:false, editor:false}" />
            <details class="text-xs">
              <summary class="cursor-pointer font-medium">How to get this data</summary>
              <div class="mt-2 space-y-1">
                <p>Eurostat browser: <a :href="links.ilc_peps01" class="link link-primary" target="_blank">ilc_peps01</a></p>
                <p>In code: <code>fetchEurostatTidy({ dataset:'ilc_peps01', regions:['DE','EU27_2020'], yearStart:2010 })</code></p>
              </div>
            </details>
          </article>
        </div>
      </section>

      <!-- Wealth -->
      <section
        v-if="hasWealth"
        id="wealth"
        class="rounded-2xl bg-base-100 ring-1 ring-base-300/70 shadow-sm overflow-hidden"
        aria-labelledby="wealth-h"
      >
        <div class="px-6 pt-5 pb-4 border-b border-base-300/60">
          <h2 id="wealth-h" class="text-xl font-semibold">Wealth distribution</h2>
          <p class="text-xs text-base-content/70 mt-1 max-w-3xl">
            Top income shares are a standard way to track concentration at the top. WID series are harmonised across time and methods.
          </p>
        </div>
        <div class="p-5 grid md:grid-cols-2 gap-5">
          <article v-if="widTop10Rows.length" class="p-4 rounded-xl ring-1 ring-base-300/70 bg-base-50 min-h-[240px] space-y-3">
            <header class="flex items-start justify-between gap-3">
              <div>
                <h3 class="font-semibold">Top 10% income share</h3>
                <p class="text-[11px] opacity-70">WID</p>
                <p class="text-xs opacity-80 mt-1">Share of national income accruing to the top decile.</p>
              </div>
              <a :href="links.wid_top10" target="_blank" class="btn btn-ghost btn-xs shrink-0">Data</a>
            </header>
            <VegaLiteEmbed :spec="widTop10Spec" :actions="{export:true, source:false, editor:false}" />
            <details class="text-xs">
              <summary class="cursor-pointer font-medium">How to get this data</summary>
              <div class="mt-2 space-y-1">
                <p>WID portal: <a :href="links.wid_top10" class="link link-primary" target="_blank">Top shares</a></p>
                <p>In code: <code>fetchWidTidy({ series:'sptinc_p90p100_z', country:'DE' })</code></p>
              </div>
            </details>
          </article>

          <article v-if="widTop1Rows.length" class="p-4 rounded-xl ring-1 ring-base-300/70 bg-base-50 min-h-[240px] space-y-3">
            <header class="flex items-start justify-between gap-3">
              <div>
                <h3 class="font-semibold">Top 1% income share</h3>
                <p class="text-[11px] opacity-70">WID</p>
                <p class="text-xs opacity-80 mt-1">Share of national income accruing to the top percentile.</p>
              </div>
              <a :href="links.wid_top1" target="_blank" class="btn btn-ghost btn-xs shrink-0">Data</a>
            </header>
            <VegaLiteEmbed :spec="widTop1Spec" :actions="{export:true, source:false, editor:false}" />
            <details class="text-xs">
              <summary class="cursor-pointer font-medium">How to get this data</summary>
              <div class="mt-2 space-y-1">
                <p>WID portal: <a :href="links.wid_top1" class="link link-primary" target="_blank">Top shares</a></p>
                <p>In code: <code>fetchWidTidy({ series:'sptinc_p99p100_z', country:'DE' })</code></p>
              </div>
            </details>
          </article>
        </div>
      </section>

      <!-- Labour -->
      <section
        v-if="hasLabour"
        id="labour"
        class="rounded-2xl bg-base-100 ring-1 ring-base-300/70 shadow-sm overflow-hidden"
        aria-labelledby="labour-h"
      >
        <div class="px-6 pt-5 pb-4 border-b border-base-300/60">
          <h2 id="labour-h" class="text-xl font-semibold">Labour market & pay gaps</h2>
          <p class="text-xs text-base-content/70 mt-1 max-w-3xl">
            Unadjusted gender pay gap compares average gross hourly earnings between men and women. (More labour stats can be added here.)
          </p>
        </div>
        <div class="p-5">
          <article v-if="gpgRows.length" class="p-4 rounded-xl ring-1 ring-base-300/70 bg-base-50 min-h-[240px] space-y-3">
            <header class="flex items-start justify-between gap-3">
              <div>
                <h3 class="font-semibold">Gender pay gap (unadjusted, %)</h3>
                <p class="text-[11px] opacity-70">Destatis / Eurostat</p>
              </div>
              <a :href="links.gender_gap" target="_blank" class="btn btn-ghost btn-xs shrink-0">Dataset</a>
            </header>
            <VegaLiteEmbed :spec="gpgSpec" :actions="{export:true, source:false, editor:false}" />
          </article>
        </div>
      </section>

      <!-- Sources -->
      <section id="sources" class="rounded-2xl bg-base-100 ring-1 ring-base-300/70 shadow-sm p-5">
        <h2 class="text-xl font-semibold">Sources & methods</h2>
        <p class="text-xs text-base-content/70 mt-1">
          Below are dataset pages (human‑readable). Each chart panel also shows the exact API call we use.
        </p>
        <ul class="list-disc ml-5 mt-3 space-y-1 text-sm">
          <li><a :href="links.ilc_di12" target="_blank" class="link link-primary">Eurostat — Gini (<code>ilc_di12</code>)</a></li>
          <li><a :href="links.ilc_di11" target="_blank" class="link link-primary">Eurostat — S80/S20 (<code>ilc_di11</code>)</a></li>
          <li><a :href="links.ilc_di03" target="_blank" class="link link-primary">Eurostat — Median income (<code>ilc_di03</code>)</a></li>
          <li><a :href="links.ilc_li02" target="_blank" class="link link-primary">Eurostat — AROP (<code>ilc_li02</code>)</a></li>
          <li><a :href="links.ilc_peps01" target="_blank" class="link link-primary">Eurostat — AROPE (<code>ilc_peps01</code>)</a></li>
          <li><a :href="links.wid_top10" target="_blank" class="link link-primary">WID — Top 10% share</a></li>
          <li><a :href="links.wid_top1" target="_blank" class="link link-primary">WID — Top 1% share</a></li>
          <li><a :href="links.gender_gap" target="_blank" class="link link-primary">Destatis — Gender pay gap</a></li>
          <li><a :href="links.method_eusilc" target="_blank" class="link link-primary">Eurostat — EU‑SILC methodology</a></li>
        </ul>

        <div class="mt-4 p-3 rounded-xl bg-base-200/60 text-xs leading-relaxed">
          <p class="font-semibold mb-1">Tips for retrieval</p>
          <ul class="list-disc ml-4 space-y-1">
            <li>Use our helper: <code>fetchEurostatTidy({ dataset, regions:['DE','EU27_2020'], yearStart:2010 })</code> for tidy rows.</li>
            <li>WID series can be pulled with <code>fetchWidTidy({ series:'sptinc_p90p100_z', country:'DE' })</code>.</li>
            <li>Export from each chart (PNG/SVG/CSV) via the menu in the top‑right corner of the panel.</li>
          </ul>
        </div>
      </section>

      <!-- Further information / expert reads -->
      <section id="reading" class="rounded-2xl bg-base-100 ring-1 ring-base-300/70 shadow-sm p-5">
        <h2 class="text-xl font-semibold">Further information</h2>
        <ul class="list-disc ml-5 mt-3 space-y-1 text-sm">
          <li><a :href="links.oecd_inequality" target="_blank" class="link link-primary">OECD — Income inequality indicators</a></li>
          <li><a :href="links.wid_country_de" target="_blank" class="link link-primary">WID — Germany country page</a></li>
          <li><a :href="links.iza_labour_2025" target="_blank" class="link link-primary">IZA — The German labour market after the long boom (2025)</a></li>
          <li><a :href="links.diw_wealth_2024" target="_blank" class="link link-primary">DIW — Wealth and its distribution in Germany, 1895–2021</a></li>
        </ul>
      </section>
    </section>

    <!-- ================= Playground ================= -->
    <section v-show="tab==='playground'" aria-labelledby="playground-h">
      <h2 id="playground-h" class="sr-only">Build‑Your‑Own</h2>
      <div class="mb-4 p-3 rounded-xl bg-base-200/60 text-xs leading-relaxed">
        <p class="font-semibold">How to use</p>
        <p>
          Pick an indicator, region(s), and time range. You can copy the generated API call and the chart spec to reuse elsewhere.
        </p>
      </div>
      <StatsPlayground />
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import VegaLiteEmbed from '~/components/charts/VegaLiteEmbed.vue'
import StatsPlayground from '~/components/stats/Playground.vue'
import { useInequalityData } from '~/composables/useInequalityData'

const { fetchEurostatTidy, fetchWidTidy } = useInequalityData()

const links = {
  // Datasets
  ilc_di12:   'https://ec.europa.eu/eurostat/databrowser/view/ilc_di12/default/table',
  ilc_di11:   'https://ec.europa.eu/eurostat/databrowser/view/ilc_di11/default/table',
  ilc_di03:   'https://ec.europa.eu/eurostat/databrowser/view/ilc_di03/default/table',
  ilc_li02:   'https://ec.europa.eu/eurostat/databrowser/view/ilc_li02/default/table',
  ilc_peps01: 'https://ec.europa.eu/eurostat/databrowser/view/ilc_peps01/default/table',
  wid_top10:  'https://wid.world/data',
  wid_top1:   'https://wid.world/data',
  gender_gap: 'https://www.destatis.de/EN/Themes/Labour/Earnings/GenderPayGap/_node.html',
  // Methods & reading
  method_eusilc:   'https://ec.europa.eu/eurostat/statistics-explained/index.php/Living_conditions_in_Europe_-_income_distribution_and_income_inequality',
  oecd_inequality: 'https://www.oecd.org/en/data/indicators/income-inequality.html',
  wid_country_de:  'https://wid.world/country/germany/',
  iza_labour_2025: 'https://docs.iza.org/dp17862.pdf',
  diw_wealth_2024: 'https://www.diw.de/de/diw_01.c.933594.de/publikationen/diskussionspapiere/2024_2105/wealth_and_its_distribution_in_germany__1895-2021.html'
}

const tab = ref<'overview'|'playground'>('overview')

/** DATA */
const giniRows = ref<any[]>([])
const s8020Rows = ref<any[]>([])
const medianIncRows = ref<any[]>([])  // NEW
const aropRows = ref<any[]>([])
const aropeRows = ref<any[]>([])
const gpgRows = ref<any[]>([])
const widTop10Rows = ref<any[]>([])
const widTop1Rows = ref<any[]>([])

onMounted(async () => {
  try {
    // Gini from Eurostat
    const giniResp = await fetchEurostatTidy({
      dataset: 'ilc_di12',
      regions: ['DE'],
      yearStart: 2010
    })
    // Palma: you’d need top 10% and bottom 40% from WID
    const top10 = await fetchWidTidy({ series: 'sptinc_p90p100_z', country: 'DE' })
    const bottom40 = await fetchWidTidy({ series: 'sptinc_p0p40_z', country: 'DE' })
    // Atkinson: not directly available → must be computed from microdata or from grouped shares

    // pick first and last year (or baseline vs policy scenario if you model that)
    const latest = giniResp.rows.at(-1)
    const baseline = giniResp.rows[0]
    gini.value = make(Number(baseline.value), Number(latest.value))

    const palmaLatest = top10.rows.at(-1).value / bottom40.rows.at(-1).value
    const palmaBaseline = top10.rows[0].value / bottom40.rows[0].value
    palma.value = make(palmaBaseline, palmaLatest)

    // Atkinson still placeholder unless you add microdata
    atkinson.value = make(0.20, 0.18)
  } catch (err) {
    console.error('Failed loading outcome data', err)
  }
})


/** Section visibility (hide whole sections when all children are empty) */
const hasIncome  = computed(() => giniRows.value.length || s8020Rows.value.length || medianIncRows.value.length)
const hasPoverty = computed(() => aropRows.value.length || aropeRows.value.length)
const hasWealth  = computed(() => widTop10Rows.value.length || widTop1Rows.value.length)
const hasLabour  = computed(() => gpgRows.value.length)

/** Chart specs */
const baseLine = (title:string, rows:any)=>({
  $schema:'https://vega.github.io/schema/vega-lite/v5.json',
  description:title,
  data:{ values: rows },
  mark:{ type:'line', point:true, tooltip:true },
  encoding:{
    x:{ field:'year', type:'temporal', title:'Year' },
    y:{ field:'value', type:'quantitative', title:title },
    color:{ field:'region', type:'nominal', title:'Region' }
  },
  width:'container', height:300
})

const giniSpec       = computed(()=> baseLine('Gini (EU‑SILC)', giniRows.value))
const s8020Spec      = computed(()=> baseLine('S80/S20 ratio', s8020Rows.value))
const medianIncSpec  = computed(()=> baseLine('Median equivalised disposable income', medianIncRows.value))
const aropSpec       = computed(()=> baseLine('AROP 60% median', aropRows.value))
const aropeSpec      = computed(()=> baseLine('AROPE', aropeRows.value))
const widTop10Spec   = computed(()=> baseLine('Top 10% income share (WID)', widTop10Rows.value))
const widTop1Spec    = computed(()=> baseLine('Top 1% income share (WID)',  widTop1Rows.value))
const gpgSpec        = computed(()=> baseLine('Gender pay gap (%)', gpgRows.value))
</script>
