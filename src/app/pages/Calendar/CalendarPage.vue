<script setup lang="ts">
import Calendar from '@/components/Calendar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function chooseDay(day: string) {
  router.push(`/calendar/day/${day}`)
}
</script>

<template>
  <Calendar @choose-day="chooseDay" />
</template>
