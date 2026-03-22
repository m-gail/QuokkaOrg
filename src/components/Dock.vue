<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, useTemplateRef, watch, type Component } from 'vue'
import DockItem from './DockItem.vue'
import { useUIStore } from './uiStore'

const uiStore = useUIStore()
const navRef = useTemplateRef('nav')
const { links } = defineProps<{ links: { text: string; to: string; icon: Component }[] }>()

let observer: ResizeObserver

onMounted(() => {
  observer = new ResizeObserver((entries) => {
    uiStore.setDockHeight(entries[0].target.clientHeight)
  })
  if (navRef.value) {
    observer.observe(navRef.value)
  }
})

onBeforeUnmount(() => {
  if (observer && navRef.value) {
    observer.unobserve(navRef.value)
  }
})
</script>

<template>
  <nav class="bottom" ref="nav">
    <DockItem v-for="link in links" :link="link" :key="link.to" />
  </nav>
</template>
