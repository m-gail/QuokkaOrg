<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Card from '@/components/Card.vue'
import List from '@/components/List.vue'
import ListItem from '@/components/ListItem.vue'
import type { AgendaDay } from '@/org/parser/types'
import { formatDateWithWeekDay } from '../date'

const { day } = defineProps<{ day: AgendaDay }>()
const date = new Date(Date.parse(day.date))
</script>

<template>
  <Card :title="formatDateWithWeekDay(date)">
    <List>
      <ListItem v-for="event in day.events" :key="event.time">
        <div class="flex flex-col">
          <Breadcrumbs :breadcrumbs="event.breadcrumbs" />
          <div>
            {{ event.time }}
          </div>
        </div>
      </ListItem>
    </List>
  </Card>
</template>
