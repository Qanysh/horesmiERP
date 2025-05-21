import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import API_URL from "@/config/index.js";

export const usePurchaseOrderStore = defineStore("purchaseOrder", () => {
  const orders = ref([]);
  const error = ref(null);
  const loading = ref(false);
  const searchQuery = ref("");

  const fetchOrders = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`${API_URL}/api/purchaseOrders`);
      orders.value = response.data;
    } catch (err) {
      error.value = "Error fetching orders";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const deleteOrders = async (no) => {
    try {
      await axios.delete(`${API_URL}/api/purchaseOrders/delete/${no}`);
      await fetchOrders();
    } catch (err) {
      error.value = "Error deleting order";
      console.error(err);
    }
  };

  const createOrder = async (orderData) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/purchaseOrders/create`,
        orderData
      );
      await fetchOrders(); // Refresh the list after creation
      return response.data;
    } catch (err) {
      error.value = "Error creating purchase order";
      console.error("Create error:", err);
      throw err;
    }
  };

  const filteredOrders = computed(() => {
    if (!searchQuery.value.trim()) return orders.value;
    return orders.value.filter((order) =>
      order.no.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  return {
    orders,
    filteredOrders,
    searchQuery,
    error,
    loading,
    fetchOrders,
    deleteOrders,
    createOrder,
  };
});
