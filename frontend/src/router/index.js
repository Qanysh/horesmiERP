import Customers from "@/views/Customers/Customers.vue";
import HomeView from "@/views/Home/HomeView.vue";
import Items from "@/views/Items/Items.vue";
import Users from "@/views/Users/Users.vue";
import Vendors from "@/views/Vendors/Vendors.vue";
import { createRouter, createWebHistory } from "vue-router";

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
  ],
});

export default router;
