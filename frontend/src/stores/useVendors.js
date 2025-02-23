// src/stores/useVendorsStore.js
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";
import API_URL from "@/config/index.js";

export const useVendorsStore = defineStore("vendor", () => {
  const vendors = ref([]);
  const filteredVendors = ref([]);
  const searchQuery = ref("");
  const error = ref(null);
  const loading = ref(false);

  // Функция загрузки всех поставщиков
  const fetchVendors = async () => {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 200)); // Эмуляция задержки
      const response = await axios.get(`${API_URL}/api/vendors`);
      vendors.value = response.data;
      filterVendorsData();
    } catch (err) {
      error.value = "Error fetching vendors";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Фильтрация поставщиков
  const filterVendorsData = () => {
    filteredVendors.value = vendors.value.filter((vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  };

  // Следим за изменением строки поиска
  watch(searchQuery, () => {
    filterVendorsData();
  });

  return {
    vendors,
    filteredVendors,
    searchQuery,
    error,
    loading,
    fetchVendors,
    filterVendorsData,
  };
});
