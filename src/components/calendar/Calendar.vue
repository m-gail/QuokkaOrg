<script setup lang="ts">
import {
  formatIsoDate,
  isSameDay,
  now
} from '@/app/common/date'
import { computed } from 'vue'
import Flex from '../Flex.vue'
import Grid from '../Grid.vue'
import DayItem from './DayItem.vue'
import { getPageItems } from './page'
import type { CalendarEvent } from './types'
import { isEventOnDay } from './util'
import WeekdayHeader from './WeekdayHeader.vue'

const { events = [], page } = defineProps<{ events?: CalendarEvent[]; page: Date }>()

const today = now()
const currentPageItems = computed(() => getPageItems(page))

const emit = defineEmits<{ chooseDay: [string] }>()

function onClick(day: Date) {
  emit('chooseDay', formatIsoDate(day))
}
</script>

<template>
  <Flex col fill-parent>
    <Grid cols="7" center>
      <WeekdayHeader v-for="index in 7" :key="index" :weekday="index - 1" />
      <DayItem
        v-for="day in currentPageItems"
        :key="formatIsoDate(day)"
        :day="day"
        :current-month="day.getMonth() == page.getMonth()"
        :is-today="isSameDay(day, today)"
        :events="events.filter((event) => isEventOnDay(event, day))"
        @click="onClick"
      />
    </Grid>
  </Flex>
</template>
