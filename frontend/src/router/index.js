import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import DashboardView from '@/views/Dashboard/DashboardView.vue'
import HomeView from '@/views/HomeView.vue'
import CustomersView from '@/views/Customers/CustomersView.vue'
import VendorsView from '@/views/Vendors/VendorsView.vue'
import ItemsView from '@/views/Items/ItemsView.vue'
import PurchaseOrdersView from '@/views/PurchaseOrders/PurchaseOrdersView.vue'
import SalesOrdersView from '@/views/SalesOrders/SalesOrdersView.vue'

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
      {
        path: '/purchase-orders',
        name: 'purchase-orders',
        component: PurchaseOrdersView,
      },
      {
        path: '/sales-orders',
        name: 'sales-orders',
        component: SalesOrdersView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
