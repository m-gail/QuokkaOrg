<script setup lang="ts">
const { title } = defineProps<{ title: string }>()
</script>
<template>
  <button class="chip primary event-badge">
    {{ title }}
  </button>
</template>

<style>
.event-badge {
  overflow: hidden;
  max-width: 100%;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
</style>
