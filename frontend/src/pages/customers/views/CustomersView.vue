<script setup>
import { ref, onMounted } from "vue";
import { useCustomerStore } from "../stores/useCustomerStore";
import CustomerTable from "../components/CustomerTable.vue";
import CustomerModal from "../components/CustomerModal.vue";
import CustomerSearch from "../components/CustomerSearch.vue";

const customerStore = useCustomerStore();
const isModalOpen = ref(false);

const openModal = () => (isModalOpen.value = true);
const closeModal = () => (isModalOpen.value = false);

const addCustomer = async (customerData) => {
  try {
    await customerStore.createCustomer(customerData);
    closeModal();
  } catch (error) {
    console.error("Error adding customer", error);
  }
};

const deleteCustomer = async (customerNo) => {
  if (confirm("Are you sure you want to delete this customer?")) {
    await customerStore.deleteCustomer(customerNo);
  }
};

onMounted(() => {
  customerStore.fetchCustomers();
});
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <CustomerSearch
      v-model:searchQuery="customerStore.searchQuery"
      @openModal="openModal"
    />

    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-500 rtl:text-right">
        <thead class="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" class="px-6 py-3">Number</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Responsibility center</th>
            <th scope="col" class="px-6 py-3">Location code</th>
            <th scope="col" class="px-6 py-3">Phone</th>
            <th scope="col" class="px-6 py-3">Contact</th>
            <th scope="col" class="px-6 py-3">Salesperson code</th>
            <th scope="col" class="px-6 py-3">Credit limit lcy</th>
            <th
              scope="col"
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>

        <template v-if="customerStore.loading">
          <tr v-for="i in 5" :key="i" class="animate-pulse">
            <td v-for="j in 9" :key="j" class="px-6 py-3">
              <div class="h-4 bg-gray-200 rounded"></div>
            </td>
          </tr>
        </template>

        <template v-else>
          <CustomerTable
            v-for="customer in customerStore.filteredCustomers"
            :key="customer.id"
            :customer="customer"
            @delete="deleteCustomer(customer.customer_no)"
          />
        </template>
      </table>
    </div>

    <CustomerModal
      v-if="isModalOpen"
      @submit="addCustomer"
      @close="closeModal"
    />
  </div>
</template>
