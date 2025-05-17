<script setup>
defineProps({
  isOpen: Boolean,
  item: Object,
  closeModal: Function,
});
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div
      class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
    >
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Item Details</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
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

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <h3 class="font-medium text-gray-700">Item Number</h3>
              <p class="mt-1">{{ item?.item_no }}</p>
            </div>
            <div>
              <h3 class="font-medium text-gray-700">Type</h3>
              <p class="mt-1">{{ item?.type }}</p>
            </div>
            <div>
              <h3 class="font-medium text-gray-700">Description</h3>
              <p class="mt-1">{{ item?.description }}</p>
            </div>
            <div>
              <h3 class="font-medium text-gray-700">inventory</h3>
              <p class="mt-1">{{ item?.inventory }}</p>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <h3 class="font-medium text-gray-700">unitCost</h3>
              <p class="mt-1">{{ item?.unitCost }}</p>
            </div>
            <div>
              <h3 class="font-medium text-gray-700">unitPrice</h3>
              <p class="mt-1">{{ item?.unitPrice }}</p>
            </div>
            <div>
              <h3 class="font-medium text-gray-700">Quantity</h3>
              <p class="mt-1">{{ item?.quantity }}</p>
            </div>
            <div>
              <h3 class="font-medium text-gray-700">vendorNo</h3>
              <p class="mt-1">${{ item?.vendorNo }}</p>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            @click="closeModal"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
