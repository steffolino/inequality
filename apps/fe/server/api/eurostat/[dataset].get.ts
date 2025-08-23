// /server/api/eurostat/[dataset].get.ts
import { defineEventHandler, getRouterParam, getQuery, createError } from 'h3'

/**
 * Parse Eurostat JSON-stat 2.0 dataset into tidy rows.
 */
function parseEurostat(json: any) {
  if (!json?.value) return []

  const dimIds: string[] = json.id
  const size: number[] = json.size
  const dims = json.dimension

  // Build reverse lookup: dimension -> [key by index]
  const dimCats: Record<string, string[]> = {}
  for (const dim of dimIds) {
    const cat = dims[dim]?.category?.index ?? {}
    const labels = Object.entries(cat)
      .sort((a, b) => (a[1] as number) - (b[1] as number))
      .map(([k]) => k)
    dimCats[dim] = labels
  }

  const rows: any[] = []
  for (const [obsKey, val] of Object.entries(json.value)) {
    let idx = Number(obsKey)
    const coords: Record<string, any> = {}
    for (let d = dimIds.length - 1; d >= 0; d--) {
      const sizeD = size[d]
      const pos = idx % sizeD
      idx = Math.floor(idx / sizeD)
      const dimName = dimIds[d]
      coords[dimName] = dimCats[dimName][pos]
    }
    rows.push({
      region: coords.geo,
      year: Number(coords.time),
      age: coords.age,
      stat: coords.statinfo,
      value: Number(val)
    })
  }

  return rows
}

export default defineEventHandler(async (event) => {
  const dataset = getRouterParam(event, 'dataset')
  const q = getQuery(event)

  if (!dataset) {
    throw createError({ statusCode: 400, statusMessage: 'Missing dataset param' })
  }

  const regions = String(q.regions ?? 'DE,EU27_2020').split(',')
  const yearStart = Number(q.yearStart ?? 2014)
  const yearEnd = Number(q.yearEnd ?? 2024)

  const rows: any[] = []

  for (let y = yearStart; y <= yearEnd; y++) {
    const params: Record<string, string> = {
      geo: regions.join(','),
      time: String(y),
      freq: 'A'
    }

    // dataset-specific tweaks
    if (dataset.toLowerCase() === 'ilc_di12') {
      params['age'] = 'TOTAL'
      params['statinfo'] = 'GINI_HND'
    }

    const url =
      `https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/${dataset}?` +
      new URLSearchParams(params).toString()

    try {
      const json = await $fetch<any>(url)
      const parsed = parseEurostat(json)
      rows.push(...parsed)
    } catch (err: any) {
      console.warn(`Eurostat fetch failed for ${dataset} ${y}`, err?.statusMessage || err)
      continue
    }
  }

  return { rows }
})