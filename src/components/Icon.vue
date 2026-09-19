<script setup lang="ts">
import { type Component } from 'vue'

const { icon, size = 'tiny' } = defineProps<{
  icon?: Component
  size?: 'tiny'
  color?: 'primary'
}>()
</script>

<template>
  <i :class="[size, color && `${color}-text`]">
    <component :is="icon"></component>
  </i>
</template>
