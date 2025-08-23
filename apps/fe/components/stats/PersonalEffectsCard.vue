<template>
  <section class="px-4 py-4 max-w-6xl mx-auto space-y-3 border-t border-base-200">
    <h2 class="text-sm font-semibold uppercase tracking-wide text-base-content/70">Personal Outcome</h2>

    <!-- Headline -->
    <p class="text-xl font-semibold">
      {{ headlinePrefix }} +€{{ monthlyGain }}
      <span class="text-sm">/ month</span>
      <InfoTooltip title="How is this estimated?" :source="methodNotesUrl" source-label="Method notes">
        <p><strong>Inputs needed:</strong> household profile, region, price year & deflator (CPI), baseline and policy amounts (net income, taxes, transfers).</p>
        <p class="mt-2"><strong>Computation:</strong> (ΔIncome − ΔTaxes + ΔTransfers) for the selected household in €/month (current prices).</p>
        <p class="mt-2 text-xs opacity-70">If baseline/policy reflect different years, values are aligned using your CPI/deflator.</p>
      </InfoTooltip>
    </p>

    <!-- Inline setup (always visible; highlighted while not ready) -->
    <details :open="!isReady" class="rounded-2xl ring-1 ring-base-300/60 bg-base-100/70">
      <summary class="cursor-pointer px-3 py-2 font-medium flex items-center gap-2">
        <span>Setup inputs</span>
        <span class="badge" :class="isReady ? 'badge-success' : 'badge-warning'">
          {{ isReady ? 'Ready' : 'Incomplete' }}
        </span>
      </summary>

      <div class="p-3 grid gap-3">
        <!-- Status checklist -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div class="p-3 rounded-xl ring-1 ring-base-300/60">
            <p class="font-semibold mb-1">Status</p>
            <ul class="text-sm space-y-1">
              <li class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full" :class="hasHousehold ? 'bg-green-500' : 'bg-amber-400'"></span>
                Define household profile <code class="opacity-70 text-xs">state.household{…}</code>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full" :class="hasRegion ? 'bg-green-500' : 'bg-amber-400'"></span>
                Select region <code class="opacity-70 text-xs">state.region</code>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full" :class="hasPriceYear ? 'bg-green-500' : 'bg-amber-400'"></span>
                Fix price year <code class="opacity-70 text-xs">state.priceYear</code>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full" :class="hasCPI ? 'bg-green-500' : 'bg-amber-400'"></span>
                Provide CPI/deflator <code class="opacity-70 text-xs">state.cpi.deflator(a, from, to)</code>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full" :class="hasBaseline ? 'bg-green-500' : 'bg-amber-400'"></span>
                Load baseline amounts <code class="opacity-70 text-xs">state.baseline.personal</code>
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full" :class="hasPolicy ? 'bg-green-500' : 'bg-amber-400'"></span>
                Load policy amounts <code class="opacity-70 text-xs">state.policy.personal</code>
              </li>
            </ul>
            <div class="mt-2">
              <label class="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" class="checkbox checkbox-sm" v-model="useSimpleCalculator" />
                <span>Use simple calculator (compute deltas from baseline/policy)</span>
              </label>
            </div>
          </div>

          <!-- Household & Region -->
          <div class="p-3 rounded-xl ring-1 ring-base-300/60">
            <p class="font-semibold mb-2">Household & Region</p>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <label class="form-control">
                <span class="label-text">Adults</span>
                <input type="number" min="0" class="input input-bordered input-sm" v-model.number="s.household.adults" />
              </label>
              <label class="form-control">
                <span class="label-text">Children</span>
                <input type="number" min="0" class="input input-bordered input-sm" v-model.number="s.household.children" />
              </label>
              <label class="form-control col-span-2">
                <span class="label-text">Employment</span>
                <select class="select select-bordered select-sm" v-model="s.household.employment">
                  <option value="unspecified">Unspecified</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="retired">Retired</option>
                </select>
              </label>
              <label class="form-control col-span-2">
                <span class="label-text">Region</span>
                <input type="text" placeholder="e.g. DE" class="input input-bordered input-sm" v-model="s.region" />
              </label>
            </div>
          </div>
        </div>

        <!-- Prices / CPI -->
        <div class="p-3 rounded-xl ring-1 ring-base-300/60">
          <div class="flex items-start justify-between gap-2">
            <p class="font-semibold">Price year & CPI</p>
            <InfoTooltip title="Price year / CPI">
              <p>Keep baseline and policy amounts in the same price year. If source years differ, supply a CPI table and we’ll build a simple deflator.</p>
              <p class="mt-2 text-xs">Deflator used: amount × (CPI[to] / CPI[from]).</p>
            </InfoTooltip>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm mt-2">
            <label class="form-control">
              <span class="label-text">Price year</span>
              <input type="number" class="input input-bordered input-sm" v-model.number="s.priceYear" />
            </label>
            <label class="form-control md:col-span-2">
              <span class="label-text">CPI table (JSON: {"2022":100,"2023":106})</span>
              <textarea class="textarea textarea-bordered textarea-sm font-mono"
                        rows="3"
                        v-model="cpiTableJson"
                        placeholder='{"2024": 100, "2025": 103.2}'></textarea>
            </label>
          </div>
          <div class="mt-2 flex gap-2">
            <button class="btn btn-sm btn-primary" @click="applyCPI">Apply CPI</button>
            <button class="btn btn-sm btn-ghost" @click="loadExampleCPI">Load example CPI</button>
          </div>
          <p v-if="cpiError" class="mt-2 text-xs text-error">{{ cpiError }}</p>
        </div>

        <!-- Baseline & Policy amounts -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div class="p-3 rounded-xl ring-1 ring-base-300/60">
            <p class="font-semibold mb-2">Baseline (current law)</p>
            <div class="grid grid-cols-3 gap-2 text-sm">
              <label class="form-control">
                <span class="label-text">Net income €/month</span>
                <input type="number" class="input input-bordered input-sm" v-model.number="s.baseline.personal.netIncome" />
              </label>
              <label class="form-control">
                <span class="label-text">Taxes paid €/month</span>
                <input type="number" class="input input-bordered input-sm" v-model.number="s.baseline.personal.taxes" />
              </label>
              <label class="form-control">
                <span class="label-text">Transfers received €/month</span>
                <input type="number" class="input input-bordered input-sm" v-model.number="s.baseline.personal.transfers" />
              </label>
            </div>
          </div>

          <div class="p-3 rounded-xl ring-1 ring-base-300/60">
            <p class="font-semibold mb-2">Policy (selected scenario)</p>
            <div class="grid grid-cols-3 gap-2 text-sm">
              <label class="form-control">
                <span class="label-text">Net income €/month</span>
                <input type="number" class="input input-bordered input-sm" v-model.number="s.policy.personal.netIncome" />
              </label>
              <label class="form-control">
                <span class="label-text">Taxes paid €/month</span>
                <input type="number" class="input input-bordered input-sm" v-model.number="s.policy.personal.taxes" />
              </label>
              <label class="form-control">
                <span class="label-text">Transfers received €/month</span>
                <input type="number" class="input input-bordered input-sm" v-model.number="s.policy.personal.transfers" />
              </label>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <button class="btn btn-sm btn-outline" @click="loadDemoValues">Load demo values</button>
          <button class="btn btn-sm btn-outline" @click="clearValues">Clear values</button>
        </div>
      </div>
    </details>

    <!-- Cards + chart -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
      <div class="p-3 rounded-2xl ring-1 ring-base-300/60 bg-base-100/70">
        <p class="text-xs text-base-content/70">
          <span class="inline-flex items-center">Income
            <InfoTooltip title="Income (take‑home)">
              <p><strong>Provide:</strong> Monthly <em>take‑home</em> income before vs. after policy (after employee contributions).</p>
              <p class="mt-2"><strong>Interpret:</strong> Positive = more net pay reaching the household.</p>
            </InfoTooltip>
          </span>
        </p>
        <p class="text-xl font-semibold">€{{ breakdown.income }}</p>
      </div>

      <div class="p-3 rounded-2xl ring-1 ring-base-300/60 bg-base-100/70">
        <p class="text-xs text-base-content/70">
          <span class="inline-flex items-center">Taxes
            <InfoTooltip title="Taxes & contributions">
              <p><strong>Provide:</strong> Monthly change in personal taxes & mandatory contributions assigned to the household.</p>
              <p class="mt-2"><strong>Interpret:</strong> Positive = more tax paid (reduces headline gain). Use negative if taxes fall.</p>
            </InfoTooltip>
          </span>
        </p>
        <p class="text-xl font-semibold">€{{ breakdown.taxes }}</p>
      </div>

      <div class="p-3 rounded-2xl ring-1 ring-base-300/60 bg-base-100/70">
        <p class="text-xs text-base-content/70">
          <span class="inline-flex items-center">Transfers
            <InfoTooltip title="Cash benefits">
              <p><strong>Provide:</strong> Monthly change in benefits (child benefit, housing allowance, basic income top‑ups, rebates).</p>
              <p class="mt-2"><strong>Interpret:</strong> Positive = higher benefits received (raises headline gain).</p>
            </InfoTooltip>
          </span>
        </p>
        <p class="text-xl font-semibold">€{{ breakdown.transfers }}</p>
      </div>
    </div>

    <ClientOnly>
      <VegaLite :spec="miniSpec" :actions="false" />
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStatsState } from '@/composables/useStatsState'
import VegaLite from '@/components/charts/VegaLite.vue'
import InfoTooltip from '@/components/ui/InfoTooltip.vue'

