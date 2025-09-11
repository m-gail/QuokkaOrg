<script setup lang="ts">
import Card from '@/components/Card.vue'
import type { AgendaDay } from '@/org/types'
import { formatDateWithWeekDay, getDayDiff } from '../date'
import AgendaEventsList from './AgendaEventsList.vue'
import { computed } from 'vue';

const { day, today } = defineProps<{ day: AgendaDay, today: Date }>()
const date = computed(() => new Date(Date.parse(day.date)))
const dayDiff = computed(() => getDayDiff(today, date.value))
</script>

<template>
  <Card :title="formatDateWithWeekDay(date)" :badge="`In ${dayDiff} ${dayDiff > 1 ? 'days' : 'day'}`">
    <AgendaEventsList :events="day.events" />
  </Card>
</template>
