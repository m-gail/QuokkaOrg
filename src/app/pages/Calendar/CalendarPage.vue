<script setup lang="ts">
import Calendar from '@/components/calendar/Calendar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function chooseDay(day: string) {
  router.push(`/calendar/day/${day}`)
}
</script>

<template>
  <div class="p-4">
    <Calendar @choose-day="chooseDay" />
  </div>
</template>
