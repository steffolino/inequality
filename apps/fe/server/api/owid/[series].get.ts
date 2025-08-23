import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const series = getRouterParam(event, 'series')
  const q = getQuery(event)
  const country = String(q.country ?? 'DEU')

  if (series === 'wid_palma') {
    // WID doesn’t provide Palma → use OWID Grapher dataset instead
    const owidUrl =
      'https://ourworldindata.org/grapher/palma-ratio-s90s40-ratio.json'
    const owid = await $fetch<any>(owidUrl)
    const data = owid?.data ?? []
    const countryName = country === 'DEU' ? 'Germany' : country
    const rows = data.filter((r: any) => r.entity === countryName)
    return { rows, url: owidUrl }
  }

  const base = 'https://wid.world/data/series'
  const params = new URLSearchParams({
    series: series!,
    area: country,
    ...(q.yearStart ? { year_start: String(q.yearStart) } : {}),
    ...(q.yearEnd ? { year_end: String(q.yearEnd) } : {}),
  })
  const url = `${base}?${params.toString()}`

  try {
    const data = await $fetch<any>(url)
    return { rows: data?.value ?? data?.data ?? data, url }
  } catch (e: any) {
    throw createError({
      statusCode: 404,
      statusMessage: `WID error for ${series}`,
      data: e?.data ?? e?.message ?? null,
    })
  }
})
