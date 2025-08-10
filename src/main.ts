import { createApp } from 'vue'
import router from './app/router'
import App from './app/App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import "cally"

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
