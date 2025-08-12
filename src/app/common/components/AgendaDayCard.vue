<script setup lang="ts">
import Card from '@/components/Card.vue'
import type { AgendaDay } from '@/org/parser/types'
import { formatDateWithWeekDay } from '../date'
import AgendaEventsList from './AgendaEventsList.vue'

const { day } = defineProps<{ day: AgendaDay }>()
const date = new Date(Date.parse(day.date))
</script>

<template>
  <Card :title="formatDateWithWeekDay(date)">
    <AgendaEventsList :events="day.events" />
  </Card>
</template>
