<script setup lang="ts">
import { type Component } from 'vue'
import { useUIStore } from './uiStore'

const uiStore = useUIStore()
const { icon } = defineProps<{
  icon?: Component
}>()
const emit = defineEmits<{ click: [] }>()
</script>

<template>
  <button
    class="front fixed right bottom left-round top-round extra circle large-elevate fill fab"
    :style="`margin-bottom: calc(${uiStore.dockHeight}px + 1rem)`"
    @click="() => emit('click')">
    <i v-if="icon != null">
      <component :is="icon"></component>
    </i>
    <span>
      <slot />
    </span>
  </button>
</template>

<style scoped>
.fab {
  margin-right: 1rem;
}
</style>
