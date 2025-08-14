<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Flex from '@/components/Flex.vue';
import List from '@/components/List.vue'
import ListItem from '@/components/ListItem.vue'
import type { AgendaEvent } from '@/org/types'

const { events } = defineProps<{ events: AgendaEvent[] }>()
</script>

<template>
  <List v-if="events.length > 0">
    <ListItem v-for="event in events" :key="event.time">
      <Flex col>
        <Breadcrumbs :breadcrumbs="event.breadcrumbs" />
        {{ event.time }}
      </Flex>
    </ListItem>
  </List>
</template>
