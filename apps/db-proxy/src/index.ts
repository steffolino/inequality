// apps/db-proxy/src/index.ts — add region normalization (e.g., SN -> DE)
export interface Env {
  DB: D1Database;
  SIM_ALPHA?: string;
  SIM_BETA?: string;
}

type SeriesQuery = {
  indicator?: string;
  group?: string;
  region?: string;
  from?: number;
  to?: number;
  scenario?: string;
};

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };
const ok = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
const bad = (msg: string, status = 400) => ok({ error: msg }, status);

function allowCORS(req: Request, res: Response): Response {
  const origin = req.headers.get("origin") ?? "";
  const allow =
    origin === "http://127.0.0.1:3000" ||
    origin === "http://localhost:3000" ||
    origin.endsWith(".pages.dev") ||
    origin.endsWith(".workers.dev");
  if (allow) {
    const h = new Headers(res.headers);
    h.set("Access-Control-Allow-Origin", origin);
    h.set("Access-Control-Allow-Credentials", "true");
    h.set("Vary", "Origin");
    return new Response(res.body, { status: res.status, headers: h });
  }
  return res;
}

// Helper to parse ?t=2000-2025 style ranges
const parseRange = (t: string | null) => {
  if (!t) return { from: undefined, to: undefined };
  const [a,b] = t.split("-");
  const from = Number(a); const to = Number(b);
  return { from: Number.isFinite(from) ? from : undefined, to: Number.isFinite(to) ? to : undefined };
};

// ---- NEW: normalize regions (temporary fallback)
// Map German ISO state codes (BW,BY,...,SN,...) to national 'DE' if no regional series exists yet.
const STATE_TO_DE = new Set([
  "BW","BY","BE","BB","HB","HH","HE","MV","NI","NW","RP","SL","SN","ST","SH","TH"
]);
function normalizeRegion(input: string): { resolved: string; input: string; fallback: boolean } {
  const up = (input || "").toUpperCase();
  if (up === "DE") return { resolved: "DE", input: up, fallback: false };
  if (STATE_TO_DE.has(up)) return { resolved: "DE", input: up, fallback: true };
  return { resolved: up, input: up, fallback: false };
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": req.headers.get("origin") ?? "*",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Credentials": "true",
          "Vary": "Origin"
        }
      });
    }

    const url = new URL(req.url);
    const { pathname, searchParams } = url;

    try {
      // Health
      if (pathname === "/api/health") {
        return allowCORS(req, ok({ ok: true, service: "inequality-edge-api", time: new Date().toISOString() }));
      }

      // --- Series endpoint with normalization ---
      if (pathname === "/api/series" && req.method === "GET") {
        const indicator = (searchParams.get("d") || searchParams.get("indicator") || "gini").toLowerCase();
        const group = (searchParams.get("g") || searchParams.get("group") || "").toLowerCase();
        const regionRaw = (searchParams.get("r") || searchParams.get("region") || "DE");
        const t = searchParams.get("t");
        const { from: fromQ, to: toQ } = parseRange(t);
        const from = Number(searchParams.get("from") || fromQ || 2014);
        const to = Number(searchParams.get("to") || toQ || 2024);
        const scenario = searchParams.get("s") || searchParams.get("scenario") || "baseline";

        if (!Number.isFinite(from) || !Number.isFinite(to) || from > to) {
          return allowCORS(req, bad("Invalid from/to range"));
        }

        const norm = normalizeRegion(regionRaw);

        if (indicator === "gini") {
          const stmt = env.DB.prepare(
            `SELECT year, gini AS value
             FROM baseline_series
             WHERE region = ?1 AND year BETWEEN ?2 AND ?3
             ORDER BY year`
          ).bind(norm.resolved, from, to);
          const { results } = await stmt.all<{year:number; value:number}>();
          return allowCORS(req, ok({
            indicator, group,
            region_input: norm.input,
            region_resolved: norm.resolved,
            region_fallback: norm.fallback,
            scenario, from, to,
            data: results
          }));
        }

        // Unsupported indicators -> empty data (no FE error spam)
        return allowCORS(req, ok({
          indicator, group,
          region_input: norm.input,
          region_resolved: norm.resolved,
          region_fallback: norm.fallback,
          scenario, from, to,
          data: []
        }));
      }

      // Keep other routes 404 here; your earlier Worker has /api/baseline, /api/simulate, etc.
      return allowCORS(req, bad("Not found", 404));
    } catch (err: any) {
      return allowCORS(req, ok({ error: err?.message ?? String(err) }, 500));
    }
  }
};