const methodNotesUrl = 'https://example.org/method-notes'

const { state } = useStatsState()
const s = state as any

// --- Ensure minimal state skeleton so v-model won't crash ---
function ensureSkeleton () {
  s.household ??= { adults: 0, children: 0, employment: 'unspecified' }
  s.region ??= ''
  s.priceYear ??= new Date().getFullYear()
  s.cpi ??= {}
  s.cpi.table ??= { [s.priceYear]: 100 }
  s.cpi.deflator ??= ((amount:number, fromYear:number, toYear:number) => {
    const from = s.cpi.table?.[fromYear] ?? 100
    const to = s.cpi.table?.[toYear] ?? 100
    return amount * (to / from)
  })
  s.baseline ??= { personal: { netIncome: 0, taxes: 0, transfers: 0 } }
  s.baseline.personal ??= { netIncome: 0, taxes: 0, transfers: 0 }
  s.policy ??= { personal: { netIncome: 0, taxes: 0, transfers: 0 } }
  s.policy.personal ??= { netIncome: 0, taxes: 0, transfers: 0 }
  s.sim ??= {}
}
ensureSkeleton()

// --- Checkboxes/status flags ---
const hasHousehold = computed(() => !!(s?.household && (s.household.adults >= 0 || (s.household.members?.length ?? 0) > 0)))
const hasRegion = computed(() => !!s?.region)
const hasPriceYear = computed(() => Number.isFinite(s?.priceYear))
const hasCPI = computed(() => typeof s?.cpi?.deflator === 'function')
const hasBaseline = computed(() => !!(s?.baseline?.personal && Number.isFinite(s.baseline.personal.netIncome)))
const hasPolicy = computed(() => !!(s?.policy?.personal && Number.isFinite(s.policy.personal.netIncome)))

