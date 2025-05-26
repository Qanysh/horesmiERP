<script setup>
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useAuthStore } from "@/pages/auth/stores/authStore.js";

const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
};

const searchQuery = ref("");

const router = useRouter();
const route = useRoute();

const filteredRoutes = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return router.options.routes.filter(
    (route) =>
      route.name.toLowerCase().includes(query) ||
      route.path.toLowerCase().includes(query)
  );
});

watch(route, () => {
  searchQuery.value = "";
});

const navigateToRoute = (path) => {
  searchQuery.value = "";
  router.push(path);
};
</script>

<template>
  <div class="absolute right-0 mr-1 sm:mr-0 block z-30">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search for a route"
      class="rounded-lg p-1 px-2 border-2 border-black focus:outline-none"
    />
    <div v-if="searchQuery" class="bg-white rounded-lg">
      <div v-if="filteredRoutes.length">
        <div
          v-for="route in filteredRoutes"
          :key="route.path"
          @click="navigateToRoute(route.path)"
          class="py-2 px-4 cursor-pointer hover:bg-gray-200 hover:rounded-lg"
        >
          {{ route.name }}
        </div>
      </div>
      <p v-else class="py-2 px-4">No routes found</p>
    </div>
    <button
      @click="handleLogout"
      class="hidden lg:block w-full text-left px-4 py-2"
    >
      Logout
    </button>
  </div>
</template>
