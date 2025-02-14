// src/stores/useItemStore.js
import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import axios from "axios";
import API_URL from "@/config/index.js";
import { filterItems } from "@/utils/filter";

export const useItemStore = defineStore("item", () => {
  const items = ref([]);
  const filteredItems = ref([]);
  const searchQuery = ref("");
  const error = ref(null);
  const loading = ref(false);

  const fetchItems = async () => {
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axios.get(`${API_URL}/api/items`);
      items.value = response.data;
      filterItemsData();
    } catch (err) {
      error.value = "Error fetching data";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const filterItemsData = () => {
    filteredItems.value = filterItems(items.value, searchQuery.value);
  };

  watch(searchQuery, () => {
    filterItemsData();
  });

  return {
    items,
    filteredItems,
    searchQuery,
    error,
    loading,
    fetchItems,
    filterItemsData,
  };
});
