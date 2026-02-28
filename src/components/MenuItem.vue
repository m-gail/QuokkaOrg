<script setup lang="ts">
import { type Component } from 'vue';

const { icon, active } = defineProps<{
  active: boolean
  icon?: Component
}>()
const emit = defineEmits<{ click: [] }>()
</script>
<template>
  <li @click="() => emit('click')" :class="active && 'active'">
    <i v-if="icon != null"><component :is="icon"></component></i>
    <slot />
  </li>
</template>
