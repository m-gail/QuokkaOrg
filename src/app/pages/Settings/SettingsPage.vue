<script setup lang="ts">
import { defaultCacheProvider } from '@/app/common/agenda/cache/cacheProvider'
import { useSettingsStore } from '@/app/store/settings'
import Button from '@/components/Button.vue'
import FileInput from '@/components/FileInput.vue'
import Flex from '@/components/Flex.vue'
import FormGroup from '@/components/FormGroup.vue'

const settings = useSettingsStore()
const cacheProvider = defaultCacheProvider
</script>

<template>
  <Flex class="p-4" col gap="4">
    <FormGroup title="File Settings">
      <FileInput label="Directory Path" :value="settings.directoryPath" @change="value => settings.setDirectoryPath(value)" />
    </FormGroup>
    <FormGroup title="Cache">
      <Button type="red" @click="() => cacheProvider.clear()">Reset cache</Button>
    </FormGroup>
  </Flex>
</template>
