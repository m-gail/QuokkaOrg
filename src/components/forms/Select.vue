<script setup lang="ts">
const { label, options } = defineProps<{
  label: string
  options: { value: string; label: string }[]
}>()
const model = defineModel<string>()
</script>
<template>
  <div class="field border label round">
    <select v-model="model">
      <option v-for="option in options" :value="option.value" :key="option.value">
        {{ option.label }}
      </option>
    </select>
    <label>{{ label }}</label>
  </div>
</template>
