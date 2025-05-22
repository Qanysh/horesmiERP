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
            <span>{{ isHeaderOpen ? "▼" : "▶" }} Order Details</span>
          </button>
          <div v-show="isHeaderOpen" class="space-y-4 text-sm">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <!-- Основная информация -->
              <p><strong>Purchase Order No:</strong> {{ header.no }}</p>
              <p><strong>Vendor No:</strong> {{ header.vendorNo }}</p>
              <p><strong>Vendor:</strong> {{ header.buyFromVendorName }}</p>
              <p><strong>Status:</strong> {{ header.status }}</p>
              <p>
                <strong>Order Date:</strong> {{ formatDate(header.orderDate) }}
              </p>
              <p><strong>Due Date:</strong> {{ formatDate(header.dueDate) }}</p>
              <p>
                <strong>Posting Description:</strong>
                {{ header.postingDescription }}
              </p>

              <!-- Контактная информация -->
              <p>
                <strong>Buy From Contact:</strong> {{ header.buyFromContact }}
              </p>
              <p>
                <strong>Buy From Contact No:</strong>
                {{ header.buyFromContactNo }}
              </p>
              <p>
                <strong>Buy From Contact Phone:</strong>
                {{ header.buyFromContactPhoneNo }}
              </p>
              <p>
                <strong>Buy From Contact Mobile:</strong>
                {{ header.buyFromContactMobilePhoneNo }}
              </p>
              <p>
                <strong>Buy From Contact Email:</strong>
                {{ header.buyFromContactEmail }}
              </p>

              <!-- Адресная информация -->
              <p>
                <strong>Buy From Address:</strong> {{ header.buyFromAddress }}
              </p>
              <p>
                <strong>Buy From Address 2:</strong>
                {{ header.buyFromAddress2 }}
              </p>
              <p><strong>Buy From City:</strong> {{ header.buyFromCity }}</p>
              <p>
                <strong>Buy From County:</strong> {{ header.buyFromCounty }}
              </p>
              <p>
                <strong>Buy From Post Code:</strong>
                {{ header.buyFromPostCode }}
              </p>
              <p>
                <strong>Buy From Country:</strong>
                {{ header.buyFromCountryRegionCode }}
              </p>

              <!-- Финансовая информация -->
              <p><strong>Currency:</strong> {{ header.currencyCode }}</p>
              <p>
                <strong>Payment Terms:</strong> {{ header.paymentTermsCode }}
              </p>
              <p>
                <strong>Payment Method:</strong> {{ header.paymentMethodCode }}
              </p>
              <p>
                <strong>Payment Discount %:</strong>
                {{ header.paymentDiscountPercent }}
              </p>
              <p>
                <strong>Payment Reference:</strong>
                {{ header.paymentReference }}
              </p>
              <p>
                <strong>VAT Bus. Posting Group:</strong>
                {{ header.vatBusPostingGroup }}
              </p>
              <p>
                <strong>Vendor Posting Group:</strong>
                {{ header.vendorPostingGroup }}
              </p>
              <p>
                <strong>Prices Including VAT:</strong>
                {{ header.pricesIncludingVAT ? "Yes" : "No" }}
              </p>
              <p>
                <strong>Tax Liable:</strong>
                {{ header.taxLiable ? "Yes" : "No" }}
              </p>
              <p><strong>Tax Area Code:</strong> {{ header.taxAreaCode }}</p>

              <!-- Дополнительная информация -->
              <p>
                <strong>Vendor Invoice No:</strong> {{ header.vendorInvoiceNo }}
              </p>
              <p><strong>Your Reference:</strong> {{ header.yourReference }}</p>
              <p><strong>Purchaser Code:</strong> {{ header.purchaserCode }}</p>
              <p><strong>Quote No:</strong> {{ header.quoteNo }}</p>
              <p>
                <strong>Vendor Order No:</strong> {{ header.vendorOrderNo }}
              </p>
              <p>
                <strong>Vendor Shipment No:</strong>
                {{ header.vendorShipmentNo }}
              </p>
              <p>
                <strong>Vendor Cr. Memo No:</strong> {{ header.vendorCrMemoNo }}
              </p>

              <!-- Системная информация -->
              <p><strong>Assigned User:</strong> {{ header.assignedUserId }}</p>
              <p>
                <strong>Job Queue Status:</strong> {{ header.jobQueueStatus }}
              </p>
              <p><strong>Language Code:</strong> {{ header.languageCode }}</p>
              <p><strong>Format Region:</strong> {{ header.formatRegion }}</p>
              <p>
                <strong>Journal Template Name:</strong>
                {{ header.journalTemplName }}
              </p>

              <!-- Адрес и отправка -->
              <p>
                <strong>Order Address Code:</strong>
                {{ header.orderAddressCode }}
              </p>
              <p>
                <strong>Responsibility Center:</strong>
                {{ header.responsibilityCenter }}
              </p>
              <p>
                <strong>Shipment Method:</strong>
                {{ header.shipmentMethodCode }}
              </p>
              <p>
                <strong>Inbound Whse. Handling Time:</strong>
                {{ header.inboundWhseHandlingTime }}
              </p>
              <p>
                <strong>Lead Time Calculation:</strong>
                {{ header.leadTimeCalculation }}
              </p>

              <!-- Размеры (Dimensions) -->
              <p>
                <strong>Shortcut Dimension 1:</strong>
                {{ header.shortcutDimension1Code }}
              </p>
              <p>
                <strong>Shortcut Dimension 2:</strong>
                {{ header.shortcutDimension2Code }}
              </p>

              <!-- Creditor и Hold информация -->
              <p><strong>Creditor No:</strong> {{ header.creditorNo }}</p>
              <p>
                <strong>On Hold:</strong> {{ header.onHold ? "Yes" : "No" }}
              </p>

              <!-- Remit To информация -->
              <p><strong>Remit To Code:</strong> {{ header.remitToCode }}</p>
              <p><strong>Remit To Name:</strong> {{ header.remitToName }}</p>
              <p>
                <strong>Remit To Address:</strong> {{ header.remitToAddress }}
              </p>
              <p>
                <strong>Remit To Address 2:</strong>
                {{ header.remitToAddress2 }}
              </p>
              <p><strong>Remit To City:</strong> {{ header.remitToCity }}</p>
              <p>
                <strong>Remit To County:</strong> {{ header.remitToCounty }}
              </p>
              <p>
                <strong>Remit To Post Code:</strong>
                {{ header.remitToPostCode }}
              </p>
              <p>
                <strong>Remit To Country:</strong>
                {{ header.remitToCountryRegionCode }}
              </p>
              <p>
                <strong>Remit To Contact:</strong> {{ header.remitToContact }}
              </p>

              <!-- Транспорт и торговля -->
              <p>
                <strong>Transaction Specification:</strong>
                {{ header.transactionSpecification }}
              </p>
              <p>
                <strong>Transaction Type:</strong> {{ header.transactionType }}
              </p>
              <p>
                <strong>Transport Method:</strong> {{ header.transportMethod }}
              </p>
              <p><strong>Entry Point:</strong> {{ header.entryPoint }}</p>
              <p><strong>Area:</strong> {{ header.area }}</p>

              <!-- Prepayment информация -->
              <p>
                <strong>Prepayment %:</strong> {{ header.prepaymentPercent }}
              </p>
              <p>
                <strong>Compress Prepayment:</strong>
                {{ header.compressPrepayment ? "Yes" : "No" }}
              </p>
              <p>
                <strong>Prepmt. Payment Terms:</strong>
                {{ header.prepmtPaymentTermsCode }}
              </p>
              <p>
                <strong>Prepmt. Payment Discount %:</strong>
                {{ header.prepmtPaymentDiscountPercent }}
              </p>
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
                  <th class="px-3 py-2 border">Type</th>
                  <th class="px-3 py-2 border">Item No</th>
                  <th class="px-3 py-2 border">Variant Code</th>
                  <th class="px-3 py-2 border">Description</th>
                  <th class="px-3 py-2 border">Location</th>
                  <th class="px-3 py-2 border">Quantity</th>
                  <th class="px-3 py-2 border">Reserved Qty</th>
                  <th class="px-3 py-2 border">Unit</th>
                  <th class="px-3 py-2 border">Direct Unit Cost</th>
                  <th class="px-3 py-2 border">Indirect Cost %</th>
                  <th class="px-3 py-2 border">Unit Cost LCY</th>
                  <th class="px-3 py-2 border">Unit Price LCY</th>
                  <th class="px-3 py-2 border">Line Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="line in purchaseLines" :key="line.id">
                  <td class="px-3 py-2 border">{{ line.lineNo }}</td>
                  <td class="px-3 py-2 border">{{ line.type }}</td>
                  <td class="px-3 py-2 border">{{ line.no }}</td>
                  <td class="px-3 py-2 border">{{ line.variantCode }}</td>
                  <td class="px-3 py-2 border">
                    {{ line.description }}
                    <div v-if="line.description2" class="text-xs text-gray-500">
                      {{ line.description2 }}
                    </div>
                  </td>
                  <td class="px-3 py-2 border">{{ line.locationCode }}</td>
                  <td class="px-3 py-2 border">{{ line.quantity }}</td>
                  <td class="px-3 py-2 border">{{ line.reservedQtyBase }}</td>
                  <td class="px-3 py-2 border">{{ line.unitOfMeasureCode }}</td>
                  <td class="px-3 py-2 border">{{ line.directUnitCost }}</td>
                  <td class="px-3 py-2 border">
                    {{ line.indirectCostPercent }}
                  </td>
                  <td class="px-3 py-2 border">{{ line.unitCostLCY }}</td>
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
            Post & Print
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
