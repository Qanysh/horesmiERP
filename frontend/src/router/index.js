import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/Dashboard/DashboardView.vue'
import CustomersView from '@/views/Customers/CustomersView.vue'
import VendorsView from '@/views/Vendors/VendorsView.vue'
import ItemsView from '@/views/Items/ItemsView.vue'
import PurchaseOrdersView from '@/views/PurchaseOrders/PurchaseOrdersView.vue'
import SalesOrdersView from '@/views/SalesOrders/SalesOrdersView.vue'
import SignupView from '@/views/Auth/SignupView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import authService from '@/services/authService'
import ProductsView from '@/views/Product/ProductsView.vue'
import ProductionToolsView from '@/views/ProductionTools/ProductionToolsView.vue'

const routes = [
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/dashboard',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: DashboardView,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/customers',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'Customers',
        component: CustomersView,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/vendors',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'Vendors',
        component: VendorsView,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/items',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'Items',
        component: ItemsView,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/purchase-orders',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'PurchaseOrders',
        component: PurchaseOrdersView,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/sales-orders',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'SalesOrders',
        component: SalesOrdersView,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/products',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'Products',
        component: ProductsView,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/production-tools',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'ProductionTools',
        component: ProductionToolsView,
        meta: { requiresAuth: true },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated()

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (['Login', 'Signup'].includes(to.name) && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
