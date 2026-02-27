<script setup lang="ts">
import { cls } from '@/app/common/classes'
import { computed } from 'vue'

const {
  color,
  weight = 'normal',
  center = false,
  size = 'md',
  grow = false,
  ...props
} = defineProps<{
  color?: 'red' | 'primary',
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
    color === 'red' && 'error-text',
    color === 'primary' && 'primary-text',
    props.class,
  ]),
)
</script>

<template>
  <component :is="size === 'lg' ? 'h6' : 'p'" :class="classes">
    <slot />
  </component>
</template>

<style lang="css">
.grow {
  flex-grow: 1;
}
</style>
