<script setup lang="ts">
import { loadAgenda } from '@/app/common/agenda/loadAgenda'
import { useSettingsStore } from '@/app/store/settings'
import Calendar from '@/components/calendar/Calendar.vue'
import type { CalendarEvent } from '@/components/calendar/types'
import Flex from '@/components/Flex.vue'
import type { Agenda } from '@/org/types'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const settings = useSettingsStore()

const router = useRouter()
const agenda = ref<Agenda | undefined>(undefined)

function chooseDay(day: string) {
  router.push(`/calendar/day/${day}`)
}

const events = computed(
  () =>
    agenda.value?.days.flatMap((day) =>
      day.events.map((event) => ({
        day: day.date,
        title: event.breadcrumbs[event.breadcrumbs.length - 1],
      })),
    ) ?? [],
)

onMounted(async () => {
  if (settings.directoryPath !== '') {
    agenda.value = await loadAgenda(settings.directoryPath, settings.ignoredFolders)
  }
})
</script>

<template>
  <Flex fill-parent>
    <Calendar :events="events" @choose-day="chooseDay" />
  </Flex>
</template>
