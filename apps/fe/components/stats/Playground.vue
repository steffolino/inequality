<template>
  <section
    class="p-5 rounded-2xl bg-base-100/70 backdrop-blur shadow-sm ring-1 ring-base-300/50 space-y-5 transition-all hover:shadow-md hover:ring-base-300"
    aria-labelledby="playground-title"
  >
    <!-- Title / subtitle -->
    <header class="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
      <div>
        <h2 id="playground-title" class="text-sm font-medium uppercase tracking-wide text-base-content/70">
          Build‑Your‑Own Stats
        </h2>
        <p class="mt-1 text-2xl font-bold leading-tight">
          {{ headingTitle }}
        </p>
        <p class="mt-1 text-xs text-base-content/60">
          Pick an indicator, compare regions, choose years — then copy a permalink or export CSV.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn btn-sm" @click="resetState" title="Reset to defaults">Reset</button>
        <button class="btn btn-sm btn-outline" @click="copyPermalink" :disabled="copied">
          <span v-if="!copied">Copy Permalink</span>
          <span v-else>Copied ✓</span>
        </button>
      </div>
    </header>

    <!-- Step 0: Quick presets -->
    <div class="rounded-xl bg-base-200/50 p-3">
      <div class="text-xs font-semibold uppercase tracking-wide opacity-70 mb-2">Quick presets</div>
      <div class="flex flex-wrap gap-2">
        <button class="btn btn-xs" @click="applyPreset('de_vs_eu')">Germany vs EU (Gini, 2010–{{ yearMax }})</button>
        <button class="btn btn-xs" @click="applyPreset('s80_de_vs_eu')">Germany vs EU (S80/S20)</button>
        <button class="btn btn-xs" @click="applyPreset('poverty_de_vs_eu')">AROP: Germany vs EU</button>
        <button class="btn btn-xs" @click="applyPreset('wid_topshares')">WID: Top 10% & Top 1% (DE)</button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <!-- Left rail: three simple steps -->
      <aside class="lg:col-span-4 space-y-4">
        <!-- Step 1: Indicator -->
        <div class="p-3 rounded-xl bg-base-200/50">
          <div class="flex items-center justify-between">
            <label class="label !py-0">
              <span class="label-text font-semibold">1) Choose indicator</span>
            </label>
            <span class="badge badge-ghost">{{ currentMetric?.provider === 'eurostat' ? 'Eurostat' : 'WID' }}</span>
          </div>

          <div class="grid grid-cols-1 gap-2 mt-2">
            <label v-for="opt in metricOptions" :key="opt.key" class="cursor-pointer">
              <input type="radio" class="radio radio-sm mr-2" :value="opt.key" v-model="state.metric" />
              <span class="text-sm font-medium">{{ opt.label }}</span>
              <div class="text-[11px] opacity-70 ml-6">
                <span v-if="opt.provider==='eurostat'">EU‑SILC • <code>{{ opt.code }}</code></span>
                <span v-else>WID • series <code>{{ opt.code }}</code></span>
              </div>
            </label>
          </div>

          <!-- Small hint about availability -->
          <p class="mt-2 text-[11px] opacity-70">
            <span v-if="currentMetric?.supportsRegional">Regional comparison available (country codes like <code>DE</code>, <code>EU27_2020</code>).</span>
            <span v-else>Regional comparison limited; WID series are country‑level.</span>
          </p>
        </div>

        <!-- Step 2: Regions -->
        <div class="p-3 rounded-xl bg-base-200/50">
          <label class="label !py-0">
            <span class="label-text font-semibold">2) Compare regions</span>
            <span class="label-text-alt opacity-70">Add up to 4</span>
          </label>

          <!-- Suggested chips -->
          <div class="flex flex-wrap gap-2 mb-2">
            <button v-for="code in suggestedRegions" :key="code" class="btn btn-xs btn-outline"
                    @click="toggleRegion(code)">
              {{ state.regions.includes(code) ? '✓ ' + code : code }}
            </button>
          </div>

          <div class="flex gap-2">
            <input v-model.trim="regionInput" @keydown.enter.prevent="addRegion"
                   class="input input-sm w-full"
                   :placeholder="currentMetric?.supportsRegional ? 'e.g. DE, EU27_2020' : 'e.g. DE (WID is country-level)'" />
            <button class="btn btn-sm" @click="addRegion">Add</button>
          </div>

          <div class="mt-2 flex flex-wrap gap-2 min-h-6">
            <span v-for="r in state.regions" :key="r" class="badge badge-outline gap-1">
              {{ r }} <button class="ml-1" @click="removeRegion(r)" aria-label="Remove region">✕</button>
            </span>
          </div>

          <p class="mt-2 text-[11px] opacity-70">
            Tips: <code>DE</code> (Germany), <code>EU27_2020</code> (EU aggregate). Availability varies by indicator.
          </p>
        </div>

        <!-- Step 3: Years -->
        <div class="p-3 rounded-xl bg-base-200/50">
          <label class="label !py-0">
            <span class="label-text font-semibold">3) Years</span>
          </label>

          <div class="flex items-center gap-2">
            <input type="number" class="input input-sm w-24" v-model.number="state.yearStart" :min="2005" :max="yearMax" />
            <span>—</span>
            <input type="number" class="input input-sm w-24" v-model.number="state.yearEnd" :min="state.yearStart" :max="yearMax" />
            <button class="btn btn-sm ml-auto" @click="refresh">Update</button>
          </div>

          <p class="mt-2 text-[11px] opacity-70">
            EU‑SILC: survey year reflects previous‑year incomes. We show survey years.
          </p>
        </div>

        <!-- External perspectives (requested change) -->
        <div class="p-3 rounded-xl bg-base-200/50">
          <div class="text-sm font-semibold mb-2">Perspectives (external)</div>
          <div class="flex flex-col gap-1 text-sm">
            <a class="link link-primary" href="https://ungleichheit.info" target="_blank" rel="noopener">Martyna Linartas — ungleichheit.info</a>
            <a class="link link-primary" href="https://www.youtube.com/@GeldfuerdieWelt" target="_blank" rel="noopener">Maurice Höfgen — Geld für die Welt</a>
          </div>
        </div>

      </aside>

      <!-- Chart + source + downloads -->
      <div class="lg:col-span-8 space-y-4">
        <article class="p-3 rounded-xl bg-base-200/40">
          <VegaLiteEmbed
            v-if="chartSpec && dataRows.length"
            :spec="chartSpec"
            :actions="{export: true, source: false, editor: false}"
          />
          <div v-else class="p-6 text-center opacity-70">Choose an indicator and regions, then click “Update”.</div>
        </article>

        <div class="rounded-xl bg-base-200/60 p-3">
          <details class="collapse collapse-arrow">
            <summary class="collapse-title text-sm font-semibold">Data • Sources • Methods</summary>
            <div class="collapse-content text-sm leading-relaxed">
              <ul class="list-disc ml-5 space-y-1">
                <li v-if="currentMetric?.provider==='eurostat'">
                  <strong>Eurostat EU‑SILC</strong>, dataset <code>{{ currentMetric.code }}</code>.
                  Income measures are <em>equivalised disposable income</em>. Survey year reflects prior‑year incomes.
                </li>
                <li v-if="currentMetric?.provider==='wid'">
                  <strong>World Inequality Database</strong>, series <code>{{ currentMetric.code }}</code> (country‑level).
                </li>
                <li v-if="sourceUrl">
                  Live API: <a class="link link-primary break-all" :href="sourceUrl" target="_blank" rel="noopener">{{ sourceUrl }}</a>
                </li>
                <li v-if="dataRows.length">Returned rows: {{ dataRows.length }} <span v-if="lastUpdated">• Updated: {{ lastUpdated }}</span></li>
              </ul>

              <div class="mt-3 flex gap-2">
                <button class="btn btn-xs btn-outline" :disabled="!dataRows.length" @click="downloadCSV">Download CSV</button>
                <button class="btn btn-xs btn-outline" :disabled="!dataRows.length" @click="copyPermalink">{{ copied ? 'Permalink copied ✓' : 'Copy Permalink' }}</button>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from '#imports'
