<script setup>
import { onMounted, ref } from "vue";
import { usePurchaseOrderStore } from "../stores/usePurchaseOrders";
import OrdersTable from "../components/OrdersTable.vue";
import OrdersModal from "../components/OrdersModal.vue";
import OrdersSearch from "../components/OrdersSearch.vue";

const usePurchaseOrder = usePurchaseOrderStore();

const selectedOrder = ref(null);
const isModalOpen = ref(false);

const openModal = (order = null) => {
  selectedOrder.value = order;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedOrder.value = null;
};

const deleteOrders = async (no) => {
  if (confirm("Are you sure you want to delete this order?")) {
    await usePurchaseOrder.deleteOrders(no);
  }
};

const handleCreateOrder = async (orderData) => {
  try {
    await usePurchaseOrder.createOrder(orderData);
    closeModal();
  } catch (error) {
    alert("Failed to create purchase order: " + error.message);
  }
};

onMounted(() => {
  usePurchaseOrder.fetchOrders();
});
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <OrdersSearch
      v-model:searchQuery="usePurchaseOrder.searchQuery"
      @openModal="openModal"
    />

    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-500 rtl:text-right">
        <thead class="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th class="px-6 py-3">Number</th>
            <th class="px-6 py-3">Vendor No</th>
            <th class="px-6 py-3">Address Code</th>
            <th class="px-6 py-3">Vendor Name</th>
            <th class="px-6 py-3">Authorization No</th>
            <th class="px-6 py-3">Post Code</th>
            <th class="px-6 py-3">Country</th>
            <th class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <template v-if="usePurchaseOrder.loading">
            <tr v-for="i in 5" :key="i">
              <td v-for="j in 8" :key="j" class="px-6 py-4">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
            </tr>
          </template>
          <template v-else>
            <OrdersTable
              v-for="order in usePurchaseOrder.filteredOrders"
              :key="order.no"
              :order="order"
              @delete="deleteOrders"
              @view="openModal"
            />
          </template>
        </tbody>
      </table>
    </div>

    <OrdersModal
      v-if="isModalOpen"
      @submit="handleCreateOrder"
      @close="closeModal"
    />
  </div>
</template>
