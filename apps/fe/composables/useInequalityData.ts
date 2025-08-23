import { ofetch } from 'ofetch'

export type EurostatRow = Record<string, any>

export async function fetchEurostatTidy(args: {
  dataset: string
  regions: string[]
  yearStart: number
  yearEnd?: number
  extra?: Record<string, string>
}): Promise<{ rows: EurostatRow[]; url: string }> {
  const { dataset, regions, yearStart, yearEnd, extra } = args
  const params = new URLSearchParams({
    regions: regions.join(','),
    yearStart: String(yearStart),
    ...(yearEnd ? { yearEnd: String(yearEnd) } : {}),
    ...(extra ?? {}),
  })
  const url = `/api/eurostat/${encodeURIComponent(dataset)}?${params.toString()}`

  const data = await ofetch<any>(url).catch((e: any) => {
    const msg = e?.statusMessage || e?.message || 'Eurostat fetch failed'
    console.error('Eurostat fetch error', msg)
    throw new Error(msg)
  })

  let rows: EurostatRow[] = []
  if (Array.isArray(data?.value)) rows = data.value
  else if (Array.isArray(data)) rows = data
  else if (Array.isArray(data?.data)) rows = data.data
  else if (data && typeof data === 'object') {
    const keys = Object.keys(data)
    if (keys.length && Array.isArray((data as any)[keys[0]])) {
      const len = (data as any)[keys[0]].length
      rows = Array.from({ length: len }, (_, i) => {
        const o: Record<string, any> = {}
        for (const k of keys) o[k] = (data as any)[k][i]
        return o
      })
    } else {
      rows = [data]
    }
  }
  return { rows, url }
}

export function firstLast(
  rows: EurostatRow[],
  timeField = 'time',
  valueField = 'value'
): { first?: EurostatRow; last?: EurostatRow } {
  if (!Array.isArray(rows) || rows.length === 0) return {}
  const parseT = (r: EurostatRow) => {
    const t = r?.[timeField]
    const n = Number(t)
    return Number.isFinite(n) ? n : t
  }
  const sorted = [...rows].sort((a, b) => {
    const ta = parseT(a),
      tb = parseT(b)
    if (typeof ta === 'number' && typeof tb === 'number') return ta - tb
    return String(ta).localeCompare(String(tb))
  })
  return { first: sorted[0], last: sorted[sorted.length - 1] }
}

export async function fetchWidTidy(args: {
  series: string
  country: string
  yearStart?: number
  yearEnd?: number
}): Promise<{ rows: Record<string, any>[]; url: string }> {
  const url = `/api/wid/${encodeURIComponent(args.series)}?${new URLSearchParams({
    country: args.country,
    ...(args.yearStart ? { yearStart: String(args.yearStart) } : {}),
    ...(args.yearEnd ? { yearEnd: String(args.yearEnd) } : {}),
  }).toString()}`

  const data = await ofetch<any>(url).catch((e: any) => {
    const msg = e?.statusMessage || e?.message || 'WID fetch failed'
    console.error('WID fetch error', msg)
    throw new Error(msg)
  })

  const rows = Array.isArray(data?.rows) ? data.rows : []
  return { rows, url }
}

export function useInequalityData() {
  return {
    fetchEurostatTidy,
    fetchWidTidy,
    firstLast,
  }
}
