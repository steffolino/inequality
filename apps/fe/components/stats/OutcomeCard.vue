<template>
  <section class="px-4 py-6 max-w-6xl mx-auto space-y-5 border-t border-base-200" aria-labelledby="general-outcome-h">
    <!-- Section header -->
    <header class="flex items-start justify-between gap-3">
      <div>
        <h2 id="general-outcome-h" class="text-lg font-bold uppercase tracking-wide text-base-content/70">
          General Outcome
        </h2>
        <p class="text-sm text-base-content/70 max-w-prose">
          Summary of inequality change using real data: <strong>Gini</strong> (Eurostat) and
          <strong>Palma</strong> (WID via OWID Grapher). The headline compares the first and last year returned.
        </p>
      </div>

      <!-- Scenario tabs (DaisyUI) -->
      <nav role="tablist" aria-label="Scenario" class="tabs tabs-boxed tabs-sm w-fit shadow-sm">
        <button
          role="tab"
          :aria-selected="slider===0"
          :tabindex="slider===0 ? 0 : -1"
          @click="setScenario(0)"
          class="tab font-semibold"
          :class="slider===0 ? 'tab-active' : ''"
        >
          Baseline
        </button>
        <button
          role="tab"
          :aria-selected="slider===1"
          :tabindex="slider===1 ? 0 : -1"
          @click="setScenario(1)"
          class="tab font-semibold"
          :class="slider===1 ? 'tab-active' : ''"
        >
          Policy A
        </button>
      </nav>
    </header>

    <!-- Headline KPI -->
    <p class="text-2xl font-bold">
      Inequality
      <span v-if="headline.valid" :class="headline.improves ? 'text-success' : 'text-error'">
        {{ headline.improves ? '↓' : '↑' }} {{ headline.pct.toFixed(1) }}%
      </span>
      <span v-else class="opacity-60">—</span>
      <InfoTooltip title="What does this mean?" :source="defs.method.source" :source-label="defs.method.sourceLabel">
        <p>
          We average the available indices (Gini, Palma — Atkinson when present) for the first and last year,
          then show the % change. Positive (↓) = improvement (lower inequality).
        </p>
      </InfoTooltip>
    </p>

    <!-- Scenario slider -->
    <div class="rounded-2xl ring-1 ring-base-300/60 bg-base-100/70 p-3">
      <label class="label" :for="'scenario-slider'">
        <span class="label-text">Scenario</span>
        <span class="label-text-alt text-xs opacity-70">0 = Baseline, 1 = Policy A</span>
      </label>
      <input
        id="scenario-slider"
        type="range"
        min="0"
        max="1"
        step="1"
        v-model.number="slider"
        class="range range-primary"
        aria-valuemin="0"
        aria-valuemax="1"
        :aria-valuenow="slider"
        @change="applyScenarioFromSlider"
      />
    </div>

    <!-- Metric cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <!-- Gini -->
      <article class="p-4 rounded-2xl ring-1 ring-base-300/60 bg-base-100/70 space-y-1 min-h-[152px]">
        <header class="flex items-start justify-between gap-2">
          <p class="text-xs opacity-70">
            Gini (0–1)
            <InfoTooltip title="Gini Index" :source="defs.gini.source" :source-label="defs.gini.sourceLabel">
              <p>{{ defs.gini.text }}</p>
              <p v-if="gini.from && gini.to" class="mt-2 text-xs rounded bg-base-200 p-2">
                Period: {{ gini.from }} → {{ gini.to }}
              </p>
            </InfoTooltip>
          </p>
          <span class="badge badge-sm" :class="badgeClass(gini.deltaPct)">
            {{ arrow(gini.deltaPct) }} {{ displayPct(gini.deltaPct) }}
          </span>
        </header>
        <p class="text-2xl font-semibold">{{ displayNum(gini.after, 2) }}</p>
        <p class="text-xs opacity-70">from {{ displayNum(gini.before, 2) }}</p>
        <details class="mt-2 text-xs">
          <summary class="cursor-pointer font-medium">How to retrieve</summary>
          <div class="mt-1 space-y-1">
            <p>Eurostat browser: <a :href="links.ilc_di12" class="link link-primary" target="_blank">ilc_di12</a></p>
            <code class="block bg-base-200/70 p-2 rounded">
              fetchEurostatTidy({ dataset:'ilc_di12', regions:['DE'], yearStart:2010 })
            </code>
          </div>
        </details>
      </article>

      <!-- Palma -->
      <article class="p-4 rounded-2xl ring-1 ring-base-300/60 bg-base-100/70 space-y-1 min-h-[152px]">
        <header class="flex items-start justify-between gap-2">
          <p class="text-xs opacity-70">
            Palma (Top 10% / Bottom 40%)
            <InfoTooltip title="Palma Ratio" :source="defs.palma.source" :source-label="defs.palma.sourceLabel">
              <p>{{ defs.palma.text }}</p>
              <p v-if="palma.from && palma.to" class="mt-2 text-xs rounded bg-base-200 p-2">
                Period: {{ palma.from }} → {{ palma.to }}
              </p>
            </InfoTooltip>
          </p>
          <span class="badge badge-sm" :class="badgeClass(palma.deltaPct)">
            {{ arrow(palma.deltaPct) }} {{ displayPct(palma.deltaPct) }}
          </span>
        </header>
        <p class="text-2xl font-semibold">{{ displayNum(palma.after, 2) }}</p>
        <p class="text-xs opacity-70">from {{ displayNum(palma.before, 2) }}</p>
        <details class="mt-2 text-xs">
          <summary class="cursor-pointer font-medium">How to retrieve</summary>
          <div class="mt-1 space-y-1">
            <p>OWID (WID before‑tax) Palma slug:</p>
            <code class="block bg-base-200/70 p-2 rounded">
              fetchWidTidy({ series:'wid_palma', country:'DEU' })
            </code>
          </div>
        </details>
      </article>

      <!-- Atkinson (optional; hidden unless available) -->
      <article v-if="atkinson.available" class="p-4 rounded-2xl ring-1 ring-base-300/60 bg-base-100/70 space-y-1 min-h-[152px]">
        <header class="flex items-start justify-between gap-2">
          <p class="text-xs opacity-70">
            Atkinson (ε=1)
            <InfoTooltip title="Atkinson Index" :source="defs.atkinson.source" :source-label="defs.atkinson.sourceLabel">
              <p>{{ defs.atkinson.text }}</p>
            </InfoTooltip>
          </p>
          <span class="badge badge-sm" :class="badgeClass(atkinson.deltaPct)">
            {{ arrow(atkinson.deltaPct) }} {{ displayPct(atkinson.deltaPct) }}
          </span>
        </header>
        <p class="text-2xl font-semibold">{{ displayNum(atkinson.after, 2) }}</p>
        <p class="text-xs opacity-70">from {{ displayNum(atkinson.before, 2) }}</p>
        <details class="mt-2 text-xs">
          <summary class="cursor-pointer font-medium">How to compute</summary>
          <div class="mt-1 space-y-1">
            <p>Needs microdata or grouped shares. With ε=1:</p>
            <code class="block bg-base-200/70 p-2 rounded">A(1) = 1 - exp( (1/n) * Σ ln(y_i / μ) )</code>
          </div>
        </details>
      </article>
    </div>

    <!-- Takeaways -->
    <div class="rounded-2xl ring-1 ring-base-300/60 bg-base-100/70 p-4">
      <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/70">Key takeaways</h3>
      <ul class="mt-2 text-sm leading-relaxed list-disc ml-5">
        <li>Gini covers the whole distribution; Palma focuses on tails (top 10 vs bottom 40).</li>
        <li>The headline shows direction; always inspect each index individually.</li>
      </ul>
    </div>

    <!-- Methods & sources -->
    <div class="rounded-2xl ring-1 ring-base-300/60 bg-base-100/70 p-4">
      <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/70">Method & sources</h3>
      <div class="mt-2 grid md:grid-cols-2 gap-3 text-sm">
        <div class="space-y-1">
          <p class="font-medium">Headline calculation</p>
          <code class="block bg-base-200/70 p-2 rounded text-xs">
            indices = [valid(Gini), valid(Palma), valid(Atkinson)]<br />
            before = mean(indices.map(x => x.before))<br />
            after  = mean(indices.map(x => x.after))<br />
            change = (before - after) / before * 100
          </code>
        </div>
        <div class="space-y-1">
          <p class="font-medium">Datasets</p>
          <ul class="list-disc ml-4">
            <li><a :href="links.ilc_di12" target="_blank" class="link link-primary">Eurostat — Gini (<code>ilc_di12</code>)</a></li>
            <li><a :href="links.wid_palma" target="_blank" class="link link-primary">OWID (WID) — Palma (slug)</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-3 text-xs">
        <a :href="defs.method.source" target="_blank" class="link link-primary">{{ defs.method.sourceLabel }}</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import InfoTooltip from '@/components/ui/InfoTooltip.vue'
