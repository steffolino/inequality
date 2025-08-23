import { reactive } from 'vue'

type StatsState = {
  timeframe: string   // "2000-2025"
  region: string      // "DE", "EU-27", etc.
  dataset: string     // "wealthShare" | "householdIncome"
  group: string       // ui filter (e.g., "top10")
  scenario: 'baseline' | 'policyA'
}

const state = reactive<StatsState>({
  timeframe: '2000-2025',
  region: 'EU-27',
  dataset: 'wealthShare',
  group: 'top10',
  scenario: 'baseline',
})

export function useStatsState() {
  function share() {
    const url = new URL(location.href)
    url.searchParams.set('timeframe', state.timeframe)
    url.searchParams.set('region', state.region)
    url.searchParams.set('dataset', state.dataset)
    navigator.clipboard?.writeText(url.toString()).catch(() => {})
  }
  return { state, share }
}
