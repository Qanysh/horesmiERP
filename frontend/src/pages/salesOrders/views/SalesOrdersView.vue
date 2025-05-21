<script setup>
import { onMounted, ref } from "vue";
import { useSalesOrdersStore } from "@/pages/salesOrders/store/useSalesOrdersStore";
import SalesOrderTable from "@/pages/salesOrders/components/SalesOrderTable.vue";
import SalesOrderSearch from "@/pages/salesOrders/components/SalesOrderSearch.vue";
import SalesOrderCardModal from "@/pages/salesOrders/components/SalesOrderCardModal.vue";
import SalesOrdersModal from "@/pages/salesOrders/components/SalesOrdersModal.vue";

const salesOrdersStore = useSalesOrdersStore();

onMounted(() => {
  salesOrdersStore.fetchSalesOrders();
});

const openCard = (no) => {
  salesOrdersStore.fetchSalesOrderByNo(no);
};

const deleteOrder = async (no) => {
  if (confirm("Are you sure you want to delete this sales order?")) {
    try {
      await salesOrdersStore.deleteOrder(no);
    } catch (error) {
      alert("Failed to delete sales order");
    }
  }
};

const handleCreateOrder = async (orderData) => {
  try {
    const response = await salesOrdersStore.createOrder(orderData);
    if (response.message === "SalesOrder created successfully") {
      salesOrdersStore.closeCreateModal();
    }
  } catch (error) {
    alert("Failed to create sales order: " + error.message);
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <SalesOrderSearch
      v-model:searchQuery="salesOrdersStore.searchQuery"
      @openModal="salesOrdersStore.openCreateModal"
    />

    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-500 rtl:text-right">
        <thead class="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th class="px-6 py-3">No</th>
            <th class="px-6 py-3">Customer</th>
            <th class="px-6 py-3">Description</th>
            <th class="px-6 py-3">Order Date</th>
            <th class="px-6 py-3">Due Date</th>
            <th class="px-6 py-3">Status</th>
            <th class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <template v-if="salesOrdersStore.loading">
            <tr v-for="i in 5" :key="i">
              <td v-for="j in 7" :key="j" class="px-6 py-4">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
            </tr>
          </template>
          <template v-else>
            <SalesOrderTable
              v-for="order in salesOrdersStore.filteredSalesOrders"
              :key="order.no"
              :order="order"
              @open-card="openCard"
              @delete="deleteOrder"
            />
          </template>
        </tbody>
      </table>
    </div>

    <SalesOrderCardModal
      v-if="salesOrdersStore.isModalOpen"
      :order="salesOrdersStore.selectedSalesOrder"
      :lines="salesOrdersStore.salesLines"
      @close="salesOrdersStore.closeModal"
    />

    <SalesOrdersModal
      v-if="salesOrdersStore.isCreateModalOpen"
      @submit="handleCreateOrder"
      @close="salesOrdersStore.closeCreateModal"
    />
  </div>
</template>
