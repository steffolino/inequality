<template>
  <section class="max-w-3xl mx-auto p-6 space-y-6">
    <h1 class="text-2xl font-bold">Inequality Demo</h1>

    <div class="grid gap-4 grid-cols-1 md:grid-cols-3">
      <label class="form-control">
        <span class="label-text">Region</span>
        <input v-model="region" class="input input-bordered" />
      </label>

      <label class="form-control">
        <span class="label-text">Year</span>
        <input v-model.number="year" type="number" class="input input-bordered" />
      </label>

      <div class="form-control">
        <span class="label-text">Redistribution Rate</span>
        <input v-model.number="rate" type="range" min="0" max="1" step="0.01" />
        <span class="text-sm">{{ rate.toFixed(2) }}</span>
      </div>

      <label class="label cursor-pointer col-span-1 md:col-span-3">
        <span class="label-text">Include wealth tax</span>
        <input v-model="wealth" type="checkbox" class="toggle toggle-primary" />
      </label>
    </div>

    <div class="flex gap-3">
      <button class="btn btn-primary" @click="loadBaseline">Load baseline</button>
      <button class="btn btn-accent" @click="simulate">Simulate</button>
      <button class="btn" @click="save">Save snapshot</button>
    </div>

    <div v-if="baseline" class="mockup-code">
      <pre><code>baseline: {{ baseline }}</code></pre>
    </div>
    <div v-if="sim" class="mockup-code">
      <pre><code>simulate: {{ sim }}</code></pre>
    </div>
    <div v-if="snapId" class="alert alert-success">
      <span>Saved snapshot id: {{ snapId }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
const api = useApi();

const region = ref('DE');
const year = ref(2024);
const rate = ref(0.15);
const wealth = ref(true);

const baseline = ref<any>(null);
const sim = ref<any>(null);
const snapId = ref<string>('');

async function loadBaseline() {
  baseline.value = await api.get('/api/baseline', {
    query: { region: region.value, from: year.value - 10, to: year.value }
  });
}

async function simulate() {
  sim.value = await api.post('/api/simulate', {
    region: region.value,
    year: year.value,
    redistribution_rate: rate.value,
    include_wealth_tax: wealth.value
  });
}

async function save() {
  const res = await api.post<{ id: string }>('/api/snapshot', {
    region: region.value,
    year: year.value,
    redistribution_rate: rate.value,
    include_wealth_tax: wealth.value,
    notes: 'demo'
  });
  snapId.value = res.id;
}
</script>
