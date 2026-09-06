<script setup lang="ts">
import { cls } from '@/app/common/classes'
import { computed, type Component } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'

const {
  type = 'normal',
  icon,
  grow,
  loading = false,
} = defineProps<{
  type?: 'normal' | 'clear' | 'red'
  grow?: boolean
  icon?: Component
  loading?: boolean
}>()
const emit = defineEmits<{ click: [] }>()

const classes = computed(() =>
  cls([type === 'red' && 'error', type === 'clear' && 'transparent circle', grow && 'responsive']),
)
</script>

<template>
  <button :class="classes" @click="() => emit('click')" :disabled="loading">
    <LoadingSpinner v-if="loading" />
    <i v-else-if="icon != null">
      <component :is="icon"></component>
    </i>
    <span>
      <slot />
    </span>
  </button>
</template>
