<script setup lang="ts">
import { parseAgenda, type Agenda } from '@/org/parser/agenda'
import { ref } from 'vue'

const text = `
* Algorithms
** DONE Exam
DEADLINE: <2024-02-11 Sun>
** DONE Exercise
DEADLINE: <2024-03-14 Thu 20:00>
** DONE Lecture
DEADLINE: <2024-02-19 Mon 08:00>
`

const agenda = ref<Agenda | undefined>(undefined)
parseAgenda(text).then((result) => (agenda.value = result))
</script>

<template>{{ agenda }}</template>
