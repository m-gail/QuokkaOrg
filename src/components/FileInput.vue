<script setup lang="ts">
import { DirectoryPicker } from './directoryPicker'

const { label, value } = defineProps<{ label: string; value: string }>()
const emit = defineEmits<{ change: [value: string] }>()

async function pickFile() {
  const directoryFile = await DirectoryPicker.pickDirectory()
  const directoryPath = directoryFile.path
  emit('change', directoryPath)
}
</script>
<template>
  <nav class="no-space">
    <button class="left-round large" @click="pickFile">Browse</button>
    <div class="max field border label right-round">
      <input type="text" readonly :value="value" placeholder=" " />
      <label>{{ label }}</label>
    </div>
  </nav>
</template>
