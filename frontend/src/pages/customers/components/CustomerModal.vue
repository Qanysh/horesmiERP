<script setup>
import { ref, watch, toRefs } from "vue";

const emit = defineEmits(["submit", "close"]);
const props = defineProps({
  customerData: Object,
});

const customer = ref({
  customer_no: "",
  name: "",
  responsibility_center: "",
  location_code: "",
  phone_no: "",
  contact: "",
  salesperson_code: "",
  credit_limit_lcy: 0,
});

watch(
  () => props.customerData,
  (newVal) => {
    if (newVal) {
      customer.value = { ...newVal };
    } else {
      customer.value = {
        customer_no: "",
        name: "",
        responsibility_center: "",
        location_code: "",
        phone_no: "",
        contact: "",
        salesperson_code: "",
        credit_limit_lcy: 0,
      };
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  emit("submit", customer.value);
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
          <h2 class="text-xl font-semibold">Customer</h2>
          <button
            @click="handleClose"
            class="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form
          @submit.prevent="handleSubmit"
          class="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Customer Number</label
            >
            <input
              v-model="customer.customer_no"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="customer.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Responsibility Center</label
            >
            <input
              v-model="customer.responsibility_center"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Location Code</label
            >
            <input
              v-model="customer.location_code"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Phone</label>
            <input
              v-model="customer.phone_no"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Contact</label
            >
            <input
              v-model="customer.contact"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div class="space-y-2 md:col-span-2">
            <label class="block text-sm font-medium text-gray-700"
              >Salesperson Code</label
            >
            <input
              v-model="customer.salesperson_code"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Credit Limit (LCY)</label
            >
            <input
              v-model.number="customer.credit_limit_lcy"
              type="number"
              min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
