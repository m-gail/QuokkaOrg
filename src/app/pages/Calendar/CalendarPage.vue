<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function chooseDay(event: { target: { value: string } }) {
  router.push(`/calendar/day/${event.target.value}`)
}
</script>

<template>
  <calendar-date class="cally bg-base-100 w-full" @change="chooseDay">
    <svg aria-label="Previous" class="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24">
      <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path>
    </svg>
    <svg aria-label="Next" class="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24">
      <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
    </svg>
    <calendar-month></calendar-month>
  </calendar-date>
</template>
