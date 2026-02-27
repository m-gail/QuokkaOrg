<script setup lang="ts">
import List from '@/components/List.vue'
import type { AgendaEvent } from '@/org/types'
import AgendaEventListItem from './AgendaEventListItem.vue'

const { events } = defineProps<{ events: AgendaEvent[] }>()
</script>

<template>
  <List v-if="events.length > 0">
    <AgendaEventListItem v-for="event in events" :key="event.time" :event="event" />
  </List>
</template>
