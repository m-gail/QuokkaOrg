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

const dateClasses = computed(() =>
  cls([!currentMonth && 'opacity-40', isToday && 'on-primary-text bold primary tiny-padding']),
)
</script>
<template>
  <ButtonBase class="wrapper" type="clear" @click="() => onChange(day)">
    <Flex gap="1" col center fill-parent>
      <span :class="dateClasses">{{ day.getDate() }}</span>
      <EventBadge
        v-for="event in events"
        :key="event.title"
        :title="event.title"
        :color="event.color" />
    </Flex>
  </ButtonBase>
</template>

<style lang="css" scoped>
.wrapper {
  height: 100%;
  width: 100%;
}

.opacity-40 {
  opacity: 0.4;
}
</style>
