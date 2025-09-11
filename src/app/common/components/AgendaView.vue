<script setup lang="ts">
import type { Agenda } from '@/org/types'
import AgendaDayCard from './AgendaDayCard.vue'

const { agenda, today } = defineProps<{ agenda: Agenda, today: Date }>()
</script>

<template>
  <AgendaDayCard v-for="day in agenda.days" :key="day.date" :day="day" :today="today" />
</template>
