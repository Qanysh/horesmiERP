<script setup>
import { ref, onMounted } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import ActivityGrid from '../components/ActivityGrid.vue'
import pc from "@/assets/img/pc.png"

const loading = ref(true)
const activities = ref([
  {
    title: "Ongoing Sales",
    cards: [
      { title: "Sales this month", value: "8 100$" },
      { title: "Sales this month", value: "8 100$" },
      { title: "Sales this month", value: "8 100$" }
    ]
  },
])

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 2000)
})
</script>

<template>
  <div>
    <HeroSection
      title="Начало работы!"
      subtitle="Знакомьтесь с"
      description="Вы готовы к изучению демонстрационной Horesmi. Ознакомьтесь с ней самостоятельно или воспользуйтесь кратким обзором."
      buttonText="Показать что-то"
      :image="pc"
    />
    
    <ActivityGrid
      :loading="loading"
      :activities="activities"
    />
  </div>
</template>