import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.use(router)
app.use(VueApexCharts)
app.component('ApexChart', VueApexCharts)

import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()

if (authStore.isAuth && !authStore.user) {
}

app.mount('#app')
