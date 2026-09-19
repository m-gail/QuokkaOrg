<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import ButtonBase from '@/components/ButtonBase.vue'
import Chip from '@/components/Chip.vue'
import Flex from '@/components/Flex.vue'
import RepeatIcon from '@/components/icons/RepeatIcon.vue'
import ListItem from '@/components/ListItem.vue'
import Text from '@/components/Text.vue'
import type { AgendaEvent, Urgency } from '@/org/types'
import { ref } from 'vue'
import { dateFromEvent, formatDate } from '../date'
import MoreHorizIcon from '@/components/icons/MoreHorizIcon.vue'
import Icon from '@/components/Icon.vue'

const { event, defaultShowIntermediateBreadcrumbs = true } = defineProps<{
  event: AgendaEvent
  defaultShowIntermediateBreadcrumbs?: boolean
}>()
const showDetails = ref(defaultShowIntermediateBreadcrumbs)

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
    <ButtonBase @click="showDetails = !showDetails">
      <Flex gap="5" col>
        <Breadcrumbs
          :breadcrumbs="[getFileBasename(event), ...event.breadcrumbs]"
          :show-intermediate="showDetails" />
        <Flex gap="4">
          <Text
            :color="getUrgencyColor(event.urgency)"
            v-if="event.urgency !== 'NONE'"
            weight="bold">
            {{ getUrgencyText(event.urgency) }}
          </Text>
          <Text>{{ event.time }}</Text>
        </Flex>
        <Flex gap="4" v-if="event.repeat != null && showDetails">
          <Icon :icon="RepeatIcon" size="tiny" color="primary" />
          <Text>{{ formatDate(dateFromEvent(event.repeat.initialDate)) }}</Text>
          <Icon :icon="MoreHorizIcon" size="tiny" />
          <Text>{{ event.repeat.step }}{{ event.repeat.unit }}</Text>
        </Flex>
      </Flex>
    </ButtonBase>
  </ListItem>
</template>
