<script setup lang="ts">
import Dock from '@/components/Dock.vue'
import CalendarIcon from '@/components/icons/CalendarIcon.vue'
import InboxIcon from '@/components/icons/InboxIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import { LocalNotifications } from '@capacitor/local-notifications'
import { onMounted } from 'vue'

const navbarRoutes = [
  { text: 'Upcoming', to: '/upcoming', icon: InboxIcon },
  { text: 'Calendar', to: '/calendar', icon: CalendarIcon },
  { text: 'Settings', to: '/settings', icon: SettingsIcon },
]

onMounted(async () => {
  const permissionResult = await LocalNotifications.checkPermissions()
  if (permissionResult.display != 'granted') {
    await LocalNotifications.requestPermissions()
  }
})
</script>

<template>
  <div class="min-h-dvh h-dvh pt-(--sat) pb-(--sab) pl-(--sal) pr-(--sar)">
    <main class="pb-16 h-full overflow-scroll">
      <RouterView />
    </main>
    <Dock :links="navbarRoutes" />
  </div>
</template>
