<script setup lang="ts">
import Dock from '@/components/Dock.vue';
import Calendar from '@/components/icons/Calendar.vue';
import Inbox from '@/components/icons/Inbox.vue';
import Settings from '@/components/icons/Settings.vue'

const navbarRoutes = [
  { text: 'Upcoming', to: '/upcoming', icon: Inbox },
  { text: 'Calendar', to: '/calendar', icon: Calendar },
  { text: 'Settings', to: '/settings', icon: Settings },
]
</script>

<template>
  <main class="pb-20">
    <RouterView />
  </main>
  <Dock :links="navbarRoutes" />
</template>
