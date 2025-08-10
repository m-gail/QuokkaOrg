<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ col?: boolean; class?: string; gap?: string }>(), {
  col: false,
  gap: '0',
})

const cls = computed(() =>
  ['flex', props.col ? 'flex-col' : 'flex-row', `gap-${props.gap}`, props.class]
    .filter((it) => it != null)
    .join(' '),
)
</script>
<template>
  <div :class="cls">
    <slot />
  </div>
</template>
