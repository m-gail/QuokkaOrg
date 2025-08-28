<script setup lang="ts">
import Dock from '@/components/Dock.vue'
import CalendarIcon from '@/components/icons/CalendarIcon.vue'
import InboxIcon from '@/components/icons/InboxIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'

const navbarRoutes = [
  { text: 'Upcoming', to: '/upcoming', icon: InboxIcon },
  { text: 'Calendar', to: '/calendar', icon: CalendarIcon },
  { text: 'Settings', to: '/settings', icon: SettingsIcon },
]
</script>

<template>
  <main class="pb-16 min-h-dvh h-dvh overflow-scroll">
    <RouterView />
  </main>
  <Dock :links="navbarRoutes" />
</template>
