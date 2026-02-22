<script setup lang="ts">
import {
  formatMonthAndYear,
  getNextMonth,
  getPreviousMonth,
  getStartOfMonth,
  now,
} from '@/app/common/date'
import { useAgendaStore } from '@/app/store/agenda'
import { useSettingsStore } from '@/app/store/settings'
import Button from '@/components/Button.vue'
import Calendar from '@/components/calendar/Calendar.vue'
import Flex from '@/components/Flex.vue'
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import PageContent from '@/components/PageContent.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const settings = useSettingsStore()
const agendaStore = useAgendaStore()

const router = useRouter()
const currentPage = ref(getStartOfMonth(now()))

function previousPage() {
  currentPage.value = getPreviousMonth(currentPage.value)
}

function nextPage() {
  currentPage.value = getNextMonth(currentPage.value)
}

function chooseDay(day: string) {
  router.push(`/calendar/day/${day}`)
}

const events = computed(
  () =>
    agendaStore.getAgenda().days.flatMap((day) =>
      day.events.map((event) => ({
        day: day.date,
        title: event.breadcrumbs[event.breadcrumbs.length - 1],
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
    <LoadingSpinner v-if="agendaStore.updating" />
    <Button type="clear" :icon="ChevronLeftIcon" @click="previousPage" />
    <Button type="clear" :icon="ChevronRightIcon" @click="nextPage" />
  </PageHeader>
  <PageContent>
    <Flex fill-parent>
      <Calendar :events="events" @choose-day="chooseDay" :page="currentPage" />
    </Flex>
  </PageContent>
</template>