const isReady = computed(() =>
  hasHousehold.value && hasRegion.value && hasPriceYear.value && hasCPI.value && hasBaseline.value && hasPolicy.value
)

// --- Optional simple calculator toggle ---
const useSimpleCalculator = ref(true)

// --- CPI controls ---
const cpiError = ref<string | null>(null)
const cpiTableJson = ref(JSON.stringify(s.cpi.table ?? { [s.priceYear]: 100 }, null, 0))

function applyCPI () {
  cpiError.value = null
  try {
    const parsed = JSON.parse(cpiTableJson.value || '{}')
    if (!parsed || typeof parsed !== 'object') throw new Error('Invalid JSON object')
    s.cpi.table = parsed
    s.cpi.deflator = (amount:number, fromYear:number, toYear:number) => {
      const from = s.cpi.table?.[fromYear]
      const to = s.cpi.table?.[toYear]
      if (!Number.isFinite(from) || !Number.isFinite(to)) return amount
      return amount * (to / from)
    }
  } catch (e:any) {
    cpiError.value = e?.message ?? 'Invalid CPI JSON'
  }
}
function loadExampleCPI () {
  const y = new Date().getFullYear()
  const example = { [y - 1]: 100, [y]: 103.2 }
  cpiTableJson.value = JSON.stringify(example, null, 0)
}

