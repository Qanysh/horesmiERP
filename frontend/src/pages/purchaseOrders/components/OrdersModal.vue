<script setup>
import { ref } from "vue";

const emit = defineEmits(["submit", "close"]);

const header = ref({
  no: "",
  buyFromVendorNo: "",
  orderAddressCode: "ADDR-01",
  buyFromVendorName: "",
  vendorAuthorizationNo: "",
  buyFromPostCode: "",
  buyFromCountryRegionCode: "RU",
  buyFromContact: "",
  payToVendorNo: "",
  payToName: "",
  payToPostCode: "",
  payToCountryRegionCode: "RU",
  payToContact: "",
  shipToCode: "LOC-001",
  shipToName: "",
  shipToPostCode: "",
  shipToCountryRegionCode: "RU",
  shipToContact: "",
  shortcutDimension1Code: "DEPT-01",
  shortcutDimension2Code: "PROJECT-A",
  locationCode: "LOC-001",
  purchaserCode: "PURCH-01",
  assignedUserId: "",
  currencyCode: "RUB",
  postingDescription: "",
  orderDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  status: "Open",
  paymentTermsCode: "30D",
  paymentMethodCode: "BANK",
  pricesIncludingVAT: 1,
  taxLiable: 1,
  vatBusPostingGroup: "VAT-RU",
  vendorPostingGroup: "VPG-01",
});

const handleSubmit = () => {
  emit("submit", { ...header.value });
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
          <h2 class="text-xl font-semibold">Add Purchase Order</h2>
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
          <!-- PO Number -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >PO Number</label
            >
            <input
              v-model="header.no"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <!-- Vendor No -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Vendor No</label
            >
            <input
              v-model="header.buyFromVendorNo"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <!-- Vendor Name -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Vendor Name</label
            >
            <input
              v-model="header.buyFromVendorName"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <!-- Order Date -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Order Date</label
            >
            <input
              v-model="header.orderDate"
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
              v-model="header.dueDate"
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
              v-model="header.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="Open">Open</option>
              <option value="Released">Released</option>
              <option value="Pending Approval">Pending Approval</option>
            </select>
          </div>

          <!-- Posting Description -->
          <div class="space-y-2 md:col-span-2">
            <label class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <textarea
              v-model="header.postingDescription"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            ></textarea>
          </div>

          <!-- Vendor Contact -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Vendor Contact</label
            >
            <input
              v-model="header.buyFromContact"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <!-- Payment Terms -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Payment Terms</label
            >
            <input
              v-model="header.paymentTermsCode"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <!-- Currency Code -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Currency</label
            >
            <input
              v-model="header.currencyCode"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >vendorAuthorizationNo</label
            >
            <input
              v-model="header.vendorAuthorizationNo"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >buyFromPostCode</label
            >
            <input
              v-model="header.buyFromPostCode"
              type="text"
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
              Create Purchase Order
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
