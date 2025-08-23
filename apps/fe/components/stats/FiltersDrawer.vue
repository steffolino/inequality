<template>
  <dialog :open="open" class="modal z-20" @close="emit('update:open', false)">
    <div class="modal-box max-w-md bg-base-100">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" aria-label="Close">✕</button>
      </form>

      <h3 class="font-semibold text-lg">Filters</h3>
      <p class="mt-1 text-sm opacity-70">Pick a group and region. Changes apply immediately.</p>

      <div class="mt-3 space-y-3">
        <div class="form-control">
          <label class="label"><span class="label-text">Group</span></label>
          <select v-model="state.group" class="select select-bordered">
            <option value="bottom50">Bottom 50%</option>
            <option value="middle40">Middle 40%</option>
            <option value="top10">Top 10%</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label"><span class="label-text">Region</span></label>
          <select v-model="state.region" class="select select-bordered">
            <option>Germany</option>
            <option>EU-27</option>
            <option>Bavaria</option>
            <option>Berlin</option>
            <option>North Rhine‑Westphalia</option>
            <option>Saxony</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label"><span class="label-text">Scenario</span></label>
          <select v-model="state.scenario" class="select select-bordered">
            <option value="baseline">Baseline</option>
            <option value="policyA">Policy A</option>
          </select>
        </div>
      </div>

      <div class="modal-action">
        <button class="btn btn-primary" @click="emit('update:open', false)">Done</button>
        <button class="btn btn-ghost" @click="reset">Reset</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop"><button>close</button></form>
  </dialog>
</template>

<script setup lang="ts">
import { useStatsState } from '@/composables/useStatsState'
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{(e:'update:open', v:boolean):void}>()
const { state } = useStatsState()
function reset(){ state.group='top10'; state.region='EU-27'; state.scenario='baseline' }
</script>
