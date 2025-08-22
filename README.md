# Inequality Edge Backend (Cloudflare Workers)

This repo contains a **Python Worker (FastAPI)** that orchestrates reads from **D1**, calls a **Postgres** aggregate via a **Hyperdrive-backed TypeScript Worker**, and writes scenario exports to **R2**.

> ⚠️ **Heads-up (Aug 2025):** Python Workers are in **beta**. Cloudflare docs currently state that **third‑party packages (like FastAPI) are not deployable in production** yet — they work in local dev. For production, ship the TS `db-proxy` Worker and either (a) expose minimal endpoints directly in Python without external packages, or (b) run FastAPI in a container behind a Worker. See Cloudflare’s docs for Python Workers Packages and FastAPI pages. 

## Apps
- `apps/api-python/` — Python Worker using FastAPI for routing (dev/experimental), reads **D1**, calls `db-proxy` via a **Service Binding**, writes to **R2**.
- `apps/db-proxy/` — TypeScript Worker that connects to **Postgres via Hyperdrive** and exposes `/aggregate` for the Python Worker.

## Cloudflare resources
- **D1**: stores baseline series and immutable parameter snapshots.
- **R2**: stores exported scenario JSON blobs.
- **Hyperdrive**: accelerates access to your existing Postgres.
- **Service Binding**: `api-python` → `db-proxy` internal call.

## Quick start

### 1) Create Cloudflare resources
```bash
# D1 (create the DB and run schema)
npx wrangler d1 create ineq-db
# capture the database_id from the output
npx wrangler d1 execute ineq-db --file ./apps/api-python/d1/schema.sql

# R2 bucket
npx wrangler r2 bucket create ineq-exports

# Hyperdrive (connect to your Postgres)
npx wrangler hyperdrive create ineq-hd --connection-string="postgres://USER:PASS@HOST:5432/DBNAME"
```

### 2) Configure wrangler bindings
Edit the `wrangler.toml` files in both apps:
- Put your **D1** `database_id` and `database_name` into `apps/api-python/wrangler.toml`.
- Put your **R2** bucket name into `apps/api-python/wrangler.toml`.
- Put your **Hyperdrive** `id` into `apps/db-proxy/wrangler.toml`.

### 3) Run locally
- **db-proxy (TS)**: `pnpm i && pnpm dev`
- **api-python (FastAPI, dev)**: ensure you have **uv** installed, then `uv run pywrangler dev`

### 4) Deploy
- Deploy the `db-proxy` first: `npx wrangler deploy` in `apps/db-proxy`.
- Then deploy `api-python`: `npx wrangler deploy` in `apps/api-python`.
  - If deploy of Python with FastAPI fails (packages), use the plain-Python fallback or containerize FastAPI behind a Worker.

## Endpoints
- `GET /api/stats?region=DE` — read baseline time series from D1.
- `POST /api/simulate` — validate scenario, call Postgres aggregate via service binding, persist export to R2; returns JSON with `exportKey`.

## Notes
- D1 queries in Python Workers use `await env.DB.prepare(...).bind(...).all()`.
- R2 access from Python Workers uses the R2 binding on `env` (via Python FFI).
- Service binding is available on `env.DBPROXY`; you forward a `Request` to `.fetch(...)`.


## Frontend (Nuxt 3)

A mobile-first statistics visualisation app was added at **`apps/fe`**.

Quick start:
```bash
cd apps/fe
pnpm i   # or npm i / yarn
pnpm dev
```
Static export:
```bash
pnpm generate && pnpm preview
```
