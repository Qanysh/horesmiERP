// src/stores/useVendors.js
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

  const fetchVendors = async () => {
    loading.value = true;
    try {
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

  const addVendor = async (vendorData) => {
    try {
      await axios.post(`${API_URL}/api/vendors/create`, vendorData);
      fetchVendors();
    } catch (err) {
      error.value = "Error adding vendor";
      console.error(err);
    }
  };

  const deleteVendor = async (vendorNo) => {
    try {
      await axios.delete(`${API_URL}/api/vendors/delete/${vendorNo}`);
      fetchVendors();
    } catch (err) {
      error.value = "Error deleting vendor";
      console.error(err);
    }
  };

  const filterVendorsData = () => {
    filteredVendors.value = vendors.value.filter((vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  };

  watch(searchQuery, filterVendorsData);

  return {
    vendors,
    filteredVendors,
    searchQuery,
    error,
    loading,
    fetchVendors,
    addVendor,
    deleteVendor,
    filterVendorsData,
  };
});
