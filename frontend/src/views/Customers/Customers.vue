<script setup>
import { ref, onMounted } from "vue";
import { useCustomerStore } from "@/stores/useCustomerStore";
import CustomerTable from "@/components/tables/Customer/CustomerTableContent.vue";

const customerStore = useCustomerStore();
const isModalOpen = ref(false);
const newCustomer = ref({
  no: 0,
  name: "",
  balance: 0,
  creditLimit: 0,
  totalSales: 0,
  costs: 0,
  address: "",
  country: "",
  city: "",
  phone: "",
  email: "",
  contactName: "",
});

const openModal = () => (isModalOpen.value = true);
const closeModal = () => (isModalOpen.value = false);

const addCustomer = async () => {
  console.log("New customer data before sending:", newCustomer.value);
  try {
    await customerStore.createCustomer(newCustomer.value);
    closeModal();
    customerStore.fetchCustomers();
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
  <div class="container mx-auto">
    <div class="flex justify-between items-center mb-4">
      <input
        v-model="customerStore.searchQuery"
        type="text"
        placeholder="Search by email or name"
        class="w-full rounded-md border px-4 py-2 text-gray-700"
      />
    </div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-semibold">Customer</h1>
      <button
        @click="openModal"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Customer
      </button>
    </div>

    <div class="relative overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-500 rtl:text-right">
        <thead class="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" class="px-6 py-3">Number</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Balance</th>
            <th scope="col" class="px-6 py-3">Credit limit</th>
            <th scope="col" class="px-6 py-3">Total sales</th>
            <th scope="col" class="px-6 py-3">Costs</th>
            <th scope="col" class="px-6 py-3">Address</th>
            <th scope="col" class="px-6 py-3">Country</th>
            <th scope="col" class="px-6 py-3">City</th>
            <th scope="col" class="px-6 py-3">Phone</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Contact name</th>
            <th scope="col" class="px-6 py-3">X</th>
          </tr>
        </thead>

        <template v-if="customerStore.loading">
          <tr v-for="i in 5" :key="i" class="animate-pulse">
            <td v-for="j in 12" :key="j" class="px-6 py-3">
              <div class="h-4 bg-gray-200 rounded"></div>
            </td>
          </tr>
        </template>

        <template v-else>
          <CustomerTable
            v-for="customer in customerStore.filteredCustomers"
            :key="customer.id"
            :customer="customer"
            @delete="deleteCustomer(customer.no)"
          />
        </template>
      </table>
    </div>

    <!-- Modal for Adding Customer -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-lg font-semibold mb-4">Add Customer</h2>
        <form @submit.prevent="addCustomer">
          <input
            v-model="newCustomer.no"
            placeholder="Number"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newCustomer.name"
            placeholder="Name"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newCustomer.balance"
            placeholder="Balance"
            type="number"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newCustomer.creditLimit"
            placeholder="Credit Limit"
            type="number"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newCustomer.totalSales"
            placeholder="Total Sales"
            type="number"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newCustomer.costs"
            placeholder="Costs"
            type="number"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newCustomer.address"
            placeholder="Address"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newCustomer.country"
            placeholder="Country"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newCustomer.city"
            placeholder="City"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newCustomer.phone"
            placeholder="Phone"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newCustomer.email"
            placeholder="Email"
            type="email"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
            v-model="newCustomer.contactName"
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
