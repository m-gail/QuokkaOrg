<script setup lang="ts">
const { title } = defineProps<{ title: string }>()
</script>

<template>
  <div class="card card-border card-sm bg-base-200 border-base-300 rounded-box w-full border">
    <div class="card-body">
      <div class="card-title font-bold text-primary">{{ title }}</div>
      <slot />
    </div>
  </div>
</template>
