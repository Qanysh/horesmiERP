<script setup>
import ActivityCard from './ActivityCard.vue'

defineProps({
  loading: Boolean,
  activities: Array
})
</script>

<template>
  <section class="container mx-auto my-10">
    <h1 class="text-center font-bold text-2xl lg:text-start">Activities</h1>
    <hr class="my-4" />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-items-center lg:justify-items-start">
      <div v-for="(activity, index) in activities" :key="index">
        <p class="mb-3 ml-1 lg:ml-1">{{ activity.title }}</p>
        <div class="flex gap-4 md:gap-10">
          <ActivityCard
            v-for="(card, i) in activity.cards"
            :key="i"
            :title="card.title"
            :value="card.value"
            :loading="loading"
          />
        </div>
      </div>
    </div>
  </section>
</template>