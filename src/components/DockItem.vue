<script setup lang="ts">
import type { Component } from 'vue'
import { useLink } from 'vue-router';

const { link } = defineProps<{ link: { text: string; to: string; icon: Component } }>()
const { isActive } = useLink({ to: link.to })
</script>
<template>
  <RouterLink :to="link.to" :key="link.to" :class="isActive ? 'dock-active' : ''">
    <component :is="link.icon" class="size-[1.2em]"></component>
    <span class="dock-label">{{ link.text }}</span>
  </RouterLink>
</template>
