<script setup lang="ts">
const emit = defineEmits<{ click: [] }>()
</script>

<template>
  <button class="transparent square on-background-text max" @click="() => emit('click')">
    <slot />
  </button>
</template>

<style>
div[role='button'] {
  cursor: pointer;
}
</style>
