<script setup>
import { onMounted, ref } from "vue";
import { usePurchaseHeadersStore } from "@/pages/purchaseHeaders/store/usePurchaseHeadersStore";
import PurchaseHeaderTable from "@/pages/purchaseHeaders/components/PurchaseHeaderTable.vue";
import PurchaseHeaderSearch from "@/pages/purchaseHeaders/components/PurchaseHeaderSearch.vue";
import PurchaseHeaderCardModal from "@/pages/purchaseHeaders/components/PurchaseHeaderCardModal.vue";
import PurchaseHeadersModal from "@/pages/purchaseHeaders/components/PurchaseHeadersModal.vue";

const purchaseHeadersStore = usePurchaseHeadersStore();

onMounted(() => {
  purchaseHeadersStore.fetchPurchaseHeaders();
});

const openCard = (no) => {
  purchaseHeadersStore.fetchPurchaseHeaderByNo(no);
};

const deleteHeader = async (no) => {
  if (confirm("Are you sure you want to delete this purchase header?")) {
    try {
      await purchaseHeadersStore.deleteHeader(no);
    } catch (error) {
      alert("Failed to delete purchase header");
    }
  }
};

const handleCreateHeader = async (headerData) => {
  try {
    const response = await purchaseHeadersStore.createHeader(headerData);
    if (response.message === "PurchaseHeader created successfully") {
      purchaseHeadersStore.closeCreateModal();
    }
  } catch (error) {
    alert("Failed to create purchase header: " + error.message);
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <PurchaseHeaderSearch
      v-model:searchQuery="purchaseHeadersStore.searchQuery"
      @openModal="purchaseHeadersStore.openCreateModal"
    />

    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-500 rtl:text-right">
        <thead class="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th class="px-6 py-3">No</th>
            <th class="px-6 py-3">Vendor</th>
            <th class="px-6 py-3">Description</th>
            <th class="px-6 py-3">Order Date</th>
            <th class="px-6 py-3">Due Date</th>
            <th class="px-6 py-3">Status</th>
            <th class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <template v-if="purchaseHeadersStore.loading">
            <tr v-for="i in 5" :key="i">
              <td v-for="j in 7" :key="j" class="px-6 py-4">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
            </tr>
          </template>
          <template v-else>
            <PurchaseHeaderTable
              v-for="header in purchaseHeadersStore.filteredPurchaseHeaders"
              :key="header.no"
              :header="header"
              @open-card="openCard"
              @delete="deleteHeader"
            />
          </template>
        </tbody>
      </table>
    </div>

    <PurchaseHeaderCardModal
      v-if="purchaseHeadersStore.isModalOpen"
      :header="purchaseHeadersStore.selectedPurchaseHeader"
      @print="purchaseHeadersStore.printPurchaseOrder"
      @close="purchaseHeadersStore.closeModal"
    />

    <PurchaseHeadersModal
      v-if="purchaseHeadersStore.isCreateModalOpen"
      @submit="handleCreateHeader"
      @close="purchaseHeadersStore.closeCreateModal"
    />
  </div>
</template>
