<script setup lang="ts">
import { loadAgenda } from '@/app/common/agenda/loadAgenda'
import { useSettingsStore } from '@/app/store/settings'
import Calendar from '@/components/calendar/Calendar.vue'
import Flex from '@/components/Flex.vue'
import type { Agenda } from '@/org/types'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const settings = useSettingsStore()

const router = useRouter()
const agenda = ref<Agenda | undefined>(undefined)

function chooseDay(day: string) {
  router.push(`/calendar/day/${day}`)
}
onMounted(async () => {
  if (settings.directoryPath !== '') {
    agenda.value = await loadAgenda(settings.directoryPath, settings.ignoredFolders)
  }
})
</script>

<template>
  <Flex padding="4" fill-parent>
    <Calendar
      :events="agenda?.days.map((day) => ({ day: day.date })) ?? []"
      @choose-day="chooseDay"
    />
  </Flex>
</template>
