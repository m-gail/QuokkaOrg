<script setup lang="ts">
import Dock from '@/components/Dock.vue';
import Calendar from '@/components/icons/Calendar.vue'
import Settings from '@/components/icons/Settings.vue'

const navbarRoutes = [
  { text: 'Agenda', to: '/agenda', icon: Calendar },
  { text: 'Settings', to: '/settings', icon: Settings },
]
</script>

<template>
  <main>
    <RouterView />
  </main>
  <Dock :links="navbarRoutes" />
</template>
