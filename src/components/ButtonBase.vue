<script setup lang="ts">
const emit = defineEmits<{ click: [] }>()
</script>

<template>
  <button class="btn transparent square on-background-text max" @click="() => emit('click')">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: block;
  height: 100%;
}
</style>
