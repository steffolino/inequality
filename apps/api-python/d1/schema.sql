-- D1 schema for inequality app (Eurostat Gini - Germany)
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS baseline_series (
  region TEXT NOT NULL,
  year INTEGER NOT NULL,
  gini REAL NOT NULL,       -- scaled 0..1
  PRIMARY KEY (region, year)
);

CREATE TABLE IF NOT EXISTS parameter_snapshots (
  id TEXT PRIMARY KEY,      -- content-addressed hash (sha256 of canonical JSON)
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ')),
  region TEXT NOT NULL,
  year INTEGER NOT NULL,
  redistribution_rate REAL NOT NULL,
  include_wealth_tax INTEGER NOT NULL DEFAULT 0,
  version TEXT NOT NULL DEFAULT 'v1',
  notes TEXT
);

-- Seed Germany (DE) baseline from Eurostat ilc_di12 A.TOTAL.GINI_HND.DE (year -> value 0..100)
INSERT OR REPLACE INTO baseline_series(region, year, gini) VALUES
 ('DE', 2014, 0.307),
 ('DE', 2015, 0.301),
 ('DE', 2016, 0.295),
 ('DE', 2017, 0.291),
 ('DE', 2018, 0.311),
 ('DE', 2019, 0.297),
 ('DE', 2020, 0.305),
 ('DE', 2021, 0.312),
 ('DE', 2022, 0.290),
 ('DE', 2023, 0.294),
 ('DE', 2024, 0.295);
