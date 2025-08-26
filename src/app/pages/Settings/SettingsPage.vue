<script setup lang="ts">
import {
  defaultAgendaCacheProvider,
  defaultListDirCacheProvider,
} from '@/app/common/agenda/cache/cacheProvider'
import { useSettingsStore } from '@/app/store/settings'
import Button from '@/components/Button.vue'
import FileInput from '@/components/FileInput.vue'
import Flex from '@/components/Flex.vue'
import FormGroup from '@/components/FormGroup.vue'
import Input from '@/components/Input.vue'
import { ref } from 'vue'

const settings = useSettingsStore()
const ignoredFolders = ref(settings.ignoredFolders.join(','))

function clearCache() {
  defaultListDirCacheProvider.clear()
  defaultAgendaCacheProvider.clear()
}

function onIgnoredFoldersChange(value: string) {
  ignoredFolders.value = value
  settings.setIgnoredFolders(ignoredFolders.value.split(','))
}
</script>

<template>
  <Flex class="p-4" col gap="4">
    <FormGroup title="File Settings">
      <FileInput
        label="Directory Path"
        :value="settings.directoryPath"
        @change="(value) => settings.setDirectoryPath(value)"
      />
      <Input label="Ignored Folders" :value="ignoredFolders" @change="onIgnoredFoldersChange" />
    </FormGroup>
    <FormGroup title="Cache">
      <Button type="red" @click="() => clearCache()">Reset cache</Button>
    </FormGroup>
  </Flex>
</template>
