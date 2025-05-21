<script setup>
import { ref } from "vue";

const emit = defineEmits(["submit", "close"]);

const item = ref({
  item_no: "",
  name: "",
  description: "",
  unitPrice: "",
  inventory: "",
});

const handleSubmit = () => {
  emit("submit", item.value);
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
          <h2 class="text-xl font-semibold">Add Item</h2>
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
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Item Number</label
            >
            <input
              v-model="item.item_no"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Type</label>
            <input
              v-model="item.type"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div class="space-y-2 md:col-span-2">
            <label class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <textarea
              v-model="item.description"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            ></textarea>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Unit Price</label
            >
            <input
              v-model.number="item.unitPrice"
              type="number"
              step="0.01"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Inventory</label
            >
            <input
              v-model.number="item.inventory"
              type="number"
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
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
