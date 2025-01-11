import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Customers from "@/views/Customers.vue";
import Vendors from "@/views/Vendors.vue";
import Login from "@/views/Login.vue"; // Login page
import ResetPassword from "@/views/ResetPassword.vue"; // Reset password page

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/customers",
      name: "customers",
      component: Customers,
    },
    {
      path: "/vendors",
      name: "vendors",
      component: Vendors,
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPassword, // The reset password page
    },
  ],
});

export default router;
