# Local Dev — inequality (Edge API + Nuxt)

## One-time
```bash
# install root helper
npm i

# install worker deps
npm --prefix apps/db-proxy i

# install frontend deps
npm --prefix apps/fe i

# create local D1 db and seed it (uses npx wrangler)
npm run db:seed:local
```

## Run both (Worker + Nuxt) from project root
```bash
npm run dev
# PROXY -> wrangler dev (prints http://127.0.0.1:8787)
# FE    -> nuxt dev (http://127.0.0.1:3000)
```

## Test in browser/devtools
```js
await $fetch('/api/health', { baseURL: 'http://127.0.0.1:8787' })
await $fetch('/api/baseline', { baseURL: 'http://127.0.0.1:8787', query: { region: 'DE', from: 2014, to: 2024 } })
await $fetch('/api/simulate', { baseURL: 'http://127.0.0.1:8787', method: 'POST', body: { region:'DE', year:2024, redistribution_rate:0.15, include_wealth_tax:true } })
```

## Deploy
```bash
# 1) create a remote D1 database (prints id)
npm --prefix apps/db-proxy exec wrangler d1 create inequality-edge-db

# 2) put the database_id into apps/db-proxy/wrangler.toml

# 3) seed remote
npm run db:seed

# 4) deploy worker
npm --prefix apps/db-proxy run deploy
```
