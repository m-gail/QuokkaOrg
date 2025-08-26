<script setup lang="ts">
import { cls } from '@/app/common/classes'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ col?: boolean; class?: string; gap?: string; center?: boolean }>(),
  {
    col: false,
    gap: '0',
    center: false,
  },
)

const classes = computed(() =>
  cls([
    'flex',
    props.col ? 'flex-col' : 'flex-row',
    `gap-${props.gap}`,
    props.center ? 'items-center justify-center' : undefined,
    props.class,
  ]),
)
</script>
<template>
  <div :class="classes">
    <slot />
  </div>
</template>
