<script setup lang="ts">
import { cls } from '@/app/common/classes'
import { computed } from 'vue'

const {
  gap = '0',
  cols,
  center = false,
  ...props
} = defineProps<{ class?: string; gap?: string; cols: string; center?: boolean }>()

const classes = computed(() =>
  cls([
    'grid',
    `grid-cols-${cols}`,
    `gap-${gap}`,
    center ? 'items-center justify-items-center' : undefined,
    props.class,
  ]),
)
</script>
<template>
  <div :class="classes">
    <slot />
  </div>
</template>