import VegaLiteEmbed from '~/components/charts/VegaLiteEmbed.vue'

/** ---------- Types & config ---------- */
type MetricKey = 'gini' | 's80s20' | 'arop' | 'arope' | 'wid_top10' | 'wid_top1'
type Provider = 'eurostat' | 'wid'
interface MetricOption {
  key: MetricKey
  label: string
  provider: Provider
  code: string // dataset code (Eurostat) or series id (WID)
  supportsRegional: boolean
}

const metricOptions: MetricOption[] = [
  { key: 'gini',     label: 'Gini (EU‑SILC)',                      provider: 'eurostat', code: 'ilc_di12',    supportsRegional: true  },
  { key: 's80s20',   label: 'S80/S20 (Top vs Bottom quintile)',    provider: 'eurostat', code: 'ilc_di11',    supportsRegional: true  },
  { key: 'arop',     label: 'AROP (60% of median income)',         provider: 'eurostat', code: 'ilc_li02',    supportsRegional: true  },
  { key: 'arope',    label: 'AROPE (poverty or social exclusion)', provider: 'eurostat', code: 'ilc_peps01',  supportsRegional: true  },
  { key: 'wid_top10',label: 'Top 10% income share (WID)',          provider: 'wid',      code: 'sptinc_p90p100_z', supportsRegional: false },
  { key: 'wid_top1', label: 'Top 1% income share (WID)',           provider: 'wid',      code: 'sptinc_p99p100_z', supportsRegional: false },
]

