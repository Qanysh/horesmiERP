<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import Search from "@/components/search/Search.vue";
import { useAuthStore } from "@/pages/auth/stores/authStore.js";

const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
};

const isMobileMenuVisible = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuVisible.value = !isMobileMenuVisible.value;
};
</script>

<template>
  <nav class="container relative mx-auto my-3">
    <div class="flex justify-between items-center">
      <div class="flex flex-col">
        <div class="flex items-center space-x-3">
          <RouterLink to="/" class="text-2xl font-bold text-blue-800"
            >HORESMI</RouterLink
          >
          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-2 text-gray-700 hover:text-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <Search />

        <div class="hidden lg:flex items-center space-x-6 mt-2">
          <RouterLink to="/customers" class="lower-menu">Customers</RouterLink>
          <RouterLink to="/vendors" class="lower-menu">Vendors</RouterLink>
          <RouterLink to="/items" class="lower-menu">Items</RouterLink>

          <RouterLink to="/purchaseHeaders" class="lower-menu"
            >Purchase Orders</RouterLink
          >
          <RouterLink to="/sales" class="lower-menu">Sales</RouterLink>
          <RouterLink to="/ledger" class="lower-menu"
            >General Ledgers</RouterLink
          >
        </div>
        <div
          v-show="isMobileMenuVisible"
          id="mobile-menu"
          class="lg:hidden flex flex-col space-y-4 mt-4"
        >
          <RouterLink to="/customers" class="lower-menu">Customers</RouterLink>
          <RouterLink to="/vendors" class="lower-menu">Vendors</RouterLink>
          <RouterLink to="/items" class="lower-menu">Items</RouterLink>

          <RouterLink to="/purchaseHeaders" class="lower-menu"
            >Purchase Orders</RouterLink
          >
          <button
            @click="handleLogout"
            class="block w-full text-left px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.lower-menu {
  @apply text-blue-800 hover:text-blue-600 transition;
}

.upper-menu {
  @apply relative text-gray-700 hover:text-blue-700 transition;
}
</style>
