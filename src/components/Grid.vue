<script setup lang="ts">
import { cls } from '@/app/common/classes'
import { computed } from 'vue'

const {
  gap = '0',
  cols,
  center = false,
  ...props
} = defineProps<{ class?: string; gap?: string; cols: string; center?: boolean }>()

const classes = computed(() => cls(['grid', center ? 'center' : undefined, props.class]))

const style = computed(() => ({
  gap: `${0.1 * parseInt(gap)}rem`,
  'grid-template-columns': `repeat(${cols}, minmax(0, 1fr))`,
}))
</script>

<template>
  <div :class="classes" :style="style">
    <slot />
  </div>
</template>

<style lang="css">
.grid {
  display: grid;
  grid-auto-rows: minmax(0, 1fr);
  grid-template-rows: auto;
  height: 100%;
}
.center {
  align-items: center;
  justify-content: center;
}
</style>
