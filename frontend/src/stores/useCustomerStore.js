import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import axios from "axios";
import API_URL from "@/config/index.js";

export const useCustomerStore = defineStore("customer", () => {
  const customers = ref([]);
  const searchQuery = ref("");
  const loading = ref(false);
  const error = ref(null);

  const filteredCustomers = computed(() => {
    return customers.value.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

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

  const createCustomer = async (customerData) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/customers/create`,
        customerData
      );
      customers.value.push(response.data.customer);
    } catch (err) {
      error.value = err.response?.data?.error || "Error adding customer";
      console.error(
        "Error adding customer:",
        err.response?.data || err.message
      );
    }
  };

  const deleteCustomer = async (customerNo) => {
    try {
      await axios.delete(`${API_URL}/api/customers/delete/${customerNo}`);
      customers.value = customers.value.filter(
        (customer) => customer.no !== customerNo
      );
    } catch (err) {
      error.value = err.response?.data?.error || "Error deleting customer";
      console.error(
        "Error deleting customer:",
        err.response?.data || err.message
      );
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
    createCustomer,
    deleteCustomer,
  };
});
