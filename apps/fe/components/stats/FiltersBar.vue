<template>
  <div class="flex flex-wrap items-center gap-2">
    <!-- Timeframe -->
    <label class="form-control w-auto">
      <div class="label"><span class="label-text text-xs">Timeframe</span></div>
      <select class="select select-sm select-bordered"
        :value="`${model.yearStart}-${model.yearEnd}`"
        @change="onRangeChange(($event.target as HTMLSelectElement).value)">
        <option v-for="opt in ranges" :key="opt" :value="opt">{{ opt }}</option>
      </select>
    </label>

    <!-- Region -->
    <label class="form-control w-auto">
      <div class="label"><span class="label-text text-xs">Region</span></div>
      <select class="select select-sm select-bordered" :value="model.region" @change="emitChange('region', ($event.target as HTMLSelectElement).value)">
        <option v-for="r in regions" :key="r.value" :value="r.value">{{ r.label }}</option>
      </select>
    </label>

    <!-- Dataset -->
    <label class="form-control w-auto">
      <div class="label"><span class="label-text text-xs">Metric</span></div>
      <select class="select select-sm select-bordered" :value="model.dataset" @change="emitChange('dataset', ($event.target as HTMLSelectElement).value)">
        <option value="wealthShare">Wealth Share</option>
        <option value="incomeShare">Income Share</option>
        <option value="inequalityIndex">Inequality Index</option>
      </select>
    </label>

    <button class="btn btn-sm" @click="$emit('reset')">Reset</button>

    <button class="btn btn-sm btn-ghost ml-auto" @click="$emit('open-more')">
      <span class="mr-1">More filters</span>
      <i class="i-ph-sliders-duotone" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: { yearStart:number; yearEnd:number; region:string; dataset:string }
  regions?: { value:string; label:string }[]
  ranges?: string[]
}>()
const emit = defineEmits(['update:modelValue','open-more','reset'])
const model = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})

const regions = computed(() => props.regions?.length ? props.regions : [
  { value: 'DE', label: 'Germany' },
  { value: 'EU27_2020', label: 'EU-27' },
])

const ranges = computed(() => props.ranges?.length ? props.ranges : [
  '1995-2025','2000-2025','2008-2025','2015-2025'
])

function emitChange<K extends keyof typeof model.value>(key: K, val: any) {
  model.value = { ...model.value, [key]: (key==='yearStart'||key==='yearEnd') ? Number(val) : val }
}
function onRangeChange(v:string) {
  const [s,e] = v.split('-').map(n => Number(n))
  model.value = { ...model.value, yearStart:s, yearEnd:e }
}
</script>
