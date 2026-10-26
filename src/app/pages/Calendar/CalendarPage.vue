<script setup lang="ts">
import {
  formatIsoDate,
  formatMonthAndYear,
  getNextMonth,
  getPreviousMonth,
  getStartOfMonth,
} from '@/app/common/date'
import { useAgendaStore } from '@/app/store/agenda'
import { useSettingsStore } from '@/app/store/settings'
import Button from '@/components/Button.vue'
import Calendar from '@/components/calendar/Calendar.vue'
import type { CalendarEvent } from '@/components/calendar/types'
import Flex from '@/components/Flex.vue'
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import PageContent from '@/components/PageContent.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { computed, onMounted, type ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const settings = useSettingsStore()
const agendaStore = useAgendaStore()

const router = useRouter()
const route = useRoute()
const currentPage = computed(() =>
  getStartOfMonth(new Date(Date.parse(route.params.month as string))),
)

function previousPage() {
  router.push(`/calendar/month/${formatIsoDate(getPreviousMonth(currentPage.value))}`)
}

function nextPage() {
  router.push(`/calendar/month/${formatIsoDate(getNextMonth(currentPage.value))}`)
}

function chooseDay(day: string) {
  router.push(`/calendar/day/${day}`)
}

const events: ComputedRef<CalendarEvent[]> = computed(
  () =>
    agendaStore
      .getAgenda({
        dayFilter: {
          startDate: getPreviousMonth(currentPage.value),
          endDate: getNextMonth(getNextMonth(currentPage.value)),
        },
      })
      .days.flatMap((day) =>
        day.events.map((event) => ({
          day: day.date,
          title: event.breadcrumbs[event.breadcrumbs.length - 1],
          color:
            event.urgency === 'DEADLINE'
              ? 'red'
              : event.urgency === 'SCHEDULED'
                ? 'primary'
                : 'secondary',
        })),
      ) ?? [],
)

onMounted(async () => {
  agendaStore.tryTriggerUpdate(settings.directoryPath, settings.ignoredFolders)
})
</script>

<template>
  <PageHeader>
    <PageTitle>{{ formatMonthAndYear(currentPage) }}</PageTitle>
    <LoadingSpinner v-if="agendaStore.updating" :value="agendaStore.progressEstimate" />
    <Button type="clear" :icon="ChevronLeftIcon" @click="previousPage" />
    <Button type="clear" :icon="ChevronRightIcon" @click="nextPage" />
  </PageHeader>
  <PageContent>
    <Flex fill-parent>
      <Calendar :events="events" @choose-day="chooseDay" :page="currentPage" />
    </Flex>
  </PageContent>
</template>
