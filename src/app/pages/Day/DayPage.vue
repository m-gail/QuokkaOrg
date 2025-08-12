<script setup lang="ts">
import { loadAgenda } from '@/app/common/agenda/loadAgenda'
import AgendaEventsList from '@/app/common/components/AgendaEventsList.vue'
import AgendaView from '@/app/common/components/AgendaView.vue'
import { formatDateWithWeekDay, getDateRange } from '@/app/common/date'
import { useSettingsStore } from '@/app/store/settings'
import CenterStack from '@/components/CenterStack.vue'
import Flex from '@/components/Flex.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import Text from '@/components/Text.vue'
import type { Agenda } from '@/org/parser/types'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const settings = useSettingsStore()
const route = useRoute()
const date = new Date(Date.parse(route.params.date as string))

const agenda = ref<Agenda | undefined>(undefined)

onMounted(async () => {
  const [rangeStart, rangeEnd] = getDateRange(date, 1)

  if (settings.directoryPath !== '') {
    agenda.value = await loadAgenda(settings.directoryPath, (day) => {
      const date = new Date(Date.parse(day.date))
      return date >= rangeStart && date <= rangeEnd
    })
  }
})
</script>

<template>
  <CenterStack v-if="settings.directoryPath === ''">You need to choose a directory</CenterStack>
  <CenterStack v-else-if="agenda === undefined">
    <LoadingSpinner />
  </CenterStack>
  <Flex col gap="4" v-else class="p-4">
    <Text center weight="bold" class="py-2" size="lg">{{ formatDateWithWeekDay(date) }}</Text>
    <AgendaEventsList :events="agenda.days[0].events" />
  </Flex>
</template>
