<script setup lang="ts">
import { cls } from '@/app/common/classes'
import { computed } from 'vue'
import ButtonBase from '../ButtonBase.vue'
import Flex from '../Flex.vue'
import EventBadge from './EventBadge.vue'
import type { CalendarEvent } from './types'

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
  cls([!currentMonth && 'secondary-text', isToday && 'primary-text bold']),
)
</script>
<template>
  <ButtonBase class="wrapper" type="clear" @click="() => onChange(day)">
    <Flex gap="1" col center fill-parent>
      <span :class="classes">{{ day.getDate() }}</span>
      <EventBadge :key="event.title" v-for="event in events" :title="event.title" />
    </Flex>
  </ButtonBase>
</template>

<style lang="css" scoped>
.wrapper {
  height: 100%;
  width: 100%;
}
</style>
