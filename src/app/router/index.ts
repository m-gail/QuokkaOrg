import { createRouter, createWebHistory } from 'vue-router'
import SettingsPage from '../pages/Settings/SettingsPage.vue'
import IndexPage from '../pages/Index/IndexPage.vue'
import UpcomingPage from '../pages/Upcoming/UpcomingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: IndexPage },
    { path: '/upcoming', component: UpcomingPage },
    { path: '/settings', component: SettingsPage },
  ],
})

export default router
