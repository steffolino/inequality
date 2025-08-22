var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-w6w5HM/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// src/index.ts
var JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };
var ok = /* @__PURE__ */ __name((data, status = 200) => new Response(JSON.stringify(data), { status, headers: JSON_HEADERS }), "ok");
var bad = /* @__PURE__ */ __name((msg, status = 400) => ok({ error: msg }, status), "bad");
function allowCORS(req, res) {
  const origin = req.headers.get("origin") ?? "";
  const allow = origin === "http://127.0.0.1:3000" || origin === "http://localhost:3000" || origin.endsWith(".pages.dev") || origin.endsWith(".workers.dev");
  if (allow) {
    const h = new Headers(res.headers);
    h.set("Access-Control-Allow-Origin", origin);
    h.set("Access-Control-Allow-Credentials", "true");
    h.set("Vary", "Origin");
    return new Response(res.body, { status: res.status, headers: h });
  }
  return res;
}
__name(allowCORS, "allowCORS");
var parseRange = /* @__PURE__ */ __name((t) => {
  if (!t)
    return { from: void 0, to: void 0 };
  const [a, b] = t.split("-");
  const from = Number(a);
  const to = Number(b);
  return { from: Number.isFinite(from) ? from : void 0, to: Number.isFinite(to) ? to : void 0 };
}, "parseRange");
var STATE_TO_DE = /* @__PURE__ */ new Set([
  "BW",
  "BY",
  "BE",
  "BB",
  "HB",
  "HH",
  "HE",
  "MV",
  "NI",
  "NW",
  "RP",
  "SL",
  "SN",
  "ST",
  "SH",
  "TH"
]);
function normalizeRegion(input) {
  const up = (input || "").toUpperCase();
  if (up === "DE")
    return { resolved: "DE", input: up, fallback: false };
  if (STATE_TO_DE.has(up))
    return { resolved: "DE", input: up, fallback: true };
  return { resolved: up, input: up, fallback: false };
}
__name(normalizeRegion, "normalizeRegion");
var src_default = {
  async fetch(req, env) {
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
      if (pathname === "/api/health") {
        return allowCORS(req, ok({ ok: true, service: "inequality-edge-api", time: (/* @__PURE__ */ new Date()).toISOString() }));
      }
      if (pathname === "/api/series" && req.method === "GET") {
        const indicator = (searchParams.get("d") || searchParams.get("indicator") || "gini").toLowerCase();
        const group = (searchParams.get("g") || searchParams.get("group") || "").toLowerCase();
        const regionRaw = searchParams.get("r") || searchParams.get("region") || "DE";
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
          const { results } = await stmt.all();
          return allowCORS(req, ok({
            indicator,
            group,
            region_input: norm.input,
            region_resolved: norm.resolved,
            region_fallback: norm.fallback,
            scenario,
            from,
            to,
            data: results
          }));
        }
        return allowCORS(req, ok({
          indicator,
          group,
          region_input: norm.input,
          region_resolved: norm.resolved,
          region_fallback: norm.fallback,
          scenario,
          from,
          to,
          data: []
        }));
      }
      return allowCORS(req, bad("Not found", 404));
    } catch (err) {
      return allowCORS(req, ok({ error: err?.message ?? String(err) }, 500));
    }
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-w6w5HM/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-w6w5HM/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
