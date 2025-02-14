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
      const response = await axios.get(`${API_URL}/api/customers`); // Corrected to /customers
      customers.value = response.data;
    } catch (err) {
      error.value = "Error fetching customer data";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const createCustomer = async (newCustomer) => {
    loading.value = true;
    try {
      const response = await axios.post(
        `${API_URL}/api/customers`,
        newCustomer
      ); // Corrected to /customers
      customers.value.push(response.data.customer);
      return response.data.message;
    } catch (err) {
      error.value = "Error creating customer";
      console.error(err);
      throw new Error("Error creating customer");
    } finally {
      loading.value = false;
    }
  };

  const updateCustomer = async (customerNo, updatedCustomer) => {
    loading.value = true;
    try {
      const response = await axios.put(
        `${API_URL}/api/customers/${customerNo}`,
        updatedCustomer
      ); // Corrected to /customers/:id
      const index = customers.value.findIndex(
        (customer) => customer.no === customerNo
      );
      if (index !== -1) {
        customers.value[index] = response.data.customer;
      }
      return response.data.message;
    } catch (err) {
      error.value = "Error updating customer";
      console.error(err);
      throw new Error("Error updating customer");
    } finally {
      loading.value = false;
    }
  };

  const deleteCustomer = async (customerNo) => {
    loading.value = true;
    try {
      const response = await axios.delete(
        `${API_URL}/api/customers/${customerNo}`
      ); // Corrected to /customers/:id
      customers.value = customers.value.filter(
        (customer) => customer.no !== customerNo
      );
      return response.data.message;
    } catch (err) {
      error.value = "Error deleting customer";
      console.error(err);
      throw new Error("Error deleting customer");
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
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
});
