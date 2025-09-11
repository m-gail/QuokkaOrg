<script setup lang="ts">
import Card from '@/components/Card.vue'
import type { AgendaDay } from '@/org/types'
import { formatDateWithWeekDay, getDayDiff } from '../date'
import AgendaEventsList from './AgendaEventsList.vue'
import { computed } from 'vue';

const { day, today } = defineProps<{ day: AgendaDay, today: Date }>()
const date = computed(() => new Date(Date.parse(day.date)))
const text = computed(() => {
  const dayDiff = getDayDiff(today, date.value)
  if (dayDiff == 0) {
    return 'Today'
  } else if (dayDiff == 1) {
    return `In ${dayDiff} day`
  } else {
    return `In ${dayDiff} days`
  }
})
</script>

<template>
  <Card :title="formatDateWithWeekDay(date)" :badge="text">
    <AgendaEventsList :events="day.events" />
  </Card>
</template>
