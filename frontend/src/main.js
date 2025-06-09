import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import App from './App.vue'
import router from './router'

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
