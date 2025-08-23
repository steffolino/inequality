<template>
  <div class="top-14 z-20 border-b border-base-200 bg-base-100/95 backdrop-blur">
    <div class="px-4 py-2 max-w-6xl mx-auto flex flex-wrap items-end gap-2">
      <!-- Timeframe -->
      <label class="form-control w-auto">
        <div class="label"><span class="label-text text-xs">Timeframe</span></div>
        <select v-model="state.timeframe" class="select select-sm select-bordered">
          <option>1995-2005</option>
          <option>2000-2025</option>
          <option>2010-2025</option>
          <option>2015-2025</option>
        </select>
      </label>

      <!-- Dataset -->
      <label class="form-control w-auto">
        <div class="label"><span class="label-text text-xs">Metric</span></div>
        <select v-model="state.dataset" class="select select-sm select-bordered">
          <option value="wealthShare">Wealth Share</option>
          <option value="householdIncome">Household Income</option>
        </select>
      </label>

      <!-- Region quick buttons -->
      <div class="ml-auto flex items-center gap-2">
        <button class="btn btn-sm" @click="state.region='Germany'">Germany</button>
        <button class="btn btn-sm" @click="state.region='EU-27'">EU‑27</button>
        <button class="btn btn-sm btn-ghost" @click="$emit('open-filters')">More filters</button>
        <button class="btn btn-ghost btn-sm" title="Share current view" @click="share">Share</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStatsState } from '../../composables/useStatsState'
const { state, share } = useStatsState()
defineEmits<{(e:'open-filters'):void}>()
</script>