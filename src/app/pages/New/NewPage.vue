<script setup lang="ts">
import Button from '@/components/Button.vue'
import Flex from '@/components/Flex.vue'
import Form from '@/components/forms/Form.vue'
import FormGroup from '@/components/forms/FormGroup.vue'
import Input from '@/components/forms/Input.vue'
import Select from '@/components/forms/Select.vue'
import ArrowBackIcon from '@/components/icons/ArrowBackIcon.vue'
import PageContent from '@/components/PageContent.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import Text from '@/components/Text.vue'
import { serializeEvent } from '@/org/serializer/event'
import type { Urgency } from '@/org/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { urgencyOptions } from './options'
import { notEmpty, notEmptyIfEndTimePresent } from './validation'
import AddIcon from '@/components/icons/AddIcon.vue'
import { useAgendaStore } from '@/app/store/agenda'
import { useSettingsStore } from '@/app/store/settings'
import { DirectoryPicker } from '@/components/directoryPicker'

const settingsStore = useSettingsStore()
const router = useRouter()

const title = ref('')
const titleError = notEmpty(title)
const file = ref('')
const fileError = notEmpty(file)
const date = ref('')
const dateError = notEmpty(date)
const startTime = ref('')
const endTime = ref('')
const startTimeError = notEmptyIfEndTimePresent(startTime, endTime)
const urgency = ref('NONE')
const submitted = ref(false)

function create() {
  submitted.value = true
  if (
    titleError.value !== undefined ||
    fileError.value !== undefined ||
    dateError.value !== undefined
  ) {
    return
  }
  const event = serializeEvent({
    title: title.value,
    urgency: urgency.value as Urgency,
    date: date.value,
    startTime: startTime.value,
    endTime: endTime.value,
  })
  DirectoryPicker.appendToFile({
    relativeSubPath: file.value,
    path: settingsStore.directoryPath,
    content: event
  })
  router.push('/upcoming')
}
</script>

<template>
  <PageHeader>
    <Button type="clear" :icon="ArrowBackIcon" @click="router.back()" />
    <PageTitle>New event</PageTitle>
  </PageHeader>
  <PageContent>
    <Flex padding="4" col fill-parent>
      <Form :submitted="submitted">
        <Input label="Title" v-model="title" :error-text="titleError" />
        <Input label="File" v-model="file" :error-text="fileError" />
        <FormGroup title="Timestamp">
          <Input label="Date" v-model="date" type="date" :error-text="dateError" />
          <Input label="Start time" v-model="startTime" type="time" :error-text="startTimeError" />
          <Input label="End time" v-model="endTime" type="time" />
          <Select label="Urgency" v-model="urgency" :options="urgencyOptions" />
        </FormGroup>
        <Text grow></Text>
        <Button :icon="AddIcon" @click="create">Create</Button>
      </Form>
    </Flex>
  </PageContent>
</template>
