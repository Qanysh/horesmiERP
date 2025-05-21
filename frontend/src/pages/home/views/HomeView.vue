<script setup>
import { ref, onMounted } from "vue";
import HeroSection from "../components/HeroSection.vue";
import ActivityGrid from "../components/ActivityGrid.vue";
import pc from "@/assets/img/pc.png";

const loading = ref(true);
const activities = ref([
  {
    title: "Recent Sales",
    cards: [],
  },
]);

async function fetchSalesData() {
  try {
    const response = await fetch("http://localhost:3000/api/salesLines");
    const data = await response.json();

    // Take first 3 items and map to card format
    activities.value[0].cards = data.slice(0, 3).map((item) => ({
      title: item.documentNo,
      value: `${item.unitPrice}$`,
      route: `/sales/${item.id}`, // Assuming you want to link to individual sales
    }));
  } catch (error) {
    console.error("Error fetching sales data:", error);
    // Fallback data if API fails
    activities.value[0].cards = data.slice(0, 3).map((item) => ({
      title: item.documentNo, // Will be shown as Document Number
      value: `${item.unitPrice} $`, // Will be shown as Unit Price
      route: `/sales/${item.id}`, // For the details link
    }));
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchSalesData();
});
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

    <ActivityGrid :loading="loading" :activities="activities" />
  </div>
</template>
