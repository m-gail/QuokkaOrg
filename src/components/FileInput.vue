<script setup lang="ts">
const { label } = defineProps<{ label: string }>()
</script>
<template>
  <label class="label">{{ label }}</label>
  <input type="file" class="file-input" />
</template>
