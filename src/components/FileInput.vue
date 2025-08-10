<script setup lang="ts">
import { DirectoryPicker } from '@/files/directoryPicker'

const { label, value } = defineProps<{ label: string; value: string }>()
const emit = defineEmits<{ change: [value: string] }>()

async function pickFile() {
  const directoryFile = await DirectoryPicker.pickDirectory()
  const directoryPath = directoryFile.path
  emit('change', directoryPath)
}
</script>
<template>
  <label class="label">{{ label }}</label>
  <div class="join">
    <button @click="pickFile" class="btn join-item">Browse</button>
    <input class="input join-item" type="text" readonly :value="value" />
  </div>
</template>
