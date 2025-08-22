<script setup lang="ts">
import { computed } from 'vue'
import { useStatsState } from '../../composables/useStatsState'
import VegaLite from '../../components/charts/VegaLite.vue'

const { state } = useStatsState()

// helper to resolve a CSS variable (light/dark mode aware)
function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

const headlinePrefix = computed(() => 'Your household gains')

const monthlyGain = computed(() => {
  const base =
    state.group === 'top10' ? 180 :
    state.group === 'middle40' ? 220 : 260
  return state.scenario === 'policyA' ? base + 60 : base
})

const breakdown = computed(() => {
  const inc = Math.round(monthlyGain.value * 0.7)
  const taxes = Math.round(monthlyGain.value * -0.2)
  const transfers = Math.round(monthlyGain.value * 0.5)
  return { income: inc, taxes, transfers }
})

const miniSpec = computed(() => {
  const you = monthlyGain.value
  const avg = you - 30
  const top10 = 280

  // resolve DaisyUI/Tailwind tokens
  const baseContent = cssVar('--bc')    // text color
  const primary = cssVar('--p')         // bar color
  const grid = baseContent + '40'       // add transparency

  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    width: 'container',
    height: 120,
    background: 'transparent',
    data: {
      values: [
        { cat: 'You', value: you },
        { cat: 'Average', value: avg },
        { cat: 'Top 10%', value: top10 }
      ]
    },
    mark: { type: 'bar', color: primary },
    encoding: {
      x: {
        field: 'cat',
        type: 'nominal',
        axis: { labelColor: baseContent, title: null }
      },
      y: {
        field: 'value',
        type: 'quantitative',
        title: '€/month',
        axis: {
          labelColor: baseContent,
          titleColor: baseContent,
          domainColor: grid,
          tickColor: grid,
          gridColor: grid
        }
      }
    },
    config: {
      view: { stroke: null },
      title: { color: baseContent },
      legend: {
        labelColor: baseContent,
        titleColor: baseContent
      }
    }
  }
})
</script>
