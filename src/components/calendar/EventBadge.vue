<script setup lang="ts">
const { title } = defineProps<{ title: string }>()
</script>
<template>
  <div
    class="bg-primary text-primary-content rounded px-1 text-xs text-ellipsis overflow-hidden whitespace-nowrap text-start">
    {{ title }}
  </div>
</template>
