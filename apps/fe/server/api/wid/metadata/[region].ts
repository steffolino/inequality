// server/api/wid/metadata/[region].ts
import { defineEventHandler } from 'h3'
import { readFile } from 'fs/promises'
import { join } from 'path'
import Papa from 'papaparse'

export default defineEventHandler(async (event) => {
  const { region } = event.context.params as { region: string }

  try {
    const filePath = join(process.cwd(), '/public/data', `WID_metadata_${region}.csv`)
    const csv = await readFile(filePath, 'utf8')
    const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true })

    const indicators = (parsed.data as any[]).map((r) => ({
      variable: r.variable || r.indicator,
      shortname: r.shortname || r.label || r.name || r.variable,
      unit: r.unit || null,
      source: r.source || null,
      description: r.simpledes || r.technicaldes || ''
    }))

    return { rows: indicators }
  } catch (e: any) {
    console.error('WID metadata fetch failed', e)
    return { error: true, message: `Metadata not found for region ${region}` }
  }
})
