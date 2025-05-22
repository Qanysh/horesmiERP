import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";
import API_URL from "@/config/index.js";

export const useSalesOrdersStore = defineStore("salesOrder", () => {
  const salesOrders = ref([]);
  const filteredSalesOrders = ref([]);
  const selectedSalesOrder = ref(null);
  const salesLines = ref([]);
  const searchQuery = ref("");
  const error = ref(null);
  const loading = ref(false);
  const isModalOpen = ref(false);
  const isCreateModalOpen = ref(false);

  const fetchSalesOrders = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`${API_URL}/api/salesOrders`);
      salesOrders.value = response.data;
      filterSalesOrdersData();
    } catch (err) {
      error.value = "Error fetching sales orders";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchSalesOrderByNo = async (no) => {
    loading.value = true;
    try {
      // Получаем данные заказа
      const orderResponse = await axios.get(
        `${API_URL}/api/salesOrders/card/${no}`
      );
      selectedSalesOrder.value = orderResponse.data;
      isModalOpen.value = true;

      // Получаем все строки для этого заказа
      await fetchSalesLinesByOrderNo(no);
    } catch (err) {
      error.value = "Error fetching sales order or lines";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchSalesLinesByOrderNo = async (orderNo) => {
    loading.value = true;
    try {
      // Получаем все строки заказов
      const response = await axios.get(`${API_URL}/api/salesLines`);
      const allLines = response.data;

      // Фильтруем строки по documentNo (должен совпадать с no заказа)
      salesLines.value = allLines.filter((line) => line.documentNo === orderNo);

      // Если не нашли строки - просто оставляем пустой массив
      if (salesLines.value.length === 0) {
        console.warn(`No lines found for order ${orderNo}`);
      }
    } catch (err) {
      error.value = "Error fetching sales lines";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const deleteOrder = async (no) => {
    try {
      await axios.delete(`${API_URL}/api/salesOrders/delete/${no}`);
      salesOrders.value = salesOrders.value.filter((order) => order.no !== no);
      filterSalesOrdersData();
    } catch (err) {
      error.value = "Error deleting sales order";
      console.error("Delete error:", err);
      throw err;
    }
  };

  const createOrder = async (orderData) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/salesOrders/create`,
        orderData
      );
      salesOrders.value.push(response.data.salesOrder);
      filterSalesOrdersData();
      return response.data;
    } catch (err) {
      error.value = "Error creating sales order";
      console.error("Create error:", err);
      throw err;
    }
  };

  const createSalesLine = async (lineData) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/saleslines/create`,
        lineData
      );
      return response.data;
    } catch (err) {
      error.value = "Error creating sales line";
      console.error("Create sales line error:", err);
      throw err;
    }
  };

  const filterSalesOrdersData = () => {
    filteredSalesOrders.value = salesOrders.value.filter((order) => {
      const no = order.no || "";
      const customerName = order.sellToCustomerName || "";
      const search = searchQuery.value.toLowerCase();

      return (
        no.toLowerCase().includes(search) ||
        customerName.toLowerCase().includes(search)
      );
    });
  };

  const printSalesOrder = (no) => {
    window.open(`${API_URL}/api/reports/salesOrder/${no}`, "_blank");
  };

  const closeModal = () => {
    isModalOpen.value = false;
    selectedSalesOrder.value = null;
    salesLines.value = [];
  };

  const openCreateModal = () => {
    isCreateModalOpen.value = true;
  };

  const closeCreateModal = () => {
    isCreateModalOpen.value = false;
  };

  watch(searchQuery, filterSalesOrdersData);

  return {
    salesOrders,
    filteredSalesOrders,
    selectedSalesOrder,
    salesLines,
    searchQuery,
    error,
    loading,
    isModalOpen,
    isCreateModalOpen,
    fetchSalesOrders,
    fetchSalesOrderByNo,
    filterSalesOrdersData,
    closeModal,
    deleteOrder,
    createOrder,
    createSalesLine,
    openCreateModal,
    closeCreateModal,
    printSalesOrder,
  };
});