import { useStatsState } from '@/composables/useStatsState'
import { useInequalityData } from '@/composables/useInequalityData'

const { state } = useStatsState()
const { fetchEurostatTidy, fetchWidTidy, firstLast } = useInequalityData()

/** Scenario control (tabs + slider share the same source of truth) */
const slider = ref(state.scenario === 'policyA' ? 1 : 0)
function setScenario(v:number){ slider.value = v; applyScenarioFromSlider() }
function applyScenarioFromSlider(){ state.scenario = slider.value === 1 ? 'policyA' : 'baseline' }
watch(slider, applyScenarioFromSlider)

/** Links */
const links = {
  ilc_di12: 'https://ec.europa.eu/eurostat/databrowser/view/ilc_di12/default/table',
  wid_palma: 'https://ourworldindata.org/grapher/palma-ratio-s90s40-ratio',
}

/** Utils (NaN-safe) */
const isFin = (v:any)=> Number.isFinite(v)
const displayNum = (v:any, d=2)=> isFin(v) ? Number(v).toFixed(d) : '—'
const displayPct = (pct:any)=> isFin(pct) ? `${Math.abs(pct).toFixed(1)}%` : '—'
const arrow = (pct:any)=> !isFin(pct) ? '—' : (pct <= 0 ? '↓' : '↑')
const badgeClass = (pct:any)=> !isFin(pct) ? 'badge-ghost' : (pct <= 0 ? 'badge-success' : 'badge-error')
const pctChange = (before:number, after:number)=> isFin(before) && isFin(after) ? ((after - before) / before) * 100 : NaN

