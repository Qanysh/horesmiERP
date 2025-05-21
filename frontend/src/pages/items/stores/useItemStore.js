import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";
import API_URL from "@/config/index.js";

export const useItemsStore = defineStore("item", () => {
  const items = ref([]);
  const filteredItems = ref([]);
  const searchQuery = ref("");
  const error = ref(null);
  const loading = ref(false);

  const fetchItems = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`${API_URL}/api/items`);
      items.value = response.data;
      filterItemsData();
    } catch (err) {
      error.value = "Error fetching items";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const addItem = async (itemData) => {
    try {
      await axios.post(`${API_URL}/api/items/create`, itemData);
      fetchItems();
    } catch (err) {
      error.value = "Error adding item";
      console.error(err);
    }
  };

  const deleteItem = async (item_no) => {
    try {
      await axios.delete(`${API_URL}/api/items/delete/${item_no}`);
      fetchItems();
    } catch (err) {
      error.value = "Error deleting item";
      console.error(err);
    }
  };

  const filterItemsData = () => {
    const lowerQuery = searchQuery.value.toLowerCase();

    filteredItems.value = items.value.filter((item) => {
      const itemName = item.name ? item.name.toLowerCase() : "";
      const itemNo = item.item_no ? item.item_no.toLowerCase() : "";
      return itemName.includes(lowerQuery) || itemNo.includes(lowerQuery);
    });
  };

  watch(searchQuery, filterItemsData);

  return {
    items,
    filteredItems,
    searchQuery,
    error,
    loading,
    fetchItems,
    addItem,
    deleteItem,
    filterItemsData,
  };
});
