
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
      'StatsCard': typeof import("../components/StatsCard.vue")['default']
    'ChartsVegaLite': typeof import("../components/charts/VegaLite.vue")['default']
    'StatsFiltersDrawer': typeof import("../components/stats/FiltersDrawer.vue")['default']
    'StatsOutcomeCard': typeof import("../components/stats/OutcomeCard.vue")['default']
    'StatsPersonalEffectsCard': typeof import("../components/stats/PersonalEffectsCard.vue")['default']
    'StatsPrimaryControls': typeof import("../components/stats/StatsPrimaryControls.vue")['default']
    'UiBottomTabBar': typeof import("../components/ui/BottomTabBar.vue")['default']
    'UiDesktopNavBar': typeof import("../components/ui/DesktopNavBar.vue")['default']
    'UiMobileHeader': typeof import("../components/ui/MobileHeader.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/.pnpm/@nuxt+image@1.11.0_@netlify_4fc1967604e9f538ece6b33e3379d00d/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
    'NuxtPicture': typeof import("../node_modules/.pnpm/@nuxt+image@1.11.0_@netlify_4fc1967604e9f538ece6b33e3379d00d/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
    'Icon': typeof import("../node_modules/.pnpm/nuxt-icon@0.6.10_magicast@0_64de47e2eb81a4de209d5af8c869be14/node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']
    'IconCSS': typeof import("../node_modules/.pnpm/nuxt-icon@0.6.10_magicast@0_64de47e2eb81a4de209d5af8c869be14/node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']
    'NuxtPage': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/server-placeholder")['default']
      'LazyStatsCard': LazyComponent<typeof import("../components/StatsCard.vue")['default']>
    'LazyChartsVegaLite': LazyComponent<typeof import("../components/charts/VegaLite.vue")['default']>
    'LazyStatsFiltersDrawer': LazyComponent<typeof import("../components/stats/FiltersDrawer.vue")['default']>
    'LazyStatsOutcomeCard': LazyComponent<typeof import("../components/stats/OutcomeCard.vue")['default']>
    'LazyStatsPersonalEffectsCard': LazyComponent<typeof import("../components/stats/PersonalEffectsCard.vue")['default']>
    'LazyStatsPrimaryControls': LazyComponent<typeof import("../components/stats/StatsPrimaryControls.vue")['default']>
    'LazyUiBottomTabBar': LazyComponent<typeof import("../components/ui/BottomTabBar.vue")['default']>
    'LazyUiDesktopNavBar': LazyComponent<typeof import("../components/ui/DesktopNavBar.vue")['default']>
    'LazyUiMobileHeader': LazyComponent<typeof import("../components/ui/MobileHeader.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.11.0_@netlify_4fc1967604e9f538ece6b33e3379d00d/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.11.0_@netlify_4fc1967604e9f538ece6b33e3379d00d/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
    'LazyIcon': LazyComponent<typeof import("../node_modules/.pnpm/nuxt-icon@0.6.10_magicast@0_64de47e2eb81a4de209d5af8c869be14/node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']>
    'LazyIconCSS': LazyComponent<typeof import("../node_modules/.pnpm/nuxt-icon@0.6.10_magicast@0_64de47e2eb81a4de209d5af8c869be14/node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const StatsCard: typeof import("../components/StatsCard.vue")['default']
export const ChartsVegaLite: typeof import("../components/charts/VegaLite.vue")['default']
export const StatsFiltersDrawer: typeof import("../components/stats/FiltersDrawer.vue")['default']
export const StatsOutcomeCard: typeof import("../components/stats/OutcomeCard.vue")['default']
export const StatsPersonalEffectsCard: typeof import("../components/stats/PersonalEffectsCard.vue")['default']
export const StatsPrimaryControls: typeof import("../components/stats/StatsPrimaryControls.vue")['default']
export const UiBottomTabBar: typeof import("../components/ui/BottomTabBar.vue")['default']
export const UiDesktopNavBar: typeof import("../components/ui/DesktopNavBar.vue")['default']
export const UiMobileHeader: typeof import("../components/ui/MobileHeader.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/.pnpm/@nuxt+image@1.11.0_@netlify_4fc1967604e9f538ece6b33e3379d00d/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
export const NuxtPicture: typeof import("../node_modules/.pnpm/@nuxt+image@1.11.0_@netlify_4fc1967604e9f538ece6b33e3379d00d/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
export const Icon: typeof import("../node_modules/.pnpm/nuxt-icon@0.6.10_magicast@0_64de47e2eb81a4de209d5af8c869be14/node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']
export const IconCSS: typeof import("../node_modules/.pnpm/nuxt-icon@0.6.10_magicast@0_64de47e2eb81a4de209d5af8c869be14/node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']
export const NuxtPage: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyStatsCard: LazyComponent<typeof import("../components/StatsCard.vue")['default']>
export const LazyChartsVegaLite: LazyComponent<typeof import("../components/charts/VegaLite.vue")['default']>
export const LazyStatsFiltersDrawer: LazyComponent<typeof import("../components/stats/FiltersDrawer.vue")['default']>
export const LazyStatsOutcomeCard: LazyComponent<typeof import("../components/stats/OutcomeCard.vue")['default']>
export const LazyStatsPersonalEffectsCard: LazyComponent<typeof import("../components/stats/PersonalEffectsCard.vue")['default']>
export const LazyStatsPrimaryControls: LazyComponent<typeof import("../components/stats/StatsPrimaryControls.vue")['default']>
export const LazyUiBottomTabBar: LazyComponent<typeof import("../components/ui/BottomTabBar.vue")['default']>
export const LazyUiDesktopNavBar: LazyComponent<typeof import("../components/ui/DesktopNavBar.vue")['default']>
export const LazyUiMobileHeader: LazyComponent<typeof import("../components/ui/MobileHeader.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.11.0_@netlify_4fc1967604e9f538ece6b33e3379d00d/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.11.0_@netlify_4fc1967604e9f538ece6b33e3379d00d/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
export const LazyIcon: LazyComponent<typeof import("../node_modules/.pnpm/nuxt-icon@0.6.10_magicast@0_64de47e2eb81a4de209d5af8c869be14/node_modules/nuxt-icon/dist/runtime/Icon.vue")['default']>
export const LazyIconCSS: LazyComponent<typeof import("../node_modules/.pnpm/nuxt-icon@0.6.10_magicast@0_64de47e2eb81a4de209d5af8c869be14/node_modules/nuxt-icon/dist/runtime/IconCSS.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.18.1_@netlify+blobs@_3061ad7200f12ee0c00e8e25155178c8/node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
