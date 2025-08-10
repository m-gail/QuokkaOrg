<script setup lang="ts">
import Dock from '@/components/Dock.vue';
import Inbox from '@/components/icons/Inbox.vue';
import Settings from '@/components/icons/Settings.vue'

const navbarRoutes = [
  { text: 'Upcoming', to: '/upcoming', icon: Inbox },
  { text: 'Settings', to: '/settings', icon: Settings },
]
</script>

<template>
  <main class="pb-20">
    <RouterView />
  </main>
  <Dock :links="navbarRoutes" />
</template>
