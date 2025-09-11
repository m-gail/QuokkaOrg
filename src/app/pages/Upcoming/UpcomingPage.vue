<script setup lang="ts">
import { loadAgenda } from '@/app/common/agenda/loadAgenda'
import AgendaView from '@/app/common/components/AgendaView.vue'
import { formatDate, getDateRange, now } from '@/app/common/date'
import { useSettingsStore } from '@/app/store/settings'
import CenterStack from '@/components/CenterStack.vue'
import Flex from '@/components/Flex.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import Text from '@/components/Text.vue'
import { rangeFilter } from '@/org/filter/generic'
import type { Agenda } from '@/org/types'
import { onMounted, ref } from 'vue'

const settings = useSettingsStore()

const agenda = ref<Agenda | undefined>(undefined)
const startDate = ref<Date>(now())
const endDate = ref<Date>(now())

onMounted(async () => {
  ;[startDate.value, endDate.value] = getDateRange(now(), 21)

  if (settings.directoryPath !== '') {
    agenda.value = await loadAgenda(
      settings.directoryPath,
      settings.ignoredFolders,
      rangeFilter(startDate.value, endDate.value),
    )
  }
})
</script>

<template>
  <CenterStack v-if="settings.directoryPath === ''">You need to choose a directory</CenterStack>
  <CenterStack v-else-if="agenda === undefined">
    <LoadingSpinner />
  </CenterStack>
  <Flex v-else col gap="4" padding="4">
    <Text size="lg" center weight="bold">
      {{ formatDate(startDate) }} - {{ formatDate(endDate) }}
    </Text>
    <AgendaView :agenda="agenda" v-if="agenda.days.length > 0" :today="startDate" />
    <Text v-else center>No upcoming events</Text>
  </Flex>
</template>
