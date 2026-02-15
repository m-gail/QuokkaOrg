<script setup lang="ts">
const { title } = defineProps<{ title: string }>()
</script>

<template>
  <fieldset>
    <legend>{{ title }}</legend>
    <slot />
  </fieldset>
</template>
