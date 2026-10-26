<script setup lang="ts">
const { value = 50 } = defineProps<{
  value?: number
}>()
</script>
<template>
  <progress
    class="circle wavy indeterminate small"
    :value="value"
    max="100"
    :style="{ '--_value': value }"
  ></progress>
</template>
