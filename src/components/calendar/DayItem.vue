<script setup lang="ts">
import { formatIsoDate } from '@/app/common/date'
import Button from '../Button.vue'
import { cls } from '@/app/common/classes'
import { computed } from 'vue'

const { day, currentMonth, isToday } = defineProps<{
  day: Date
  currentMonth: boolean
  isToday: boolean
}>()

const emit = defineEmits<{ click: [Date] }>()

function onChange(day: Date) {
  emit('click', day)
}

const classes = computed(() =>
  cls([!currentMonth && 'text-base-content/50', isToday && 'text-primary']),
)
</script>
<template>
  <Button :class="classes" type="clear" @click="() => onChange(day)">
    {{ day.getDate() }}
  </Button>
</template>
