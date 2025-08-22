<template>
  <dialog :open="open" class="modal z-20" @close="emit('update:open', false)">
    <div class="modal-box max-w-md bg-white">
      <form method="dialog"><button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" aria-label="Close">✕</button></form>
      <h3 class="font-semibold text-lg mb-2">Filters</h3>
      <div class="space-y-2">
        <div class="form-control">
          <label class="label"><span class="label-text">Group</span></label>
          <select v-model="state.group" class="select select-bordered">
            <option value="bottom50">Bottom 50%</option><option value="middle40">Middle 40%</option><option value="top10">Top 10%</option>
          </select>
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text">Region</span></label>
          <select v-model="state.region" class="select select-bordered">
            <option value="DE">Germany</option><option value="EU">EU</option><option value="BY">Bavaria</option><option value="NW">North Rhine-Westphalia</option><option value="SN">Saxony</option>
          </select>
        </div>
        <div class="form-control">
          <label class="label"><span class="label-text">Scenario</span></label>
          <div class="join">
            <input class="join-item btn" type="radio" name="scenario" aria-label="Baseline" value="baseline" v-model="state.scenario" />
            <input class="join-item btn" type="radio" name="scenario" aria-label="Policy A" value="policyA" v-model="state.scenario" />
          </div>
        </div>
      </div>
      <div class="modal-action">
        <button class="btn btn-primary" @click="emit('update:open', false)">Apply</button>
        <button class="btn btn-ghost" @click="reset">Reset</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop"><button>close</button></form>
  </dialog>
</template>
<script setup lang="ts">
import { useStatsState } from '~/composables/useStatsState'
const props = defineProps<{ open: boolean }>(); const emit = defineEmits<{(e:'update:open', v:boolean):void}>()
const { state } = useStatsState()
function reset(){ state.group='top10'; state.region='DE'; state.scenario='baseline' }
</script>