<template>
  <div class="top-14 z-20 border-b border-base-200 bg-base-100/95 backdrop-blur">
    <div class="px-4 py-2 max-w-6xl mx-auto flex items-center gap-2">
      <select v-model="state.timeframe" class="select select-sm select-bordered">
        <option>1990-2005</option>
        <option>2000-2025</option>
        <option>2010-2025</option>
      </select>
      <select v-model="state.dataset" class="select select-sm select-bordered">
        <option value="householdIncome">Household Income</option>
        <option value="wealthShare">Wealth Share</option>
      </select>
      <button class="btn btn-sm" @click="$emit('open-filters')"><Icon name="tabler:adjustments" class="text-lg" />More filters</button>
      <button class="btn btn-ghost btn-sm ml-auto" @click="share" title="Share current view"><Icon name="tabler:share-2" class="text-lg" /></button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStatsState } from '../../composables/useStatsState';
const { state, share } = useStatsState()
defineEmits<{(e:'open-filters'):void}>()
</script>