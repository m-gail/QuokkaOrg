<script setup lang="ts">
import { provide, toRef } from 'vue'
import { formSubmitted } from './inject'

const { submitted } = defineProps<{
  submitted: boolean
}>()
provide(
  formSubmitted,
  toRef(() => submitted),
)
</script>
<template>
  <slot />
</template>
