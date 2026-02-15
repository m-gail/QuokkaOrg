<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useRoute } from 'vue-router'

const { link } = defineProps<{ link: { text: string; to: string; icon: Component } }>()
const route = useRoute()
const isActive = computed(() => route.path.startsWith(link.to))
</script>
<template>
  <RouterLink :to="link.to" :key="link.to" :class="isActive ? 'active' : ''">
    <i class="small">
      <component :is="link.icon"></component>
    </i>
    <span>{{ link.text }}</span>
  </RouterLink>
</template>
