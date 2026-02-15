<script setup lang="ts">
import Dock from '@/components/Dock.vue'
import FloatingLoadingIndicator from '@/components/FloatingLoadingIndicator.vue'
import CalendarIcon from '@/components/icons/CalendarIcon.vue'
import InboxIcon from '@/components/icons/InboxIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import { LocalNotifications } from '@capacitor/local-notifications'
import { onMounted } from 'vue'
import { useAgendaStore } from './store/agenda'

const agendaStore = useAgendaStore()
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
  <FloatingLoadingIndicator v-if="agendaStore.updating" />
  <Dock :links="navbarRoutes" />
  <main class="responsive main">
    <RouterView />
  </main>
</template>

<style>
.main {
  padding-top: var(--sat);
  padding-left: var(--sal);
  padding-right: var(--sar);
}
</style>
