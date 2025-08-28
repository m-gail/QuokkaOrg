<script setup lang="ts">
import { cls } from '@/app/common/classes'
import { computed } from 'vue'

const {
  weight = 'normal',
  center = false,
  size = 'md',
  grow = false,
  ...props
} = defineProps<{
  weight?: 'normal' | 'bold'
  center?: boolean
  size?: 'lg' | 'md'
  class?: string
  grow?: boolean
}>()

const classes = computed(() =>
  cls([
    weight === 'bold' ? 'font-bold' : undefined,
    center ? 'text-center' : undefined,
    size === 'lg' ? 'text-lg' : undefined,
    grow && 'grow',
    props.class,
  ]),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
