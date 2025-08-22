import { watch, computed } from 'vue';

export type DatasetKey = 'householdIncome' | 'wealthShare'
export type ScenarioKey = 'baseline' | 'policyA'
export interface StatsState {
  timeframe: string
  dataset: DatasetKey
  group: 'bottom50' | 'middle40' | 'top10'
  region: 'DE' | 'EU' | 'BY' | 'BE' | 'NW' | 'SN'
  scenario: ScenarioKey
}

const DEFAULT: StatsState = {
  timeframe: '2000-2025',
  dataset: 'wealthShare',
  group: 'top10',
  region: 'DE',
  scenario: 'baseline'
}

export function useStatsState() {
  const route = useRoute()
  const router = useRouter()

  // 🔴 one global reactive state shared app‑wide
  const state = useState<StatsState>('stats', () => ({ ...DEFAULT }))

  // hydrate from query (once)
  if (process.client) {
    const q = route.query
    state.value.timeframe = (q.t as string) || state.value.timeframe
    state.value.dataset   = (q.d as DatasetKey) || state.value.dataset
    state.value.group     = (q.g as any) || state.value.group
    state.value.region    = (q.r as any) || state.value.region
    state.value.scenario  = (q.s as ScenarioKey) || state.value.scenario
  }

  // keep URL in sync (debounced)
  let timer: any
  watch(state, () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      router.replace({
        query: {
          t: state.value.timeframe,
          d: state.value.dataset,
          g: state.value.group,
          r: state.value.region,
          s: state.value.scenario
        }
      })
    }, 100)
  }, { deep: true })

  const shareUrl = computed(() => {
    if (!process.client) return ''
    const url = new URL(window.location.href)
    url.searchParams.set('t', state.value.timeframe)
    url.searchParams.set('d', state.value.dataset)
    url.searchParams.set('g', state.value.group)
    url.searchParams.set('r', state.value.region)
    url.searchParams.set('s', state.value.scenario)
    return url.toString()
  })

  async function share() {
    const url = shareUrl.value
    try {
      if (navigator.share) await navigator.share({ title: 'Inequality', text: 'Inequality stats', url })
      else { await navigator.clipboard.writeText(url); alert('Link copied to clipboard') }
    } catch (e) { console.warn(e) }
  }

  return { state: state.value, share, shareUrl }
}
