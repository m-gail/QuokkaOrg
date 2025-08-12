<script setup lang="ts">
import { cls } from '@/app/common/classes'
import { computed } from 'vue'

const props = withDefaults(defineProps<{ col?: boolean; class?: string; gap?: string }>(), {
  col: false,
  gap: '0',
})

const classes = computed(() =>
  cls(['flex', props.col ? 'flex-col' : 'flex-row', `gap-${props.gap}`, props.class]),
)
</script>
<template>
  <div :class="classes">
    <slot />
  </div>
</template>
