<script setup>
import { ref } from "vue";

const emit = defineEmits(["submit", "close"]);

const order = ref({
  no: "",
  sellToCustomerNo: "",
  sellToCustomerName: "",
  postingDescription: "",
  sellToAddress: "",
  sellToCity: "",
  sellToPostCode: "",
  sellToCountryRegionCode: "US",
  sellToPhoneNo: "",
  sellToEmail: "",
  status: "Open",
  orderDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
});

const handleSubmit = () => {
  emit("submit", { ...order.value });
};

const handleClose = () => {
  emit("close");
};
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div
      class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
    >
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Add Sales Order</h2>
          <button
            @click="handleClose"
            class="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form
          @submit.prevent="handleSubmit"
          class="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <!-- Order Number -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Order Number</label
            >
            <input
              v-model="order.no"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <!-- Customer No -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Customer No</label
            >
            <input
              v-model="order.sellToCustomerNo"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <!-- Customer Name -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Customer Name</label
            >
            <input
              v-model="order.sellToCustomerName"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <!-- Description -->
          <div class="space-y-2 md:col-span-2">
            <label class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <textarea
              v-model="order.postingDescription"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            ></textarea>
          </div>

          <!-- Order Date -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Order Date</label
            >
            <input
              v-model="order.orderDate"
              type="date"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <!-- Due Date -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Due Date</label
            >
            <input
              v-model="order.dueDate"
              type="date"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <!-- Status -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Status</label
            >
            <select
              v-model="order.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="Open">Open</option>
              <option value="Released">Released</option>
              <option value="Pending Approval">Pending Approval</option>
            </select>
          </div>

          <!-- Customer Email -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Customer Email</label
            >
            <input
              v-model="order.sellToEmail"
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <!-- Submit & Cancel -->
          <div class="flex justify-end space-x-3 md:col-span-2 pt-4">
            <button
              type="button"
              @click="handleClose"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Sales Order
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
