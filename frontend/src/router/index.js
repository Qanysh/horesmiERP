import { createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Customers from '@/views/Customers.vue'
import Vendors from '@/views/Vendors.vue'

const router = createRouter ({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
        path: '/',
        name:'home',
        component: HomeView
    }, 
    {
        path:'/customers',
        name:'customers',
        component: Customers
    },
    {
        path: '/vendors',
        name: 'vendors',
        component: Vendors
    }
]
})

export default router;