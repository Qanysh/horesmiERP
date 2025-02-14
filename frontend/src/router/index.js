import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home/HomeView.vue";
import Customers from "@/views/Customers/Customers.vue";
import Vendors from "@/views/Vendors/Vendors.vue";
import Items from "@/views/Items/Items.vue";
import Users from "@/views/Users/Users.vue";
import Login from "@/views/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
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
      path: "/items",
      name: "items",
      component: Items,
    },
    {
      path: "/users",
      name: "users",
      component: Users,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

export default router;
