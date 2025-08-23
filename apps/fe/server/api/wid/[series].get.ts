export default defineEventHandler(async (event) => {
  const series = getRouterParam(event, 'series')
  const q = getQuery(event)
  const country = String(q.country ?? 'DEU')

  if (series === 'wid_palma') {
    // OWID Palma is CSV only
    const csvUrl =
      'https://ourworldindata.org/grapher/palma-ratio-s90s40-ratio.csv'
    const csvText = await $fetch<string>(csvUrl, { responseType: 'text' })

    const [headerLine, ...lines] = csvText.split('\n').filter(Boolean)
    const headers = headerLine.split(',')

    const entityIdx = headers.indexOf('Entity')
    const yearIdx = headers.indexOf('Year')
    const valueIdx = headers.findIndex((h) => h.includes('Palma'))

    const rows = lines
      .map((line) => line.split(','))
      .filter((cols) =>
        country === 'DEU'
          ? cols[entityIdx] === 'Germany'
          : cols[entityIdx] === country
      )
      .map((cols) => ({
        year: Number(cols[yearIdx]),
        value: Number(cols[valueIdx]),
      }))

    return { rows, url: csvUrl }
  }

  // fallback: call WID API directly
  const base = 'https://wid.world/data/series'
  const url = `${base}?series=${series}&area=${country}`

  try {
    const json = await $fetch<any>(url)
    return { rows: json?.value ?? json?.data ?? json, url }
  } catch (e: any) {
    throw createError({
      statusCode: 404,
      statusMessage: `WID error for ${series}`,
      data: e?.data ?? e?.message ?? null,
    })
  }
})
