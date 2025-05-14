<script setup>
defineProps({
  title: String,
  value: String,
  loading: Boolean
})
</script>

<template>
  <div v-if="loading" class="relative bg-gray-200 rounded py-6 shadow-xl ring-1 ring-gray-300/5 mx-auto max-w-lg animate-pulse px-4">
    <div class="space-y-3">
      <div class="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
      <div class="h-10 bg-gray-300 rounded w-auto mx-auto"></div>
      <div class="h-4 bg-gray-300 rounded w-auto mx-auto"></div>
    </div>
  </div>
  <div v-else class="relative bg-white py-6 shadow-xl ring-1 ring-gray-900/5 mx-auto max-w-lg rounded-lg px-4">
    <div class="mx-auto max-w-md">
      <p>{{ title }}</p>
      <div class="divide-y divide-gray-300/50">
        <div class="space-y-6 py-2 text-base leading-7 text-gray-600">
          <h3 class="font-bold text-3xl">{{ value }}</h3>
        </div>
        <div class="pt-5 text-base font-semibold leading-7">
          <p class="text-gray-900">Show more</p>
          <p>
            <router-link to="/" class="text-sky-500 hover:text-sky-600">Continue &rarr;</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>