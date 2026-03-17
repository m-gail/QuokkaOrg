<script setup lang="ts">
import { computed } from 'vue'

const { title, color } = defineProps<{ title: string; color: 'normal' | 'red' }>()
const colorClass = computed(
  () =>
    ({
      normal: 'primary',
      red: 'error',
    })[color],
)
</script>
<template>
  <button :class="['chip event-badge small no-padding', colorClass]">
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
