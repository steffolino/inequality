
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'ChartsVegaLite': typeof import("../components/charts/VegaLite.vue")['default']
    'ChartsVegaLiteEmbed': typeof import("../components/charts/VegaLiteEmbed.vue")['default']
    'StatsFiltersBar': typeof import("../components/stats/FiltersBar.vue")['default']
    'StatsFiltersDrawer': typeof import("../components/stats/FiltersDrawer.vue")['default']
    'StatsGlossaryModal': typeof import("../components/stats/GlossaryModal.vue")['default']
    'StatsMetricCard': typeof import("../components/stats/MetricCard.vue")['default']
    'StatsOutcomeCard': typeof import("../components/stats/OutcomeCard.vue")['default']
    'StatsPersonalEffectsCard': typeof import("../components/stats/PersonalEffectsCard.vue")['default']
    'StatsPlayground': typeof import("../components/stats/Playground.vue")['default']
    'StatsStatTile': typeof import("../components/stats/StatTile.vue")['default']
    'StatsCard': typeof import("../components/stats/StatsCard.vue")['default']
    'StatsPrimaryControls': typeof import("../components/stats/StatsPrimaryControls.vue")['default']
    'UiBottomTabBar': typeof import("../components/ui/BottomTabBar.vue")['default']
    'UiCookieConsent': typeof import("../components/ui/CookieConsent.vue")['default']
    'UiDesktopNavBar': typeof import("../components/ui/DesktopNavBar.vue")['default']
    'UiFooter': typeof import("../components/ui/Footer.vue")['default']
    'UiHeroStrip': typeof import("../components/ui/HeroStrip.vue")['default']
    'UiInfoTooltip': typeof import("../components/ui/InfoTooltip.vue")['default']
    'UiMobileHeader': typeof import("../components/ui/MobileHeader.vue")['default']
    'UiSectionCard': typeof import("../components/ui/SectionCard.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/.pnpm/@nuxt+image@1.11.0_@netlify+blobs@9.1.2_db0@0.3.2_ioredis@5.7.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
    'NuxtPicture': typeof import("../node_modules/.pnpm/@nuxt+image@1.11.0_@netlify+blobs@9.1.2_db0@0.3.2_ioredis@5.7.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
    'Icon': typeof import("../node_modules/.pnpm/nuxt-icon@0.6.10_magicast@0.3.5_vite@7.1.3_@types+node@24.3.0_jiti@2.5.1_terser@5.43.1_yaml@2_tirfelb5xooypnvtzoj3ayhwui/node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']
    'IconCSS': typeof import("../node_modules/.pnpm/nuxt-icon@0.6.10_magicast@0.3.5_vite@7.1.3_@types+node@24.3.0_jiti@2.5.1_terser@5.43.1_yaml@2_tirfelb5xooypnvtzoj3ayhwui/node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']
    'NuxtPage': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/server-placeholder")['default']
      'LazyChartsVegaLite': LazyComponent<typeof import("../components/charts/VegaLite.vue")['default']>
    'LazyChartsVegaLiteEmbed': LazyComponent<typeof import("../components/charts/VegaLiteEmbed.vue")['default']>
    'LazyStatsFiltersBar': LazyComponent<typeof import("../components/stats/FiltersBar.vue")['default']>
    'LazyStatsFiltersDrawer': LazyComponent<typeof import("../components/stats/FiltersDrawer.vue")['default']>
    'LazyStatsGlossaryModal': LazyComponent<typeof import("../components/stats/GlossaryModal.vue")['default']>
    'LazyStatsMetricCard': LazyComponent<typeof import("../components/stats/MetricCard.vue")['default']>
    'LazyStatsOutcomeCard': LazyComponent<typeof import("../components/stats/OutcomeCard.vue")['default']>
    'LazyStatsPersonalEffectsCard': LazyComponent<typeof import("../components/stats/PersonalEffectsCard.vue")['default']>
    'LazyStatsPlayground': LazyComponent<typeof import("../components/stats/Playground.vue")['default']>
    'LazyStatsStatTile': LazyComponent<typeof import("../components/stats/StatTile.vue")['default']>
    'LazyStatsCard': LazyComponent<typeof import("../components/stats/StatsCard.vue")['default']>
    'LazyStatsPrimaryControls': LazyComponent<typeof import("../components/stats/StatsPrimaryControls.vue")['default']>
    'LazyUiBottomTabBar': LazyComponent<typeof import("../components/ui/BottomTabBar.vue")['default']>
    'LazyUiCookieConsent': LazyComponent<typeof import("../components/ui/CookieConsent.vue")['default']>
    'LazyUiDesktopNavBar': LazyComponent<typeof import("../components/ui/DesktopNavBar.vue")['default']>
    'LazyUiFooter': LazyComponent<typeof import("../components/ui/Footer.vue")['default']>
    'LazyUiHeroStrip': LazyComponent<typeof import("../components/ui/HeroStrip.vue")['default']>
    'LazyUiInfoTooltip': LazyComponent<typeof import("../components/ui/InfoTooltip.vue")['default']>
    'LazyUiMobileHeader': LazyComponent<typeof import("../components/ui/MobileHeader.vue")['default']>
    'LazyUiSectionCard': LazyComponent<typeof import("../components/ui/SectionCard.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.11.0_@netlify+blobs@9.1.2_db0@0.3.2_ioredis@5.7.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.11.0_@netlify+blobs@9.1.2_db0@0.3.2_ioredis@5.7.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
    'LazyIcon': LazyComponent<typeof import("../node_modules/.pnpm/nuxt-icon@0.6.10_magicast@0.3.5_vite@7.1.3_@types+node@24.3.0_jiti@2.5.1_terser@5.43.1_yaml@2_tirfelb5xooypnvtzoj3ayhwui/node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']>
    'LazyIconCSS': LazyComponent<typeof import("../node_modules/.pnpm/nuxt-icon@0.6.10_magicast@0.3.5_vite@7.1.3_@types+node@24.3.0_jiti@2.5.1_terser@5.43.1_yaml@2_tirfelb5xooypnvtzoj3ayhwui/node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const ChartsVegaLite: typeof import("../components/charts/VegaLite.vue")['default']
export const ChartsVegaLiteEmbed: typeof import("../components/charts/VegaLiteEmbed.vue")['default']
export const StatsFiltersBar: typeof import("../components/stats/FiltersBar.vue")['default']
export const StatsFiltersDrawer: typeof import("../components/stats/FiltersDrawer.vue")['default']
export const StatsGlossaryModal: typeof import("../components/stats/GlossaryModal.vue")['default']
export const StatsMetricCard: typeof import("../components/stats/MetricCard.vue")['default']
export const StatsOutcomeCard: typeof import("../components/stats/OutcomeCard.vue")['default']
export const StatsPersonalEffectsCard: typeof import("../components/stats/PersonalEffectsCard.vue")['default']
export const StatsPlayground: typeof import("../components/stats/Playground.vue")['default']
export const StatsStatTile: typeof import("../components/stats/StatTile.vue")['default']
export const StatsCard: typeof import("../components/stats/StatsCard.vue")['default']
export const StatsPrimaryControls: typeof import("../components/stats/StatsPrimaryControls.vue")['default']
export const UiBottomTabBar: typeof import("../components/ui/BottomTabBar.vue")['default']
export const UiCookieConsent: typeof import("../components/ui/CookieConsent.vue")['default']
export const UiDesktopNavBar: typeof import("../components/ui/DesktopNavBar.vue")['default']
export const UiFooter: typeof import("../components/ui/Footer.vue")['default']
export const UiHeroStrip: typeof import("../components/ui/HeroStrip.vue")['default']
export const UiInfoTooltip: typeof import("../components/ui/InfoTooltip.vue")['default']
export const UiMobileHeader: typeof import("../components/ui/MobileHeader.vue")['default']
export const UiSectionCard: typeof import("../components/ui/SectionCard.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/.pnpm/@nuxt+image@1.11.0_@netlify+blobs@9.1.2_db0@0.3.2_ioredis@5.7.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
export const NuxtPicture: typeof import("../node_modules/.pnpm/@nuxt+image@1.11.0_@netlify+blobs@9.1.2_db0@0.3.2_ioredis@5.7.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
export const Icon: typeof import("../node_modules/.pnpm/nuxt-icon@0.6.10_magicast@0.3.5_vite@7.1.3_@types+node@24.3.0_jiti@2.5.1_terser@5.43.1_yaml@2_tirfelb5xooypnvtzoj3ayhwui/node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']
export const IconCSS: typeof import("../node_modules/.pnpm/nuxt-icon@0.6.10_magicast@0.3.5_vite@7.1.3_@types+node@24.3.0_jiti@2.5.1_terser@5.43.1_yaml@2_tirfelb5xooypnvtzoj3ayhwui/node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']
export const NuxtPage: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyChartsVegaLite: LazyComponent<typeof import("../components/charts/VegaLite.vue")['default']>
export const LazyChartsVegaLiteEmbed: LazyComponent<typeof import("../components/charts/VegaLiteEmbed.vue")['default']>
export const LazyStatsFiltersBar: LazyComponent<typeof import("../components/stats/FiltersBar.vue")['default']>
export const LazyStatsFiltersDrawer: LazyComponent<typeof import("../components/stats/FiltersDrawer.vue")['default']>
export const LazyStatsGlossaryModal: LazyComponent<typeof import("../components/stats/GlossaryModal.vue")['default']>
export const LazyStatsMetricCard: LazyComponent<typeof import("../components/stats/MetricCard.vue")['default']>
export const LazyStatsOutcomeCard: LazyComponent<typeof import("../components/stats/OutcomeCard.vue")['default']>
export const LazyStatsPersonalEffectsCard: LazyComponent<typeof import("../components/stats/PersonalEffectsCard.vue")['default']>
export const LazyStatsPlayground: LazyComponent<typeof import("../components/stats/Playground.vue")['default']>
export const LazyStatsStatTile: LazyComponent<typeof import("../components/stats/StatTile.vue")['default']>
export const LazyStatsCard: LazyComponent<typeof import("../components/stats/StatsCard.vue")['default']>
export const LazyStatsPrimaryControls: LazyComponent<typeof import("../components/stats/StatsPrimaryControls.vue")['default']>
export const LazyUiBottomTabBar: LazyComponent<typeof import("../components/ui/BottomTabBar.vue")['default']>
export const LazyUiCookieConsent: LazyComponent<typeof import("../components/ui/CookieConsent.vue")['default']>
export const LazyUiDesktopNavBar: LazyComponent<typeof import("../components/ui/DesktopNavBar.vue")['default']>
export const LazyUiFooter: LazyComponent<typeof import("../components/ui/Footer.vue")['default']>
export const LazyUiHeroStrip: LazyComponent<typeof import("../components/ui/HeroStrip.vue")['default']>
export const LazyUiInfoTooltip: LazyComponent<typeof import("../components/ui/InfoTooltip.vue")['default']>
export const LazyUiMobileHeader: LazyComponent<typeof import("../components/ui/MobileHeader.vue")['default']>
export const LazyUiSectionCard: LazyComponent<typeof import("../components/ui/SectionCard.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.11.0_@netlify+blobs@9.1.2_db0@0.3.2_ioredis@5.7.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.11.0_@netlify+blobs@9.1.2_db0@0.3.2_ioredis@5.7.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
export const LazyIcon: LazyComponent<typeof import("../node_modules/.pnpm/nuxt-icon@0.6.10_magicast@0.3.5_vite@7.1.3_@types+node@24.3.0_jiti@2.5.1_terser@5.43.1_yaml@2_tirfelb5xooypnvtzoj3ayhwui/node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']>
export const LazyIconCSS: LazyComponent<typeof import("../node_modules/.pnpm/nuxt-icon@0.6.10_magicast@0.3.5_vite@7.1.3_@types+node@24.3.0_jiti@2.5.1_terser@5.43.1_yaml@2_tirfelb5xooypnvtzoj3ayhwui/node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@9.1.2_@parcel+watcher@2.5.1_@types+node@24.3.0_@vue+compiler-sfc@3_lrtovvn3txkimok6ulmv2v5h2u/node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
