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

  // Состояние для модального окна и выбранного айтема
  const selectedItem = ref(null);
  const isModalOpen = ref(false);

  // Функция загрузки всех айтемов
  const fetchItems = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`${API_URL}/api/items`);
      console.log("Fetched items:", response.data);
      items.value = response.data;
      filterItemsData();
    } catch (err) {
      error.value = "Error fetching data";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Фильтрация айтемов
  const filterItemsData = () => {
    filteredItems.value = filterItems(items.value, searchQuery.value);
  };

  // Функция для загрузки конкретного айтема
  const fetchItemById = async (itemNo) => {
    loading.value = true;
    try {
      const response = await axios.get(`${API_URL}/api/items/card/${itemNo}`);
      selectedItem.value = response.data;
      isModalOpen.value = true;
    } catch (err) {
      error.value = "Error fetching item details";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Закрытие модального окна
  const closeModal = () => {
    isModalOpen.value = false;
    selectedItem.value = null;
  };

  // Следим за изменением строки поиска
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
    fetchItemById,
    selectedItem,
    isModalOpen,
    closeModal,
    filterItemsData,
  };
});
