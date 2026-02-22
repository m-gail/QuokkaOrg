<script setup lang="ts">
import Dock from '@/components/Dock.vue'
import CalendarIcon from '@/components/icons/CalendarIcon.vue'
import InboxIcon from '@/components/icons/InboxIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import { MaterialColor } from '@/components/materialColor'
import { LocalNotifications } from '@capacitor/local-notifications'
import { onMounted } from 'vue'

const navbarRoutes = [
  { text: 'Upcoming', to: '/upcoming', icon: InboxIcon },
  { text: 'Calendar', to: '/calendar', icon: CalendarIcon },
  { text: 'Settings', to: '/settings', icon: SettingsIcon },
]

onMounted(async () => {
  await ui("theme", (await MaterialColor.getSourceColor()).source)
  const permissionResult = await LocalNotifications.checkPermissions()
  if (permissionResult.display != 'granted') {
    await LocalNotifications.requestPermissions()
  }
})
</script>

<template>
  <RouterView />
  <Dock :links="navbarRoutes" />
</template>

<style>
</style>
