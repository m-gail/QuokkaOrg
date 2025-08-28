<script setup lang="ts">
import { cls } from '@/app/common/classes'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    col?: boolean
    class?: string
    gap?: string
    center?: boolean
    padding?: string
    fillParent?: boolean
  }>(),
  {
    col: false,
    gap: '0',
    padding: '0',
    center: false,
    fillParent: false,
  },
)

const classes = computed(() =>
  cls([
    'flex',
    props.col ? 'flex-col' : 'flex-row',
    `gap-${props.gap}`,
    `p-${props.padding}`,
    props.center && 'items-center justify-center',
    props.fillParent && 'w-full h-full',
    props.class,
  ]),
)
</script>
<template>
  <div :class="classes">
    <slot />
  </div>
</template>
