<script setup lang="ts">
import Dock from '@/components/Dock.vue'
import CalendarIcon from '@/components/icons/CalendarIcon.vue'
import InboxIcon from '@/components/icons/InboxIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import { MaterialColor } from '@/components/materialColor'
import { LocalNotifications } from '@capacitor/local-notifications'
import { onMounted } from 'vue'
import { formatIsoDate, getStartOfMonth, now } from './common/date'

const calendarPage = formatIsoDate(getStartOfMonth(now()))

const navbarRoutes = [
  {
    text: 'Upcoming',
    basePath: '/upcoming',
    to: '/upcoming',
    icon: InboxIcon,
  },
  {
    text: 'Calendar',
    basePath: '/calendar',
    to: `/calendar/month/${calendarPage}`,
    icon: CalendarIcon,
  },
  {
    text: 'Settings',
    basePath: '/settings',
    to: '/settings',
    icon: SettingsIcon,
  },
]

onMounted(async () => {
  await ui('theme', (await MaterialColor.getSourceColor()).source)
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

<style></style>