// --- Headline & breakdown (prefer simulator if provided) ---
const headlinePrefix = computed(() => 'Your household gains')

const monthlyGain = computed(() => {
  // If a simulator exists and toggle is off, use it
  if (!useSimpleCalculator.value && typeof s?.sim?.personalOutcome === 'function') {
    const out = s.sim.personalOutcome(s)
    return Number(out?.monthlyGain ?? 0).toFixed(0)
  }
  // Simple delta calculation
  const ΔIncome = (s.policy.personal.netIncome ?? 0) - (s.baseline.personal.netIncome ?? 0)
  const ΔTaxes = (s.policy.personal.taxes ?? 0) - (s.baseline.personal.taxes ?? 0)        // + = more paid
  const ΔTransfers = (s.policy.personal.transfers ?? 0) - (s.baseline.personal.transfers ?? 0) // + = more received
  return Math.round(ΔIncome - ΔTaxes + ΔTransfers).toString()
})

const breakdown = computed(() => {
  if (!useSimpleCalculator.value && typeof s?.sim?.personalOutcome === 'function') {
    const out = s.sim.personalOutcome(s)
    const b = out?.breakdown ?? {}
    return {
      income: Math.round(b.income ?? 0),
      taxes: Math.round(b.taxes ?? 0),
      transfers: Math.round(b.transfers ?? 0)
    }
  }
  const ΔIncome = (s.policy.personal.netIncome ?? 0) - (s.baseline.personal.netIncome ?? 0)
  const ΔTaxes = (s.policy.personal.taxes ?? 0) - (s.baseline.personal.taxes ?? 0)
  const ΔTransfers = (s.policy.personal.transfers ?? 0) - (s.baseline.personal.transfers ?? 0)
  return {
    income: Math.round(ΔIncome),
    taxes: Math.round(ΔTaxes),
    transfers: Math.round(ΔTransfers)
  }
})

// --- Chart ---
const miniSpec = computed(() => {
  const rows = [
    { part: 'Income', value: breakdown.value.income },
    { part: 'Taxes', value: breakdown.value.taxes },
    { part: 'Transfers', value: breakdown.value.transfers }
  ]
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'Personal effects breakdown',
    width: 'container',
    height: 160,
    data: { values: rows },
    mark: { type: 'bar', tooltip: true },
    encoding: {
      x: { field: 'part', type: 'nominal', axis: { labelColor: 'currentColor' } },
      y: { field: 'value', type: 'quantitative', axis: { title: '€/month', labelColor: 'currentColor', titleColor: 'currentColor' } }
    },
    config: { view: { stroke: null } }
  }
})

// --- Helpers (demo/clear) ---
function loadDemoValues () {
  // lightweight demo values to verify UI
  s.household = { adults: 2, children: 1, employment: 'full-time' }
  s.region = 'DE'
  s.priceYear = new Date().getFullYear()
  s.baseline.personal = { netIncome: 2800, taxes: 450, transfers: 180 }
  s.policy.personal   = { netIncome: 2880, taxes: 420, transfers: 210 }
}
function clearValues () {
  s.household = { adults: 0, children: 0, employment: 'unspecified' }
  s.region = ''
  s.baseline.personal = { netIncome: 0, taxes: 0, transfers: 0 }
  s.policy.personal   = { netIncome: 0, taxes: 0, transfers: 0 }
}
</script>
