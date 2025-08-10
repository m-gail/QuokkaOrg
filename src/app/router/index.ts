import { createRouter, createWebHistory } from 'vue-router'
import CalendarPage from '../pages/Calendar/CalendarPage.vue'
import DayPage from '../pages/Day/DayPage.vue'
import IndexPage from '../pages/Index/IndexPage.vue'
import SettingsPage from '../pages/Settings/SettingsPage.vue'
import UpcomingPage from '../pages/Upcoming/UpcomingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: IndexPage },
    { path: '/upcoming', component: UpcomingPage },
    {
      path: '/calendar',
      component: CalendarPage,
    },
    {
      path: '/calendar/day/:date',
      component: DayPage,
    },
    { path: '/settings', component: SettingsPage },
  ],
})

export default router
