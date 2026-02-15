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
    'no-margin',
    weight === 'bold' ? 'bold' : undefined,
    center ? 'center-align' : undefined,
    grow && 'grow',
    props.class,
  ]),
)
</script>

<template>
  <component :is="size === 'lg' ? 'h5' : 'p'" :class="classes">
    <slot />
  </component>
</template>

<style lang="css">
.grow {
  flex-grow: 1;
}
</style>
