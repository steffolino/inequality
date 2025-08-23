import { defineEventHandler, getQuery } from 'h3'
import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const country = (query.country as string) || 'DEU'
  const yearStart = query.yearStart || '2000'
  const yearEnd = query.yearEnd || '2022'

  // geprüfte Indikatoren für WID (Wealth shares)
  const indicators = [
    'sweal_p99p100_z', // Top 1 %
    'sweal_p90p100_z', // Top 10 %
    'sweal_p0p50_z'    // Bottom 50 %
  ].join(',')

  const url = `https://wid.world/wid-api/v2/wid/?country=${country}&year=${yearStart}-${yearEnd}&indicator=${indicators}`

  let data: any
  try {
    data = await $fetch(url)
  } catch (e) {
    console.error('WID fetch failed:', url, e)
    return { rows: [] }
  }

  if (!data || !data.values) return { rows: [] }

  // Mapping in deine Chart-Struktur
  const rows = data.values.map((d: any) => ({
    year: Number(d.year),
    group: d.indicator === 'sweal_p99p100_z'
      ? 'Top 1%'
      : d.indicator === 'sweal_p90p100_z'
      ? 'Top 10%'
      : 'Bottom 50%',
    value: Number(d.value)
  }))

  return { rows }
})
