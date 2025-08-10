<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Card from '@/components/Card.vue'
import List from '@/components/List.vue';
import ListItem from '@/components/ListItem.vue'
import type { AgendaDay } from '@/org/parser/agenda'

const { day } = defineProps<{ day: AgendaDay }>()
</script>

<template>
  <Card :title="day.date">
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
