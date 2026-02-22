<script setup lang="ts">
import { cls } from '@/app/common/classes'
import { computed, type Component } from 'vue'

const { type = 'normal', icon } = defineProps<{
  type?: 'normal' | 'clear' | 'red'
  icon?: Component
}>()
const emit = defineEmits<{ click: [] }>()

const classes = computed(() =>
  cls([type === 'red' && 'error', type === 'clear' && 'transparent circle']),
)
</script>

<template>
  <button :class="classes" @click="() => emit('click')">
    <i v-if="icon != null">
      <component :is="icon"></component>
    </i>
    <span>
      <slot />
    </span>
  </button>
</template>

<style>
div[role='button'] {
  cursor: pointer;
}
</style>
