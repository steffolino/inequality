<template>
  <dialog ref="dlg" class="modal">
    <div class="modal-box max-w-2xl">
      <h3 class="text-lg font-bold">Glossary</h3>
      <p class="mt-1 text-sm opacity-70">Short explanations of the main terms on this page.</p>

      <div class="mt-4 space-y-3">
        <details v-for="item in items" :key="item.key" class="collapse collapse-arrow bg-base-200/60">
          <summary class="collapse-title text-md font-medium">{{ item.title }}</summary>
          <div class="collapse-content text-sm leading-relaxed">
            <p>{{ item.text }}</p>
            <p v-if="item.example" class="mt-2 rounded bg-base-100 p-2 text-xs">Example: {{ item.example }}</p>
            <p class="mt-2 text-xs opacity-70">Source: <a class="link" :href="item.source" target="_blank" rel="noreferrer noopener">{{ item.sourceLabel }}</a></p>
          </div>
        </details>
      </div>

      <div class="modal-action">
        <form method="dialog"><button class="btn">Close</button></form>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop"><button>close</button></form>
  </dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{ items: Array<{ key:string; title:string; text:string; example?:string; source:string; sourceLabel:string }> }>()
const dlg = ref<HTMLDialogElement|null>(null)

function open(){ dlg.value?.showModal() }
function close(){ dlg.value?.close() }

defineExpose({ open, close })

function onEsc(e:KeyboardEvent){ if (e.key==='Escape') close() }
onMounted(()=>document.addEventListener('keydown', onEsc))
onBeforeUnmount(()=>document.removeEventListener('keydown', onEsc))
</script>