/** Metric state */
const gini = ref<{before:number; after:number; from?:number; to?:number; deltaPct:number}>({ before: NaN, after: NaN, deltaPct: NaN })
const palma = ref<{before:number; after:number; from?:number; to?:number; deltaPct:number}>({ before: NaN, after: NaN, deltaPct: NaN })
const atkinson = ref<{available:boolean; before:number; after:number; deltaPct:number}>({ available:false, before:NaN, after:NaN, deltaPct:NaN })

/** Load real series (fail-soft) */
onMounted(loadData)
async function loadData() {
  try {
    // 1) Gini (Eurostat)
    const giniRes = await fetchEurostatTidy({ dataset: 'ilc_di12', regions: ['DE'], yearStart: 2010 })
    const giniFL = firstLast(giniRes.rows)
    const giniDelta = pctChange(giniFL.before, giniFL.after)
    gini.value = { before: giniFL.before, after: giniFL.after, from: giniFL.from, to: giniFL.to, deltaPct: giniDelta }
  } catch (e) {
    console.warn('Gini load failed', e)
    gini.value = { before: NaN, after: NaN, deltaPct: NaN }
  }

  try {
    // 2) Palma (WID via OWID Grapher slug)
    const palmaRes = await fetchWidTidy({ series: 'wid_palma', country: 'DEU' })
    const palmaFL = firstLast(palmaRes.rows)
    const palmaDelta = pctChange(palmaFL.before, palmaFL.after)
    palma.value = { before: palmaFL.before, after: palmaFL.after, from: palmaFL.from, to: palmaFL.to, deltaPct: palmaDelta }
  } catch (e) {
    console.warn('Palma load failed', e)
    palma.value = { before: NaN, after: NaN, deltaPct: NaN }
  }

  // 3) Atkinson — keep hidden unless you wire computed values:
  atkinson.value = { available: false, before: NaN, after: NaN, deltaPct: NaN }
}

/** Headline: average % change across valid indices (invert sign so ↓ = improvement) */
const headline = computed(() => {
  const deltas:number[] = []
  if (isFin(gini.value.deltaPct)) deltas.push(-gini.value.deltaPct)
  if (isFin(palma.value.deltaPct)) deltas.push(-palma.value.deltaPct)
  if (atkinson.value.available && isFin(atkinson.value.deltaPct)) deltas.push(-atkinson.value.deltaPct)
  if (!deltas.length) return { valid:false, improves:false, pct:NaN }
  const avg = deltas.reduce((a,b)=>a+b,0) / deltas.length
  return { valid:true, improves: avg >= 0, pct: Math.abs(avg) }
})

/** Explanations / sources */
const defs = {
  method: {
    source: 'https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Living_conditions_in_Europe_-_income_distribution_and_income_inequality',
    sourceLabel: 'Eurostat — EU‑SILC methodology',
  },
  gini: {
    text: '0 (perfect equality) to 1 (perfect inequality). Equivalised disposable income after taxes/transfers.',
    source: links.ilc_di12,
    sourceLabel: 'Eurostat ilc_di12'
  },
  palma: {
    text: 'Income share of the top 10% divided by the share of the bottom 40%. Higher = more inequality.',
    source: links.wid_palma,
    sourceLabel: 'OWID (WID) — Palma'
  },
  atkinson: {
    text: 'Inequality index parameterised by ε. With ε=1 it emphasizes the lower tail. Needs microdata or grouped shares.',
    source: 'https://wid.world/document/methods/',
    sourceLabel: 'WID methodology'
  }
}
</script>
