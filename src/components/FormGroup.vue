<script setup lang="ts">
const { title } = defineProps<{ title: string }>()
</script>

<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
    <legend>{{ title }}</legend>

    <slot />
  </fieldset>
</template>
