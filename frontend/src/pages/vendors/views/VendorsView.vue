<script setup>
import { onMounted, ref } from "vue";
import { useVendorsStore } from "../stores/useVendors.js";
import VendorTable from "../components/VendorTable.vue";
import VendorModal from "../components/VendorModal.vue";
import VendorSearch from "../components/VendorSearch.vue";

const vendorsStore = useVendorsStore();
const isModalOpen = ref(false);

const openModal = () => (isModalOpen.value = true);
const closeModal = () => (isModalOpen.value = false);

const addVendor = async (vendorData) => {
  try {
    await vendorsStore.addVendor(vendorData);
    closeModal();
  } catch (error) {
    console.error("Error adding vendor", error);
  }
};

const deleteVendor = async (vendorNo) => {
  if (confirm("Are you sure you want to delete this vendor?")) {
    await vendorsStore.deleteVendor(vendorNo);
  }
};

onMounted(() => {
  vendorsStore.fetchVendors();
});
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <VendorSearch
      v-model:searchQuery="vendorsStore.searchQuery"
      @openModal="openModal"
    />

    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-500 rtl:text-right">
        <thead class="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Number
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Responsibility Center
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Location Code
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Phone
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Contact
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Currency Code
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Search Name
            </th>

            <th
              scope="col"
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <template v-if="vendorsStore.loading">
            <tr v-for="i in 5" :key="i">
              <td v-for="j in 9" :key="j" class="px-6 py-4">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
            </tr>
          </template>
          <template v-else>
            <VendorTable
              v-for="vendor in vendorsStore.filteredVendors"
              :key="vendor.no"
              :vendor="vendor"
              @delete="deleteVendor"
            />
          </template>
        </tbody>
      </table>
    </div>

    <VendorModal v-if="isModalOpen" @submit="addVendor" @close="closeModal" />
  </div>
</template>
