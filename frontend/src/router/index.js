import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import DashboardView from '@/views/Dashboard/DashboardView.vue'
import HomeView from '@/views/HomeView.vue'
import CustomersView from '@/views/Customers/CustomersView.vue'
import VendorsView from '@/views/Vendors/VendorsView.vue'
import ItemsView from '@/views/Items/ItemsView.vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardView,
      },
      {
        path: 'customers',
        name: 'Customers',
        component: CustomersView,
      },
      {
        path: '/vendors',
        name: 'vendors',
        component: VendorsView,
      },
      {
        path: '/items',
        name: 'items',
        component: ItemsView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
