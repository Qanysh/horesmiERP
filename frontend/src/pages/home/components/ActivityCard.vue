<script setup>
defineProps({
  title: String,
  value: String,
  loading: Boolean,
  route: String,
});
</script>

<template>
  <div
    v-if="loading"
    class="relative bg-gray-200 rounded-lg py-6 shadow-xl ring-1 ring-gray-300/5 mx-auto max-w-lg animate-pulse px-4"
  >
    <div class="space-y-3">
      <div class="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
      <div class="h-10 bg-gray-300 rounded w-auto mx-auto"></div>
      <div class="h-4 bg-gray-300 rounded w-auto mx-auto"></div>
    </div>
  </div>
  <div
    v-else
    class="relative bg-white py-6 shadow-xl ring-1 ring-gray-900/5 mx-auto max-w-lg rounded-lg px-6 hover:shadow-2xl transition-all duration-300 border border-gray-100"
  >
    <div class="mx-auto max-w-md">
      <div class="flex items-center justify-between mb-4">
        <span
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
        >
          Sales Line
        </span>
        <span class="text-sm text-gray-500">ID: {{ title }}</span>
      </div>

      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm font-medium text-gray-500">Document Number</p>
            <p class="text-lg font-semibold text-gray-800">{{ title }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Unit Price</p>
            <p class="text-2xl font-bold text-blue-600">{{ value }}</p>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <router-link
            :to="route"
            class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            View details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
