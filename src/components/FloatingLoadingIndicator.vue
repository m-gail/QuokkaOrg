<script setup lang="ts">
import LoadingSpinner from './LoadingSpinner.vue'
</script>

<template>
  <div class="wrapper">
    <LoadingSpinner />
  </div>
</template>

<style lang="css" scoped>
.wrapper {
  position: fixed;
  right: 0.5rem;
  top: calc(var(--sat) + 0.5rem);
}
</style>
