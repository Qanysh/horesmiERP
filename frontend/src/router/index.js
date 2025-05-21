// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/pages/home/views/HomeView.vue";
import Customers from "@/pages/customers/views/CustomersView.vue";
import Vendors from "@/pages/vendors/views/VendorsView.vue";
import Items from "@/pages/items/views/ItemsView.vue";
import Users from "@/views/Users/Users.vue";
import Signup from "@/pages/auth/views/SignupView.vue";
import Login from "@/pages/auth/views/LoginView.vue";
import PurchaseOrdersView from "@/pages/purchaseOrders/views/PurchaseOrdersView.vue";
import PurchaseHeadersView from "@/pages/purchaseHeaders/views/PurchaseHeadersView.vue";
import SalesView from "@/pages/salesOrders/views/SalesOrdersView.vue";
import GeneralLedgerEntriesView from "@/pages/generalLedgerEntries/views/GeneralLedgerEntriesView.vue";
import NotFound from "@/pages/notFound/NotFoundView.vue";
import { useAuthStore } from "@/pages/auth/stores/authStore";
import { isAuthenticated, getUser } from "@/pages/auth/utils/storage";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
      meta: { hideLayout: true },
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/customers",
      name: "customers",
      component: Customers,
      meta: { requiresAuth: true },
    },
    {
      path: "/vendors",
      name: "vendors",
      component: Vendors,
      meta: { requiresAuth: true },
    },
    {
      path: "/items",
      name: "items",
      component: Items,
      meta: { requiresAuth: true },
    },
    {
      path: "/users",
      name: "users",
      component: Users,
      meta: { requiresAuth: true },
    },
    {
      path: "/purchaseHeaders",
      name: "purchaseHeaders",
      component: PurchaseHeadersView,
      meta: { requiresAuth: true },
    },
    {
      path: "/sales",
      name: "sales",
      component: SalesView,
      meta: { requiresAuth: true },
    },
    {
      path: "/ledger",
      name: "ledger",
      component: GeneralLedgerEntriesView,
      meta: { requiresAuth: true },
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
      meta: { hideLayout: true, requiresGuest: true },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { hideLayout: true, requiresGuest: true },
    },
  ],
});

export function setupRouter(app) {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    authStore.isAuth = isAuthenticated();
    authStore.user = getUser();

    if (to.meta.requiresAuth && !authStore.authenticated) {
      next("/login");
    } else if (to.meta.requiresGuest && authStore.authenticated) {
      next("/");
    } else {
      next();
    }
  });

  return router;
}

export default router;
