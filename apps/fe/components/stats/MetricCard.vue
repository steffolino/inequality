<template>
  <div class="card bg-base-100 shadow-sm ring-1 ring-base-300/60 hover:shadow-md transition">
    <div class="card-body gap-2">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-xs uppercase tracking-wide text-base-content/60">{{ label }}</p>
          <div class="mt-1 flex items-baseline gap-2">
            <p class="text-3xl font-extrabold">{{ formatted }}</p>
            <p v-if="unit" class="text-sm opacity-70">{{ unit }}</p>
          </div>
          <p v-if="subtitle" class="mt-1 text-xs text-base-content/70">{{ subtitle }}</p>
        </div>

        <InfoTooltip
          v-if="definition"
          :title="label"
          :aria-label="`Explain ${label}`"
          :source="definition.source"
          :source-label="definition.sourceLabel"
        >
          <p class="leading-snug">{{ definition.text }}</p>
          <p v-if="definition.example" class="mt-2 rounded bg-base-200 p-2 text-xs">
            <span class="font-semibold">Example: </span>{{ definition.example }}
          </p>
        </InfoTooltip>
      </div>

      <div v-if="trend" class="mt-1 text-xs">
        <span class="opacity-70">Change:</span>
        <span :class="trend.value > 0 ? 'text-error' : trend.value < 0 ? 'text-success' : ''">
          {{ trend.value > 0 ? '↑' : trend.value < 0 ? '↓' : '—' }}
          {{ Math.abs(trend.value).toFixed(1) }}{{ trend.unit || '%' }}
        </span>
        <span class="opacity-50"> since {{ trend.since }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InfoTooltip from '@/components/ui/InfoTooltip.vue'
import { computed } from 'vue'

type Trend = { value:number; since:string; unit?:string }
const props = defineProps<{
  label: string
  value: number | null | undefined
  decimals?: number
  unit?: string
  subtitle?: string
  trend?: Trend | null
  definition?: { text: string; example?: string; source?: string; sourceLabel?: string } | null
}>()

const formatted = computed(() => {
  if (props.value == null || Number.isNaN(props.value)) return '—'
  const d = props.decimals ?? 1
  return props.value.toFixed(d)
})
</script>
