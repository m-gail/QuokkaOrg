<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import ButtonBase from '@/components/ButtonBase.vue'
import Flex from '@/components/Flex.vue'
import ListItem from '@/components/ListItem.vue'
import Text from '@/components/Text.vue'
import type { AgendaEvent, Urgency } from '@/org/types'
import { ref } from 'vue'

const { event, defaultShowIntermediateBreadcrumbs = true } = defineProps<{
  event: AgendaEvent
  defaultShowIntermediateBreadcrumbs?: boolean
}>()
const showIntermediateBreadcrumbs = ref(defaultShowIntermediateBreadcrumbs)

function getFileBasename(event: AgendaEvent) {
  const path = event.fileRelativePath.split('/')
  const filename = path[path.length - 1]
  return filename.replace(/\.org$/, '')
}

function getUrgencyText(urgency: Urgency) {
  switch (urgency) {
    case 'DEADLINE':
      return 'Deadline'
    case 'SCHEDULED':
      return 'Scheduled'
    default:
      return ''
  }
}

function getUrgencyColor(urgency: Urgency) {
  switch (urgency) {
    case 'DEADLINE':
      return 'red'
    case 'SCHEDULED':
      return 'primary'
    default:
      return undefined
  }
}
</script>

<template>
  <ListItem>
    <ButtonBase @click="showIntermediateBreadcrumbs = !showIntermediateBreadcrumbs">
      <Flex gap="5" col>
        <Breadcrumbs
          :breadcrumbs="[getFileBasename(event), ...event.breadcrumbs]"
          :show-intermediate="showIntermediateBreadcrumbs" />
        <Flex gap="4">
          <Text
            :color="getUrgencyColor(event.urgency)"
            v-if="event.urgency !== 'NONE'"
            weight="bold">
            {{ getUrgencyText(event.urgency) }}
          </Text>
          <Text>{{ event.time }}</Text>
        </Flex>
      </Flex>
    </ButtonBase>
  </ListItem>
</template>
