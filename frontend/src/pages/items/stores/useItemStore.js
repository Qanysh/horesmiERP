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

  const updateItem = async (itemData) => {
    try {
      const payload = {
        item_no: itemData.item_no,
        description: itemData.description,
        description2: itemData.description2,
        type: itemData.type,
        inventory: (itemData.inventory ?? 0).toString(),
        unitCost: (itemData.unitCost ?? 0).toString(),
        unitPrice: (itemData.unitPrice ?? 0).toString(),
        vendorNo: itemData.vendorNo,
        itemCategoryCode: itemData.itemCategoryCode,
      };

      await axios.put(
        `${API_URL}/api/items/update/${itemData.item_no}`,
        payload
      );
      await fetchItems();
    } catch (err) {
      error.value = "Error updating item";
      console.error(err);
    }
  };

  const filterItemsData = () => {
    const lowerQuery = searchQuery.value.toLowerCase();

    filteredItems.value = items.value.filter((item) => {
      const description = item.description
        ? item.description.toLowerCase()
        : "";
      const itemNo = item.item_no ? item.item_no.toLowerCase() : "";
      return description.includes(lowerQuery) || itemNo.includes(lowerQuery);
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
    updateItem,
  };
});
