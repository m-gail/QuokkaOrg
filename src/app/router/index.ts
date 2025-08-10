import { createRouter, createWebHistory } from 'vue-router'
import AgendaPage from '../pages/Agenda/AgendaPage.vue'
import SettingsPage from '../pages/Settings/SettingsPage.vue'
import IndexPage from '../pages/Index/IndexPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: IndexPage },
    { path: '/agenda', component: AgendaPage },
    { path: '/settings', component: SettingsPage },
  ],
})

export default router
