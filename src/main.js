import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const queryClient = new QueryClient()
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(VueQueryPlugin, { queryClient })
pinia.use(piniaPluginPersistedstate)

app.mount('#app')
