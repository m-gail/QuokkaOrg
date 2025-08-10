<script setup lang="ts">
import type { Agenda } from '@/org/parser/types';

const { agenda } = defineProps<{ agenda: Agenda }>()
</script>

<template>
    <AgendaEvents v-for="day in agenda.days" :key="day.date" :day="day" />
</template>
