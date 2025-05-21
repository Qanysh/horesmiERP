<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div
      class="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-y-auto"
    >
      <div class="p-6 space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-800">
            Purchase Order: {{ header.no }}
          </h2>
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

        <!-- Accordion: Header Info -->
        <div>
          <button
            @click="isHeaderOpen = !isHeaderOpen"
            class="flex items-center text-lg font-semibold text-blue-600 hover:underline mb-2"
          >
            <span>{{ isHeaderOpen ? "▼" : "▶" }} Header Details</span>
          </button>
          <div v-show="isHeaderOpen" class="space-y-4 text-sm">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <p><strong>Vendor:</strong> {{ header.buyFromVendorName }}</p>
              <p>
                <strong>Order Date:</strong> {{ formatDate(header.orderDate) }}
              </p>
              <p><strong>Status:</strong> {{ header.status }}</p>
              <p><strong>Due Date:</strong> {{ formatDate(header.dueDate) }}</p>
              <p><strong>Currency:</strong> {{ header.currencyCode }}</p>
              <p>
                <strong>Vendor Invoice No:</strong> {{ header.vendorInvoiceNo }}
              </p>
              <p>
                <strong>Payment Terms:</strong> {{ header.paymentTermsCode }}
              </p>
              <p>
                <strong>Payment Method:</strong> {{ header.paymentMethodCode }}
              </p>
              <p><strong>Assigned User:</strong> {{ header.assignedUserId }}</p>
            </div>
          </div>
        </div>

        <!-- Accordion: Purchase Lines -->
        <div>
          <button
            @click="isLinesOpen = !isLinesOpen"
            class="flex items-center text-lg font-semibold text-blue-600 hover:underline mb-2"
          >
            <span
              >{{ isLinesOpen ? "▼" : "▶" }} Purchase Lines ({{
                purchaseLines.length
              }})</span
            >
          </button>
          <div v-show="isLinesOpen">
            <div v-if="purchaseLines.length === 0" class="text-gray-500">
              No lines found for this order.
            </div>
            <table v-else class="min-w-full border text-sm mt-2">
              <thead class="bg-gray-100 text-left">
                <tr>
                  <th class="px-3 py-2 border">Line No</th>
                  <th class="px-3 py-2 border">Item No</th>
                  <th class="px-3 py-2 border">Description</th>
                  <th class="px-3 py-2 border">Quantity</th>
                  <th class="px-3 py-2 border">Unit</th>
                  <th class="px-3 py-2 border">Unit Cost</th>
                  <th class="px-3 py-2 border">Unit Price</th>
                  <th class="px-3 py-2 border">Line Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="line in purchaseLines" :key="line.id">
                  <td class="px-3 py-2 border">{{ line.lineNo }}</td>
                  <td class="px-3 py-2 border">{{ line.no }}</td>
                  <td class="px-3 py-2 border">
                    {{ line.description }}
                    <div v-if="line.description2" class="text-xs text-gray-500">
                      {{ line.description2 }}
                    </div>
                  </td>
                  <td class="px-3 py-2 border">{{ line.quantity }}</td>
                  <td class="px-3 py-2 border">{{ line.unitOfMeasureCode }}</td>
                  <td class="px-3 py-2 border">{{ line.directUnitCost }}</td>
                  <td class="px-3 py-2 border">{{ line.unitPriceLCY }}</td>
                  <td class="px-3 py-2 border">{{ line.lineAmount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-end gap-4 mt-6">
          <button
            @click="handlePrint"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Print
          </button>
          <button
            @click="handleClose"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { usePurchaseHeadersStore } from "@/pages/purchaseHeaders/store/usePurchaseHeadersStore";

const props = defineProps({
  header: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["print", "close"]);

const store = usePurchaseHeadersStore();
const purchaseLines = computed(() => store.purchaseLines);

// Состояние для открытия/закрытия секций
const isHeaderOpen = ref(true);
const isLinesOpen = ref(true);

// Форматирование даты
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("ru-RU");
};

const handlePrint = () => {
  emit("print", props.header.no);
};

const handleClose = () => {
  emit("close");
};
</script>