/** ---------- Suggested region chips ---------- */
const suggestedRegions = ['DE','EU27_2020','FR','IT','ES','NL','PL']

/** ---------- State ---------- */
const currentYear = new Date().getFullYear()
const yearMax = currentYear
const route = useRoute()
const router = useRouter()

const state = reactive({
  metric: 'gini' as MetricKey,
  regions: ['DE', 'EU27_2020'] as string[],
  yearStart: 2010,
  yearEnd: yearMax
})

const regionInput = ref('')
const copied = ref(false)

const currentMetric = computed(() => metricOptions.find(m => m.key === state.metric)!)
const headingTitle = computed(() => {
  const m = currentMetric.value?.label ?? 'Metric'
  const r = state.regions.join(' vs ')
  return `${m}: ${r} (${state.yearStart}–${state.yearEnd})`
})

/** ---------- URL state (permalink) ---------- */
function encodeState() {
  return btoa(encodeURIComponent(JSON.stringify({
    m: state.metric, r: state.regions, ys: state.yearStart, ye: state.yearEnd
  })))
}
function decodeState(s: string) {
  try { return JSON.parse(decodeURIComponent(atob(s))) } catch { return null }
}
function pushUrl() {
  const q = new URLSearchParams(route.query as Record<string,string>)
  q.set('stats', encodeState())
  router.replace({ query: Object.fromEntries(q.entries()) })
}
function readUrl() {
  const s = route.query.stats as string | undefined
  if (!s) return
  const o = decodeState(s); if (!o) return
  state.metric = o.m ?? state.metric
  state.regions = Array.isArray(o.r) ? o.r.slice(0,4) : state.regions
  state.yearStart = Number(o.ys ?? state.yearStart)
  state.yearEnd = Number(o.ye ?? state.yearEnd)
}

/** ---------- Presets ---------- */
function applyPreset(key: 'de_vs_eu'|'s80_de_vs_eu'|'poverty_de_vs_eu'|'wid_topshares') {
  if (key === 'de_vs_eu') {
    state.metric = 'gini'; state.regions = ['DE','EU27_2020']; state.yearStart = 2010; state.yearEnd = yearMax
  } else if (key === 's80_de_vs_eu') {
    state.metric = 's80s20'; state.regions = ['DE','EU27_2020']; state.yearStart = 2010; state.yearEnd = yearMax
  } else if (key === 'poverty_de_vs_eu') {
    state.metric = 'arop'; state.regions = ['DE','EU27_2020']; state.yearStart = 2010; state.yearEnd = yearMax
  } else if (key === 'wid_topshares') {
    state.metric = 'wid_top10'; state.regions = ['DE']; state.yearStart = 1980; state.yearEnd = yearMax
  }
  refresh()
}

/** ---------- Region helpers ---------- */
function toggleRegion(code: string) {
  const c = code.toUpperCase()
  if (state.regions.includes(c)) {
    state.regions = state.regions.filter(x => x !== c)
  } else if (state.regions.length < 4) {
    state.regions.push(c)
  }
}
function addRegion() {
  const r = regionInput.value.trim().toUpperCase()
  if (!r) return
  if (!state.regions.includes(r) && state.regions.length < 4) {
    state.regions.push(r)
  }
  regionInput.value = ''
}
function removeRegion(r: string) {
  state.regions = state.regions.filter(x => x !== r)
}

