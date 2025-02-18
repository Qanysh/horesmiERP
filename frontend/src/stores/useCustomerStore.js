import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import axios from "axios";
import API_URL from "@/config/index.js";

export const useCustomerStore = defineStore("customer", () => {
  const customers = ref([]);
  const filteredCustomers = computed(() => {
    return customers.value.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  const searchQuery = ref("");
  const loading = ref(false);
  const error = ref(null);

  const fetchCustomers = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`${API_URL}/api/customers`);
      customers.value = response.data;
    } catch (err) {
      error.value = "Error fetching customer data";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  watch(searchQuery, () => {});

  return {
    customers,
    filteredCustomers,
    searchQuery,
    loading,
    error,
    fetchCustomers,
  };
});
