<script setup lang="ts">
import { useSettingsStore } from '@/app/store/settings'
import FileInput from '@/components/FileInput.vue'
import FormGroup from '@/components/FormGroup.vue'

const settings = useSettingsStore()
</script>

<template>
  <div class="p-4">
    <FormGroup title="File Settings">
      <FileInput label="Directory Path" :value="settings.directoryPath" @change="value => settings.setDirectoryPath(value)" />
    </FormGroup>
  </div>
</template>