/** ---------- Data + sources ---------- */
const dataRows = ref<any[]>([])
const lastUpdated = ref<string | null>(null)
const sourceUrl = ref<string | null>(null)

// components/stats/Playground.vue (script setup)
import { useInequalityData } from '~/composables/useInequalityData'
const { fetchEurostatTidy, fetchWidTidy } = useInequalityData()

async function refresh() {
  dataRows.value = []; sourceUrl.value = null
  pushUrl()
  const m = currentMetric.value
  if (!m) return

  const regions = Array.isArray(state.regions) ? state.regions : String(state.regions).split(',').map(s=>s.trim()).filter(Boolean)

  if (m.provider === 'eurostat') {
    const { rows, url } = await fetchEurostatTidy({
      dataset: m.code,
      regions,
      yearStart: state.yearStart,
      yearEnd: state.yearEnd
    })
    dataRows.value = rows
    sourceUrl.value = url
  } else {
    const country = (regions[0] || 'DE').slice(0,2)
    const { rows, url } = await fetchWidTidy({ series: m.code, country, yearStart: state.yearStart, yearEnd: state.yearEnd })
    dataRows.value = rows
    sourceUrl.value = url
  }
}


/** ---------- Fetchers ---------- */
async function fetchEurostat(datasetCode: string, regions: string[], yearStart=2010, yearEnd=(new Date().getFullYear())) {
  const geo = regions.join(',')
  const time = `${yearStart}:${yearEnd}`
  const url = `/api/eurostat/${datasetCode}?geo=${encodeURIComponent(geo)}&time=${encodeURIComponent(time)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Eurostat proxy error: ${res.status}`)
  const json = await res.json()
  // json.rows is already tidy [{year, region, value}]
  return json.rows as Array<{year:number; region:string; value:number}>
}


async function fetchWID(series: string, opts: { country: string, yearStart: number, yearEnd: number }) {
  const url = `https://wid.world/data/${series}?areas=${opts.country}&downloadformat=tsv`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`WID error: ${res.status}`)
  const text = await res.text()
  const [headerLine, ...lines] = text.trim().split('\n')
  const headers = headerLine.split('\t')
  const yearIdx = headers.findIndex(h => /year/i.test(h))
  const valIdx  = headers.findIndex(h => /value/i.test(h))
  const rows = lines.map(l => l.split('\t'))
    .map(cols => ({ year: Number(cols[yearIdx]), region: opts.country, value: Number(cols[valIdx]) }))
    .filter(r => r.year >= opts.yearStart && r.year <= opts.yearEnd)
  return { rows, url }
}

/** ---------- Chart ---------- */
const chartSpec = computed(() => {
  if (!dataRows.value.length) return null
  const baseTitle = currentMetric.value?.label ?? 'Indicator'
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: baseTitle,
    data: { values: dataRows.value },
    mark: { type: 'line', point: true, tooltip: true },
    encoding: {
      x: { field: 'year', type: 'temporal', title: 'Year' },
      y: { field: 'value', type: 'quantitative', title: baseTitle },
      color: { field: 'region', type: 'nominal', title: 'Region' }
    },
    width: 'container',
    height: 340
  }
})

/** ---------- CSV download ---------- */
function toCSV(rows: any[]) {
  const header = ['year','region','value']
  const body = rows.map(r => [r.year, r.region, r.value].join(',')).join('\n')
  return `${header.join(',')}\n${body}\n`
}
function downloadCSV() {
  if (!dataRows.value.length) return
  const blob = new Blob([toCSV(dataRows.value)], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `inequality-stats-${state.metric}-${state.yearStart}-${state.yearEnd}.csv`
  document.body.appendChild(a); a.click(); a.remove()
  URL.revokeObjectURL(url)
}

/** ---------- UX helpers ---------- */
function resetState() {
  state.metric = 'gini'
  state.regions = ['DE','EU27_2020']
  state.yearStart = 2010
  state.yearEnd = yearMax
  refresh()
}
async function copyPermalink() {
  pushUrl()
  await navigator.clipboard.writeText(window.location.href)
  copied.value = true
  setTimeout(() => (copied.value = false), 1200)
}

/** ---------- Init ---------- */
onMounted(() => { readUrl(); refresh() })
</script>
