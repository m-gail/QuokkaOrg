<script setup lang="ts">
import type { Agenda } from '@/org/parser/types';
import AgendaDayView from './AgendaDayView.vue';

const { agenda } = defineProps<{ agenda: Agenda }>()
</script>

<template>
    <AgendaDayView v-for="day in agenda.days" :key="day.date" :day="day" />
</template>
