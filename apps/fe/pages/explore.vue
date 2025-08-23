<template>
  <div class="min-h-dvh bg-base-100 text-base-content">
    <!-- Hero -->
    <section
      class="relative overflow-hidden bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 py-4"
    >
      <div class="max-w-6xl mx-auto px-4 text-center space-y-6">
        <UiHeroStrip
          title="Explore Inequality"
          subtitle="A curated collection of scientific articles, databases, public APIs, and tools to understand inequality."
        />
      </div>
    </section>

    <!-- Content -->
    <main id="main" class="mx-auto max-w-6xl px-4 py-4 space-y-4">
      <!-- Search + Filters -->
      <section class="space-y-4">
        <input
          v-model="query"
          type="text"
          placeholder="🔍 Search resources..."
          class="input input-bordered w-full max-w-xl shadow-md mx-auto"
        />

        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in allTags"
            :key="tag"
            @click="appendTag(tag)"
            class="badge cursor-pointer transition-all hover:scale-105"
          >
            + {{ tag }}
          </button>
        </div>
      </section>

      <!-- Grouped Results -->
      <section class="space-y-10">
        <div
          v-for="group in groupedResults"
          :key="group.type"
          class="space-y-4 animate-fade-in"
        >
          <h2 class="text-2xl font-bold capitalize border-b border-base-300 pb-1">
            {{ group.type }}
          </h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <article
              v-for="res in group.items"
              :key="res.title"
              class="p-5 rounded-xl ring-1 ring-base-300 bg-base-100 shadow-sm transition-transform duration-200 hover:shadow-lg hover:-translate-y-1"
            >
              <h3 class="font-bold text-lg mb-1">
                <a :href="res.url" target="_blank" rel="noopener" class="link link-hover">
                  {{ res.title }}
                </a>
              </h3>
              <p class="text-sm opacity-80 mb-2">{{ res.description }}</p>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="t in res.tags"
                  :key="t"
                  class="badge badge-sm badge-outline"
                >
                  {{ t }}
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import Fuse from 'fuse.js'
import resources from '../public/data/resources.json'
import HeroStrip from '../components/ui/HeroStrip.vue'

const query = ref('')
const fuse = new Fuse(resources, {
  keys: ['title', 'description', 'tags'],
  threshold: 0.3,
})

const filtered = computed(() => {
  return query.value
    ? fuse.search(query.value).map(r => r.item)
    : resources
})

const allTags = [...new Set(resources.flatMap(r => r.tags))]

function appendTag(tag: string) {
  if (!query.value.toLowerCase().includes(tag.toLowerCase())) {
    query.value = query.value ? `${query.value} ${tag}` : tag
  }
}

const groupedResults = computed(() => {
  const groups: Record<string, any[]> = {}
  for (const res of filtered.value) {
    if (!groups[res.type]) groups[res.type] = []
    groups[res.type].push(res)
  }
  return Object.entries(groups).map(([type, items]) => ({ type, items }))
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.7s ease-out forwards;
}
.animate-fade-in-delay {
  animation: fade-in 0.7s ease-out forwards;
  animation-delay: 0.2s;
}
</style>
