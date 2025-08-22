from workers import WorkerEntrypoint, Response
from fastapi import FastAPI, Request
from pydantic import BaseModel, Field
import json
from datetime import datetime

# IMPORTANT: Cloudflare provides an ASGI bridge via 'asgi'
# See docs: developers.cloudflare.com/workers/languages/python/packages/fastapi/
class Default(WorkerEntrypoint):
    async def fetch(self, request, env):
        import asgi  # provided by the platform
        # Attach env on scope so handlers can access bindings
        return await asgi.fetch(app, request, env)

app = FastAPI(title="Inequality API (Python Worker)")

class ScenarioInput(BaseModel):
    year: int = Field(ge=1995, le=2035)
    redistributionRate: float = Field(ge=0, le=1)
    includeWealthTax: bool = False
    region: str = "DE"

@app.get("/api/health")
async def health():
    return {"ok": True, "ts": datetime.utcnow().isoformat() + "Z"}

@app.get("/api/stats")
async def get_stats(req: Request, region: str = "DE"):
    env = req.scope["env"]
    # D1: baseline series for region
    # D1 returns an object with .results (array of rows)
    res = await env.DB.prepare(
        "SELECT year, gini FROM baseline_series WHERE region = ? ORDER BY year ASC"
    ).bind(region).all()
    rows = res["results"] if isinstance(res, dict) else res.results
    series = [{"year": r["year"], "gini": r["gini"]} for r in rows]
    return {"region": region, "series": series}

@app.post("/api/simulate")
async def simulate(req: Request, payload: ScenarioInput):
    env = req.scope["env"]

    # Example: read a baseline value from D1 for the given year/region
    base_res = await env.DB.prepare(
        "SELECT gini FROM baseline_series WHERE region = ? AND year = ? LIMIT 1"
    ).bind(payload.region, payload.year).all()
    base_rows = base_res["results"] if isinstance(base_res, dict) else base_res.results
    gini_before = base_rows[0]["gini"] if base_rows else 0.31

    # Example effect model (replace with your own logic)
    effect = 0.07 * payload.redistributionRate + (0.015 if payload.includeWealthTax else 0.0)
    gini_after = max(0.0, gini_before - effect)

    # Call Postgres aggregate via service binding to the TS Worker
    from js import Request as JsRequest
    qs = f"year={payload.year}&region={payload.region}"
    proxy_req = JsRequest.new(f"https://db-proxy.internal/aggregate?{qs}")
    proxy_resp = await env.DBPROXY.fetch(proxy_req)
    agg = await proxy_resp.json()

    result = {
        "input": payload.model_dump(),
        "giniBefore": gini_before,
        "giniAfter": gini_after,
        "top10IncomeShareBefore": agg.get("top10_before", 0.37),
        "top10IncomeShareAfter": agg.get("top10_after", 0.37 - 0.10 * payload.redistributionRate),
        "revenueEstimate": round(45_000_000_000 * payload.redistributionRate),
        "notes": agg.get("notes", []),
        "computedAt": datetime.utcnow().isoformat() + "Z",
    }

    # Persist export to R2 as JSON
    key = f"exports/{payload.region}-{payload.year}-{int(datetime.utcnow().timestamp())}.json"
    body = json.dumps(result)
    # R2 binding via Python FFI
    await env.EXPORTS.put(key, body, { "httpMetadata": { "contentType": "application/json" } })

    return { **result, "exportKey": key }
