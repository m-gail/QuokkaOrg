<script setup lang="ts">
import { useAgendaStore } from '@/app/store/agenda'
import { useSettingsStore } from '@/app/store/settings'
import Button from '@/components/Button.vue'
import Flex from '@/components/Flex.vue'
import FileInput from '@/components/forms/FileInput.vue'
import FormGroup from '@/components/forms/FormGroup.vue'
import Input from '@/components/forms/Input.vue'
import PageContent from '@/components/PageContent.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { ref, watch } from 'vue'

const settings = useSettingsStore()
const agendaStore = useAgendaStore()
const ignoredFolders = ref(settings.ignoredFolders.join(','))

function clearCache() {
  agendaStore.clearCache()
}

watch(ignoredFolders, () => {
  settings.setIgnoredFolders(ignoredFolders.value.split(','))
})
</script>

<template>
  <PageHeader>
    <PageTitle>Settings</PageTitle>
  </PageHeader>
  <PageContent>
    <Flex padding="4" col gap="10">
      <FormGroup title="File Settings">
        <FileInput
          label="Directory Path"
          :value="settings.directoryPath"
          @change="(value) => settings.setDirectoryPath(value)" />
        <Input label="Ignored Folders" v-model="ignoredFolders" />
      </FormGroup>
      <FormGroup title="Caching">
        <Button grow type="red" @click="() => clearCache()">Reset cache</Button>
      </FormGroup>
    </Flex>
  </PageContent>
</template>
