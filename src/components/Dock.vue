<script setup lang="ts">
import type { Component } from 'vue';
import DockItem from './DockItem.vue';

const { links } = defineProps<{ links: { text: string; to: string, icon: Component }[] }>()

</script>

<template>
  <nav class="dock">
    <DockItem v-for="link in links" :link="link" :key="link.to" />
  </nav>
</template>
