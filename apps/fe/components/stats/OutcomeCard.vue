<template>
  <section class="px-4 py-4 max-w-6xl mx-auto space-y-3 border-t border-base-200">
    <h2 class="text-lg font-semibold">General Outcome</h2>
    <p class="text-xl font-semibold">Inequality ↓ {{ inequalityDrop.toFixed(1) }}%</p>
    <div class="grid grid-cols-3 gap-2">
      <div class="p-2 rounded bg-base-200"><p class="text-xs opacity-70">Gini</p><p class="font-semibold">{{ gini.after.toFixed(2) }}</p><p class="text-xs opacity-70">from {{ gini.before.toFixed(2) }}</p></div>
      <div class="p-2 rounded bg-base-200"><p class="text-xs opacity-70">Palma</p><p class="font-semibold">{{ palma.after.toFixed(2) }}</p><p class="text-xs opacity-70">from {{ palma.before.toFixed(2) }}</p></div>
      <div class="p-2 rounded bg-base-200"><p class="text-xs opacity-70">Atkinson</p><p class="font-semibold">{{ atkinson.after.toFixed(2) }}</p><p class="text-xs opacity-70">from {{ atkinson.before.toFixed(2) }}</p></div>
    </div>
    <details><summary class="cursor-pointer">Before/After Comparison</summary>
      <div class="mt-2 p-3 rounded bg-base-200">
        <label class="label"><span class="label-text">Scenario</span></label>
        <input type="range" min="0" max="1" step="1" v-model.number="slider" class="range range-primary" />
        <div class="mt-2 text-sm opacity-80"><p>0 = Baseline, 1 = Policy A</p></div>
      </div>
    </details>
  </section>
</template>
<script setup lang="ts">
import { useStatsState } from '~/composables/useStatsState'
const { state } = useStatsState()
const slider = ref(state.scenario==='policyA'?1:0)
watch(slider, v => { state.scenario = v===1 ? 'policyA' : 'baseline' })
function make(before:number, after:number){ return { before, after } }
const gini = computed(()=> make(0.41, state.scenario==='policyA'?0.36:0.41))
const palma = computed(()=> make(1.4, state.scenario==='policyA'?1.2:1.4))
const atkinson = computed(()=> make(0.20, state.scenario==='policyA'?0.17:0.20))
const inequalityDrop = computed(()=>{ const before=100; const after= state.scenario==='policyA'?88.8:100; return ((before-after)/before)*100 })
</script>