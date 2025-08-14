<script setup lang="ts">
import { loadAgenda } from '@/app/common/agenda/loadAgenda'
import AgendaEventsList from '@/app/common/components/AgendaEventsList.vue'
import {
  formatDateWithWeekDay,
  formatIsoDate,
  getDateRange,
  getNextDay,
  getPreviousDay,
} from '@/app/common/date'
import { useSettingsStore } from '@/app/store/settings'
import Button from '@/components/Button.vue'
import CenterStack from '@/components/CenterStack.vue'
import Flex from '@/components/Flex.vue'
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import Text from '@/components/Text.vue'
import { rangeFilter } from '@/org/parser/filters'
import type { Agenda } from '@/org/types'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const settings = useSettingsStore()
const route = useRoute()
const router = useRouter()

const date = computed(() => new Date(Date.parse(route.params.date as string)))

function navigatePrevious() {
  router.push(`/calendar/day/${formatIsoDate(getPreviousDay(date.value))}`)
}

function navigateNext() {
  router.push(`/calendar/day/${formatIsoDate(getNextDay(date.value))}`)
}

const agenda = ref<Agenda | undefined>({ days: []})
const events = computed(() => agenda.value?.days[0]?.events ?? [])
watch(
  () => route.params.date,
  async () => {
    const [rangeStart, rangeEnd] = getDateRange(date.value, 1)
    if (settings.directoryPath !== '') {
      agenda.value = await loadAgenda(settings.directoryPath, rangeFilter(rangeStart, rangeEnd))
    }
  },
  { immediate: true }
)
</script>

<template>
  <CenterStack v-if="settings.directoryPath === ''">You need to choose a directory</CenterStack>
  <CenterStack v-else-if="agenda === undefined">
    <LoadingSpinner />
  </CenterStack>
  <Flex col gap="4" v-else class="p-4">
    <Flex center>
      <Button type="clear" :icon="ChevronLeftIcon" @click="navigatePrevious"></Button>
      <Text center weight="bold" class="py-2 grow" size="lg">{{
        formatDateWithWeekDay(date)
        }}</Text>
      <Button type="clear" :icon="ChevronRightIcon" @click="navigateNext"></Button>
    </Flex>
    <AgendaEventsList :events="events" v-if="events.length > 0" />
    <Text v-else center>No events scheduled for this day</Text>
  </Flex>
</template>
