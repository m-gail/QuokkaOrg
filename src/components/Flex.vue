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
    props.col && 'col',
    props.center && 'center',
    props.fillParent && 'fill-parent',
    props.class,
  ]),
)
const style = computed(() => ({
  gap: `${0.1 * parseInt(props.gap)}rem`,
  padding: `${0.1 * parseInt(props.padding)}rem`,
}))
</script>
<template>
  <div :class="classes" :style="style">
    <slot />
  </div>
</template>

<style>
.flex {
  display: flex;
}

.center {
  align-items: center;
  justify-content: center;
}

.col {
  flex-direction: column;
}

.fill-parent {
  width: 100%;
  height: 100%;
}
</style>
