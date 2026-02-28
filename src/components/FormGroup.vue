<script setup lang="ts">
const { title } = defineProps<{ title: string }>()
</script>

<template>
  <fieldset class="round">
    <legend>{{ title }}</legend>
    <slot />
  </fieldset>
</template>
