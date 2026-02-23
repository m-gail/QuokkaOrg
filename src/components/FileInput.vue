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
  <div class="row no-space">
    <button class="left-round large" @click="pickFile">Browse</button>
    <div class="max field border label right-round">
      <input class="full-width" type="text" readonly :value="value" placeholder=" " />
      <label>{{ label }}</label>
    </div>
  </div>
</template>

<style lang="css" scoped>
/* usage with button breaks minimal width in fieldset */
.full-width {
  width: 100%;
}
</style>
