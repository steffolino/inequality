import { defineEventHandler, getQuery } from 'h3'
import { readFile } from 'fs/promises'
import { join } from 'path'
import Papa from 'papaparse'

export default defineEventHandler(async (event) => {
  const { region } = event.context.params as { region: string }
  const query = getQuery(event)
  const indicator = (query.indicator as string) || ''
  const yearStart = Number(query.yearStart || 1950)
  const yearEnd = Number(query.yearEnd || 2024)

  try {
    const filePath = join(process.cwd(), '/public/data', `WID_data_${region}.csv`)
    const csv = await readFile(filePath, 'utf8')
    const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true })

    const rows = (parsed.data as any[])
      .filter(r => {
        const y = Number(r.year)
        if (isNaN(y) || y < yearStart || y > yearEnd) return false

        if (!indicator) return true

        // ✅ multiple indicators supported
        const indicators = indicator.split(',').map(s => s.trim())
        return indicators.includes(r.variable)
      })
      .map(r => ({
        year: Number(r.year),
        value: r.value !== '' ? Number(r.value) : null,
        indicator: r.variable,
        region
      }))

    return { rows }
  } catch (e: any) {
    console.error('WID data fetch failed', e)
    return { error: true, message: `Data not found for region ${region}` }
  }
})
