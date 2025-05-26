import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";
import API_URL from "@/config/index.js";

export const usePurchaseHeadersStore = defineStore("purchaseHeader", () => {
  const purchaseHeaders = ref([]);
  const filteredPurchaseHeaders = ref([]);
  const selectedPurchaseHeader = ref(null);
  const purchaseLines = ref([]);
  const searchQuery = ref("");
  const error = ref(null);
  const loading = ref(false);
  const isModalOpen = ref(false);
  const isCreateModalOpen = ref(false);

  const fetchPurchaseHeaders = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`${API_URL}/api/purchaseHeaders`);
      purchaseHeaders.value = response.data;
      filterPurchaseHeadersData();
    } catch (err) {
      error.value = "Error fetching purchase headers";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const createPurchaseLine = async (lineData) => {
    try {
      // Validate required fields before sending
      if (!lineData.documentNo || !lineData.no || !lineData.quantity) {
        throw new Error("Missing required fields");
      }

      const response = await axios.post(
        `${API_URL}/api/purchaseLines/create`,
        lineData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      error.value =
        err.response?.data?.message || "Error creating purchase line";
      console.error("Create line error:", err.response?.data || err);
      throw err;
    }
  };

  const fetchPurchaseHeaderByNo = async (no) => {
    loading.value = true;
    try {
      const response = await axios.get(
        `${API_URL}/api/purchaseHeaders/card/${no}`
      );
      selectedPurchaseHeader.value = response.data;
      isModalOpen.value = true;

      // Загружаем все строки для этого заказа
      await fetchPurchaseLinesByHeaderNo(response.data.no);
    } catch (err) {
      error.value = "Error fetching purchase header or lines";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchPurchaseLinesByHeaderNo = async (no) => {
    loading.value = true;
    try {
      const response = await axios.get(`${API_URL}/api/purchaseLines`);
      const allLines = response.data;

      // Находим ВСЕ строки с этим documentNo
      const orderLines = allLines.filter((line) => line.documentNo === no);

      if (orderLines.length > 0) {
        // Для каждой найденной строки получаем детали
        const detailedLines = await Promise.all(
          orderLines.map(async (line) => {
            try {
              const detailedResponse = await axios.get(
                `${API_URL}/api/purchaseLines/card/${line.id}`
              );
              return detailedResponse.data;
            } catch (err) {
              console.error(`Error fetching line ${line.id}:`, err);
              return null;
            }
          })
        );
        // Фильтруем null (если были ошибки) и сохраняем все строки
        purchaseLines.value = detailedLines.filter((line) => line !== null);
      } else {
        purchaseLines.value = [];
      }
    } catch (err) {
      error.value = "Error fetching purchase lines by header no";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const deleteHeader = async (no) => {
    try {
      await axios.delete(`${API_URL}/api/purchaseHeaders/delete/${no}`);
      purchaseHeaders.value = purchaseHeaders.value.filter(
        (header) => header.no !== no
      );
      filterPurchaseHeadersData();
    } catch (err) {
      error.value = "Error deleting purchase header";
      console.error("Delete error:", err);
      throw err;
    }
  };

  const createHeader = async (headerData) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/purchaseHeaders/create`,
        headerData
      );
      purchaseHeaders.value.push(response.data.purchaseHeader);
      filterPurchaseHeadersData();
      return response.data;
    } catch (err) {
      error.value = "Error creating purchase header";
      console.error("Create error:", err);
      throw err;
    }
  };

  const printPurchaseOrder = (no) => {
    window.open(`${API_URL}/api/reports/purchaseOrder/${no}`, "_blank");
  };

  const filterPurchaseHeadersData = () => {
    filteredPurchaseHeaders.value = purchaseHeaders.value.filter((header) => {
      const no = header.no || "";
      const vendorName = header.buyFromVendorName || "";
      const search = searchQuery.value.toLowerCase();

      return (
        no.toLowerCase().includes(search) ||
        vendorName.toLowerCase().includes(search)
      );
    });
  };

  const closeModal = () => {
    isModalOpen.value = false;
    selectedPurchaseHeader.value = null;
    purchaseLines.value = [];
  };

  const openCreateModal = () => {
    isCreateModalOpen.value = true;
  };

  const closeCreateModal = () => {
    isCreateModalOpen.value = false;
  };

  watch(searchQuery, filterPurchaseHeadersData);

  return {
    purchaseHeaders,
    filteredPurchaseHeaders,
    selectedPurchaseHeader,
    purchaseLines,
    searchQuery,
    error,
    loading,
    isModalOpen,
    isCreateModalOpen,
    fetchPurchaseHeaders,
    fetchPurchaseHeaderByNo,
    printPurchaseOrder,
    filterPurchaseHeadersData,
    closeModal,
    deleteHeader,
    createHeader,
    createPurchaseLine,
    openCreateModal,
    closeCreateModal,
  };
});
