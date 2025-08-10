import { createRouter, createWebHistory } from 'vue-router'
import AgendaPage from '../pages/Agenda/AgendaPage.vue'
import SettingsPage from '../pages/Settings/SettingsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/agenda', component: AgendaPage },
    { path: '/settings', component: SettingsPage },
  ],
})

export default router
