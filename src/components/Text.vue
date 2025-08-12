<script setup lang="ts">
import { cls } from '@/app/common/classes'
import { computed } from 'vue'

const { weight, center, size, ...props } = withDefaults(
  defineProps<{ weight?: 'normal' | 'bold'; center?: boolean; size?: 'lg' | 'md', class?: string }>(),
  {
    weight: 'normal',
    center: false,
    size: 'md'
  },
)

const classes = computed(() =>
  cls([
    weight === 'bold' ? 'font-bold' : undefined,
    center ? 'text-center' : undefined,
    size === 'lg' ? 'text-lg' : undefined,
    props.class
  ]),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
