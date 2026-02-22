<script setup lang="ts">
import AgendaEventsList from '@/app/common/components/AgendaEventsList.vue'
import {
  formatDateWithWeekDay,
  formatIsoDate,
  getDateRange,
  getNextDay,
  getPreviousDay,
} from '@/app/common/date'
import { useAgendaStore } from '@/app/store/agenda'
import { useSettingsStore } from '@/app/store/settings'
import Button from '@/components/Button.vue'
import CenterStack from '@/components/CenterStack.vue'
import Flex from '@/components/Flex.vue'
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import PageContent from '@/components/PageContent.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import Text from '@/components/Text.vue'
import { rangeFilter } from '@/org/filter/generic'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const settings = useSettingsStore()
const agendaStore = useAgendaStore()
const route = useRoute()
const router = useRouter()

const date = computed(() => new Date(Date.parse(route.params.date as string)))

function navigatePrevious() {
  router.push(`/calendar/day/${formatIsoDate(getPreviousDay(date.value))}`)
}

function navigateNext() {
  router.push(`/calendar/day/${formatIsoDate(getNextDay(date.value))}`)
}

const agenda = computed(() => {
  const [rangeStart, rangeEnd] = getDateRange(date.value, 1)
  return agendaStore.getAgenda(rangeFilter(rangeStart, rangeEnd))
})
const events = computed(() => agenda.value?.days[0]?.events ?? [])
watch(
  () => route.params.date,
  async () => {
    agendaStore.tryTriggerUpdate(settings.directoryPath, settings.ignoredFolders)
  },
  { immediate: true },
)
const hasEntries = computed(() => events.value.length > 0)
</script>

<template>
  <PageHeader>
    <PageTitle>{{ formatDateWithWeekDay(date) }}</PageTitle>
    <LoadingSpinner v-if="agendaStore.updating" />
    <Button type="clear" :icon="ChevronLeftIcon" @click="navigatePrevious"></Button>
    <Button type="clear" :icon="ChevronRightIcon" @click="navigateNext"></Button>
  </PageHeader>
  <PageContent>
    <CenterStack v-if="settings.directoryPath === ''">You need to choose a directory</CenterStack>
    <CenterStack v-else-if="agenda === undefined">
      <LoadingSpinner />
    </CenterStack>
    <Flex v-else col gap="4" padding="4" :center="!hasEntries" :fill-parent="!hasEntries">
      <AgendaEventsList :events="events" v-if="hasEntries" />
      <Text v-else>No events scheduled for this day</Text>
    </Flex>
  </PageContent>
</template>
