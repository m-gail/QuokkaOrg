<script setup lang="ts">
import { parseAgenda, type Agenda } from '@/org/parser/agenda'
import { ref } from 'vue'
import AgendaDay from './components/AgendaDay.vue'

const text = `
* Algorithms
** DONE Exam
DEADLINE: <2024-02-11 Sun>
** DONE Exercise
DEADLINE: <2024-02-19 Thu 20:00>
** DONE Lecture
DEADLINE: <2024-02-19 Mon 08:00>
`

const agenda = ref<Agenda>({ days: [] })
parseAgenda(text).then((result) => (agenda.value = result))
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <AgendaDay v-for="day in agenda.days" :key="day.date" :day="day" />
  </div>
</template>
