<script setup lang="ts">
import Button from '../Button.vue'
import { cls } from '@/app/common/classes'
import { computed } from 'vue'
import type { CalendarEvent } from './types'
import Flex from '../Flex.vue'
import EventBadge from './EventBadge.vue'

const { day, currentMonth, isToday, events } = defineProps<{
  day: Date
  currentMonth: boolean
  isToday: boolean
  events: CalendarEvent[]
}>()

const emit = defineEmits<{ click: [Date] }>()

function onChange(day: Date) {
  emit('click', day)
}

const classes = computed(() =>
  cls([
    !currentMonth && 'text-base-content/50',
    isToday && 'text-primary',
    'h-full',
    'w-full',
    'p-0',
  ]),
)
</script>
<template>
  <Button :class="classes" type="clear" @click="() => onChange(day)">
    <Flex gap="1" col class="max-w-full">
      {{ day.getDate() }}
      <EventBadge :key="event.title" v-for="event in events" :title="event.title" />
    </Flex>
  </Button>
</template>
