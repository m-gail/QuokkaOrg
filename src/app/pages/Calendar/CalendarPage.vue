<script setup lang="ts">
import { useAgendaStore } from '@/app/store/agenda'
import { useSettingsStore } from '@/app/store/settings'
import Calendar from '@/components/calendar/Calendar.vue'
import Flex from '@/components/Flex.vue'
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const settings = useSettingsStore()
const agendaStore = useAgendaStore()

const router = useRouter()

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
  <Flex fill-parent>
    <Calendar :events="events" @choose-day="chooseDay" />
  </Flex>
</template>
