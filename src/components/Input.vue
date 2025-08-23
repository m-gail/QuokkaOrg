<script setup lang="ts">
const { label, value } = defineProps<{ label: string; value: string }>()
const emit = defineEmits<{ change: [value: string] }>()

async function onChange(event: Event) {
  emit('change', (event.target as HTMLInputElement).value)
}
</script>
<template>
  <label class="label">{{ label }}</label>
  <input class="input" type="text" :value="value" @change="onChange" />
</template>
