<script setup lang="ts">
import Button from '../Button.vue'
import { cls } from '@/app/common/classes'
import { computed } from 'vue'
import type { CalendarEvent } from './types'
import Flex from '../Flex.vue'

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
  cls([!currentMonth && 'text-base-content/50', isToday && 'text-primary', 'h-full', 'w-full']),
)
</script>
<template>
  <Button :class="classes" type="clear" @click="() => onChange(day)">
    <Flex padding="2" class="relative">
      {{ day.getDate() }}
      <div
        v-if="events.length > 0"
        aria-label="status"
        class="status status-primary absolute top-0 right-0"
      />
    </Flex>
  </Button>
</template>
