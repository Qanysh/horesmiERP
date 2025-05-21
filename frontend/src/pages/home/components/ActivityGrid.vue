<script setup>
import ActivityCard from "./ActivityCard.vue";

defineProps({
  loading: Boolean,
  activities: Array,
});
</script>

<template>
  <section class="container mx-auto my-10">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
      <p class="mt-2 text-lg text-gray-600">
        Recent sales activities and transactions
      </p>
    </div>

    <div class="space-y-8">
      <div
        v-for="(activity, index) in activities"
        :key="index"
        class="bg-white rounded-xl shadow-sm p-6"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-800 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-blue-500 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            {{ activity.title }}
          </h2>
          <router-link
            to="/sales"
            class="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center"
          >
            View all
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

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <ActivityCard
            v-for="(card, i) in activity.cards"
            :key="i"
            :title="card.title"
            :value="card.value"
            :loading="loading"
            :route="card.route"
          />
        </div>
      </div>
    </div>
  </section>
</template>
