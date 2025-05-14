<script setup>
import { ref, onMounted } from "vue";
import { useVendorsStore } from "@/stores/useVendors";
import VendorsTableContent from "@/components/tables/Vendors/VendorsTableContent.vue";

const vendorsStore = useVendorsStore();
const isModalOpen = ref(false);
const newVendor = ref({
  no: "",
  name: "",
  balance: "",
  creditLimit: "",
  totalSales: "",
  costs: "",
  address: "",
  country: "",
  city: "",
  phone: "",
  email: "",
  contactName: "",
});

const openModal = () => (isModalOpen.value = true);
const closeModal = () => (isModalOpen.value = false);

const addVendor = async () => {
  await vendorsStore.addVendor(newVendor.value);
  closeModal();
};

onMounted(() => {
  vendorsStore.fetchVendors();
});
</script>

<template>
  <div class="container mx-auto">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-semibold">Vendors</h1>
      <button
        @click="openModal"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Vendor
      </button>
    </div>

    <div class="relative overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-500 rtl:text-right">
        <thead class="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th class="px-6 py-3">Number</th>
            <th class="px-6 py-3">Name</th>
            <th class="px-6 py-3">Balance</th>
            <th class="px-6 py-3">Credit limit</th>
            <th class="px-6 py-3">Total sales</th>
            <th class="px-6 py-3">Costs</th>
            <th class="px-6 py-3">Address</th>
            <th class="px-6 py-3">Country</th>
            <th class="px-6 py-3">City</th>
            <th class="px-6 py-3">Phone</th>
            <th class="px-6 py-3">Email</th>
            <th class="px-6 py-3">Contact name</th>
            <th class="px-6 py-3">X</th>
          </tr>
        </thead>

        <template v-if="vendorsStore.loading">
          <tr v-for="i in 5" :key="i" class="animate-pulse">
            <td v-for="j in 13" :key="j" class="px-6 py-3">
              <div class="h-4 bg-gray-200 rounded"></div>
            </td>
          </tr>
        </template>

        <template v-else>
          <VendorsTableContent
            v-for="vendor in vendorsStore.filteredVendors"
            :key="vendor.no"
            :item="vendor"
            :deleteVendor="vendorsStore.deleteVendor"
          />
        </template>
      </table>
    </div>

    <!-- Modal for Adding a Vendor -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-lg font-semibold mb-4">Add Vendor</h2>
        <form @submit.prevent="addVendor">
          <input
            v-model="newVendor.no"
            placeholder="Number"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newVendor.name"
            placeholder="Name"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newVendor.balance"
            placeholder="Balance"
            type="number"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newVendor.creditLimit"
            placeholder="Credit Limit"
            type="number"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newVendor.totalSales"
            placeholder="Total Sales"
            type="number"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newVendor.costs"
            placeholder="Costs"
            type="number"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newVendor.address"
            placeholder="Address"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newVendor.country"
            placeholder="Country"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newVendor.city"
            placeholder="City"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newVendor.phone"
            placeholder="Phone"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newVendor.email"
            placeholder="Email"
            type="email"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newVendor.contactName"
            placeholder="Contact Name"
            class="w-full mb-2 p-2 border rounded"
          />
          <div class="flex justify-end">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
