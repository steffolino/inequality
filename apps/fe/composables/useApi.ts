// Robust API client + series helper
export type SeriesParams = {
  indicator?: string;   // 'gini' | 'wealthShare'
  group?: string;       // 'bottom50'
  region?: string;      // 'DE' | 'EU' | 'SN'
  from?: number;
  to?: number;
  scenario?: string;    // 'baseline' | ...
  t?: string;           // '2000-2025' shorthand
};

export const useApi = () => {
  const config = useRuntimeConfig();
  const runtimeBase = (config?.public as any)?.apiBase;
  const envBase = (typeof process !== 'undefined' ? (process.env as any)?.NUXT_PUBLIC_API_BASE : undefined);
  const base = runtimeBase || envBase || 'http://127.0.0.1:8787';

  const get = <T = any>(path: string, opts: any = {}) =>
    $fetch<T>(path, { baseURL: base, method: 'GET', ...opts });

  const post = <T = any>(path: string, body?: any, opts: any = {}) =>
    $fetch<T>(path, { baseURL: base, method: 'POST', body, ...opts });

  const getSeries = async (p: SeriesParams) => {
    const params = new URLSearchParams();
    if (p.indicator) params.set('indicator', p.indicator);
    if (p.group) params.set('group', p.group);
    if (p.region) params.set('region', p.region);
    if (typeof p.from === 'number') params.set('from', String(p.from));
    if (typeof p.to === 'number') params.set('to', String(p.to));
    if (p.scenario) params.set('scenario', p.scenario);
    if (p.t) params.set('t', p.t);

    const res = await get<{ data: { year:number; value:number }[] }>(`/api/series?${params.toString()}`);
    return res?.data ?? [];
  };

  return { base, get, post, getSeries };
};
