<script setup lang="ts">
import { loadAgenda } from '@/app/common/agenda/loadAgenda'
import AgendaView from '@/app/common/components/AgendaView.vue'
import { formatDate, getDateRange } from '@/app/common/date'
import { useSettingsStore } from '@/app/store/settings'
import CenterStack from '@/components/CenterStack.vue'
import Flex from '@/components/Flex.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import type { Agenda } from '@/org/parser/types'
import { onMounted, ref } from 'vue'

const settings = useSettingsStore()

const agenda = ref<Agenda | undefined>(undefined)
const startDate = ref<Date>(new Date())
const endDate = ref<Date>(new Date())

onMounted(async () => {
  [startDate.value, endDate.value] = getDateRange(new Date(), 21)

  if (settings.directoryPath !== '') {
    agenda.value = await loadAgenda(settings.directoryPath, (day) => {
      const date = new Date(Date.parse(day.date))
      return date >= startDate.value && date <= endDate.value
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
    <div class="text-center py-2 text-lg font-bold">{{ formatDate(startDate) }} - {{ formatDate(endDate) }}</div>
    <AgendaView :agenda="agenda" />
  </Flex>
</template>
