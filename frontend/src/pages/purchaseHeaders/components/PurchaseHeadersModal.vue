<script setup>
import { ref } from "vue";

const emit = defineEmits(["submit", "close"]);

const header = ref({
  no: "",
  vendorNo: "",
  status: "Open",
  buyFromVendorName: "",
  postingDescription: "",
  buyFromAddress: "",
  buyFromAddress2: "",
  buyFromCity: "",
  buyFromCounty: "",
  buyFromPostCode: "",
  buyFromCountryRegionCode: "RU",
  buyFromContactNo: "",
  buyFromContact: "",
  buyFromContactPhoneNo: "",
  buyFromContactMobilePhoneNo: "",
  buyFromContactEmail: "",
  vendorInvoiceNo: "",
  yourReference: "",
  purchaserCode: "EMP-001",
  quoteNo: "",
  vendorOrderNo: "",
  vendorShipmentNo: "",
  orderAddressCode: "ADDR-01",
  responsibilityCenter: "RC-01",
  assignedUserId: "user123", // Replace dynamically
  jobQueueStatus: "Pending",
  languageCode: "RU",
  formatRegion: "RU",
  currencyCode: "RUB",
  pricesIncludingVAT: 1,
  vatBusPostingGroup: "VAT-RU",
  vendorPostingGroup: "VPG-01",
  paymentTermsCode: "30D",
  paymentMethodCode: "BANK",
  shortcutDimension1Code: "DIM1",
  shortcutDimension2Code: "DIM2",
  paymentDiscountPercent: "0.00",
  journalTemplName: "PURCHASE",
  taxLiable: 1,
  taxAreaCode: "TAX-01",
  shipmentMethodCode: "DELIVERY",
  paymentReference: "REF-2024-01",
  creditorNo: "CR-01",
  onHold: 0,
  inboundWhseHandlingTime: "2D",
  leadTimeCalculation: "3D",
  remitToCode: "REM-01",
  remitToName: "ООО Получатель",
  remitToAddress: "ул. Пушкина, д. 10",
  remitToAddress2: "",
  remitToCity: "Москва",
  remitToCounty: "Центральный",
  remitToPostCode: "101001",
  remitToCountryRegionCode: "RU",
  remitToContact: "Петр Петров",
  transactionSpecification: "INTRASTAT",
  transactionType: "Purchase",
  transportMethod: "Авто",
  entryPoint: "Москва",
  area: "RU",
  prepaymentPercent: "10.00",
  compressPrepayment: 0,
  prepmtPaymentTermsCode: "ADV",
  prepmtPaymentDiscountPercent: "0.00",
  vendorCrMemoNo: "CRM-2024-01",
  orderDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
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
              v-model="header.vendorNo"
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
              v-model="header.postingDescription"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            ></textarea>
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
              Create Purchase Header
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
