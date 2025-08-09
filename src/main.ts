import { createApp } from 'vue'
import router from './app/router'
import App from './app/App.vue';

const app = createApp(App)

app.use(router)

app.mount('#app')
