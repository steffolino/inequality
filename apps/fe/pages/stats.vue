<template>
  <section>
    <StatsPrimaryControls @open-filters="filtersOpen = true" />
    <StatsCard />
    <OutcomeCard />
    <PersonalEffectsCard />
    <StatsFiltersDrawer v-model:open="filtersOpen" />
  </section>
</template>
<script setup lang="ts">
import StatsPrimaryControls from '../components/stats/StatsPrimaryControls.vue'
import StatsCard from '../components/stats/StatsCard.vue'
import OutcomeCard from '../components/stats/OutcomeCard.vue'
import PersonalEffectsCard from '../components/stats/PersonalEffectsCard.vue'
import FiltersDrawer from '../components/stats/FiltersDrawer.vue'
const filtersOpen = ref(false)
definePageMeta({ title: 'Wealth Distribution' })
</script>