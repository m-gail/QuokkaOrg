<script setup lang="ts">
import {
  formatIsoDate,
  formatMonthAndYear,
  getNextMonth,
  getPreviousMonth,
  getStartOfMonth,
  isSameDay,
} from '@/app/common/date'
import { computed, ref } from 'vue'
import Button from '../Button.vue'
import Flex from '../Flex.vue'
import Grid from '../Grid.vue'
import ChevronLeftIcon from '../icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '../icons/ChevronRightIcon.vue'
import Text from '../Text.vue'
import DayItem from './DayItem.vue'
import { getPageItems } from './page'
import WeekdayHeader from './WeekdayHeader.vue'
import type { CalendarEvent } from './types'
import { isEventOnDay } from './util'

const { events = [] } = defineProps<{ events?: CalendarEvent[] }>()

const today = new Date()
const currentPage = ref(getStartOfMonth(today))
const currentPageItems = computed(() => getPageItems(currentPage.value))

function previousPage() {
  currentPage.value = getPreviousMonth(currentPage.value)
}

function nextPage() {
  currentPage.value = getNextMonth(currentPage.value)
}

const emit = defineEmits<{ chooseDay: [string] }>()

function onClick(day: Date) {
  emit('chooseDay', formatIsoDate(day))
}
</script>

<template>
  <Flex col fill-parent>
    <Flex center>
      <Button type="clear" :icon="ChevronLeftIcon" @click="previousPage" />
      <Text grow center>{{ formatMonthAndYear(currentPage) }}</Text>
      <Button type="clear" :icon="ChevronRightIcon" @click="nextPage" />
    </Flex>
    <Grid cols="7" center class="grow grid-rows-[auto] auto-rows-fr">
      <WeekdayHeader v-for="index in 7" :key="index" :weekday="index - 1" />
      <DayItem
        v-for="day in currentPageItems"
        :key="formatIsoDate(day)"
        :day="day"
        :current-month="day.getMonth() == currentPage.getMonth()"
        :is-today="isSameDay(day, today)"
        :events="events.filter((event) => isEventOnDay(event, day))"
        @click="onClick"
      />
    </Grid>
  </Flex>
</template>
