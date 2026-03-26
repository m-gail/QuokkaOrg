<script setup lang="ts">
import List from '@/components/List.vue'
import type { AgendaEvent } from '@/org/types'
import AgendaEventListItem from './AgendaEventListItem.vue'

const { events, defaultShowIntermediateBreadcrumbs = false } = defineProps<{
  events: AgendaEvent[]
  defaultShowIntermediateBreadcrumbs?: boolean
}>()
</script>

<template>
  <List v-if="events.length > 0">
    <AgendaEventListItem
      v-for="event in events"
      :key="event.time"
      :event="event"
      :default-show-intermediate-breadcrumbs="defaultShowIntermediateBreadcrumbs" />
  </List>
</template>
