<script setup lang="ts">
const { title } = defineProps<{ title: string }>()
</script>

<template>
  <div>
    <p class="bold">{{ title }}</p>
    <slot />
  </div>
</template>
