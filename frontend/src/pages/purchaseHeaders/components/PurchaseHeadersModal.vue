<script setup>
import { ref } from "vue";
import { usePurchaseHeadersStore } from "@/pages/purchaseHeaders/store/usePurchaseHeadersStore";

const emit = defineEmits(["submit", "close"]);
const store = usePurchaseHeadersStore();

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
  assignedUserId: "user123",
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

const purchaseLines = ref([]);
const currentStep = ref(1); // 1 - header, 2 - lines

// Состояние для аккордеона
const isHeaderSectionOpen = ref(true);
const isLinesSectionOpen = ref(true);

const newLine = ref({
  documentType: "Order",
  documentNo: "",
  buyFromVendorNo: "",
  lineNo: 10000,
  type: "Item",
  no: "",
  variantCode: "STD",
  description: "",
  description2: "",
  locationCode: "LOC-001",
  quantity: "1.00000",
  reservedQtyBase: "0.00000",
  unitOfMeasureCode: "PCS",
  directUnitCost: "0.00",
  indirectCostPercent: "0.00",
  unitCostLCY: "0.00",
  unitPriceLCY: "0.00",
  lineAmount: "0.00",
  orderNo: "",
  allocationAccountNo: "6000",
  jobNo: "",
  jobTaskNo: "",
  jobLineType: "Material",
  shortcutDim1Code: "",
  shortcutDim2Code: "",
  shortcutDimCode3: "",
  shortcutDimCode4: "",
  shortcutDimCode5: "",
  shortcutDimCode6: "",
  shortcutDimCode7: "",
  shortcutDimCode8: "",
  outstandingQuantity: "1.00000",
  outstandingAmountLCY: "0.00",
  amountRcdNotInvoicedLCY: "0.00",
  discountPercent: null,
  allowInvoiceDiscount: null,
  vatIdentifier: null,
});

const handleSubmit = async () => {
  if (currentStep.value === 1) {
    // Создаем header
    try {
      const response = await store.createHeader({ ...header.value });
      if (response.message === "PurchaseHeader created successfully") {
        // Переходим к созданию lines
        currentStep.value = 2;
        // Заполняем поля для lines
        newLine.value.documentNo = header.value.no;
        newLine.value.buyFromVendorNo = header.value.vendorNo;
        newLine.value.orderNo = header.value.no;
      }
    } catch (error) {
      alert("Failed to create purchase header: " + error.message);
    }
  }
};

const addLine = () => {
  // Добавляем новую строку в массив
  const lineToAdd = {
    ...newLine.value,
    lineNo: (purchaseLines.value.length + 1) * 10000,
  };
  purchaseLines.value.push(lineToAdd);

  // Сбрасываем форму для новой строки
  resetNewLine();
};

const removeLine = (index) => {
  purchaseLines.value.splice(index, 1);
};

const resetNewLine = () => {
  newLine.value = {
    documentType: "Order",
    documentNo: header.value.no,
    buyFromVendorNo: header.value.vendorNo,
    lineNo: (purchaseLines.value.length + 1) * 10000,
    type: "Item",
    no: "",
    variantCode: "STD",
    description: "",
    description2: "",
    locationCode: "LOC-001",
    quantity: "1.00000",
    reservedQtyBase: "0.00000",
    unitOfMeasureCode: "PCS",
    directUnitCost: "0.00",
    indirectCostPercent: "0.00",
    unitCostLCY: "0.00",
    unitPriceLCY: "0.00",
    lineAmount: "0.00",
    orderNo: header.value.no,
    allocationAccountNo: "6000",
    jobNo: "",
    jobTaskNo: "",
    jobLineType: "Material",
    shortcutDim1Code: "",
    shortcutDim2Code: "",
    shortcutDimCode3: "",
    shortcutDimCode4: "",
    shortcutDimCode5: "",
    shortcutDimCode6: "",
    shortcutDimCode7: "",
    shortcutDimCode8: "",
    outstandingQuantity: "1.00000",
    outstandingAmountLCY: "0.00",
    amountRcdNotInvoicedLCY: "0.00",
    discountPercent: null,
    allowInvoiceDiscount: null,
    vatIdentifier: null,
  };
};

const savePurchaseLines = async () => {
  try {
    // Создаем все purchase lines
    for (const line of purchaseLines.value) {
      await store.createPurchaseLine(line);
    }

    alert("Purchase order and lines created successfully!");
    emit("close");
  } catch (error) {
    alert("Failed to create purchase lines: " + error.message);
  }
};

const handleClose = () => {
  emit("close");
};

const goBackToHeader = () => {
  currentStep.value = 1;
};

// Функция для расчета Line Amount
const calculateLineAmount = () => {
  const quantity = parseFloat(newLine.value.quantity) || 0;
  const unitPrice = parseFloat(newLine.value.unitPriceLCY) || 0;
  newLine.value.lineAmount = (quantity * unitPrice).toFixed(2);
  newLine.value.outstandingAmountLCY = newLine.value.lineAmount;
};
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div
      class="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
    >
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h2 class="text-xl font-semibold">
              {{
                currentStep === 1 ? "Add Purchase Order" : "Add Purchase Lines"
              }}
            </h2>
            <div class="text-sm text-gray-500 mt-1">
              Step {{ currentStep }} of 2
            </div>
          </div>
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

        <!-- Step 1: Header Creation -->
        <div v-if="currentStep === 1">
          <!-- Accordion: Header Info -->
          <div class="mb-6">
            <button
              @click="isHeaderSectionOpen = !isHeaderSectionOpen"
              class="flex items-center text-lg font-semibold text-blue-600 hover:underline mb-4"
            >
              <span
                >{{ isHeaderSectionOpen ? "▼" : "▶" }} Purchase Order
                Information</span
              >
            </button>

            <div v-show="isHeaderSectionOpen">
              <form
                @submit.prevent="handleSubmit"
                class="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <!-- Основная информация -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >PO Number*</label
                  >
                  <input
                    v-model="header.no"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Vendor No*</label
                  >
                  <input
                    v-model="header.vendorNo"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

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

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Vendor Name*</label
                  >
                  <input
                    v-model="header.buyFromVendorName"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div class="space-y-2 md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Description*</label
                  >
                  <textarea
                    v-model="header.postingDescription"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  ></textarea>
                </div>

                <!-- Контактная информация -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Contact Name</label
                  >
                  <input
                    v-model="header.buyFromContact"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Contact Phone</label
                  >
                  <input
                    v-model="header.buyFromContactPhoneNo"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Contact Email</label
                  >
                  <input
                    v-model="header.buyFromContactEmail"
                    type="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <!-- Адресная информация -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Address</label
                  >
                  <input
                    v-model="header.buyFromAddress"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Address 2</label
                  >
                  <input
                    v-model="header.buyFromAddress2"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >City</label
                  >
                  <input
                    v-model="header.buyFromCity"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Post Code</label
                  >
                  <input
                    v-model="header.buyFromPostCode"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Country</label
                  >
                  <input
                    v-model="header.buyFromCountryRegionCode"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <!-- Финансовая информация -->
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
                    >Payment Terms</label
                  >
                  <input
                    v-model="header.paymentTermsCode"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Payment Method</label
                  >
                  <input
                    v-model="header.paymentMethodCode"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >VAT Bus. Posting Group</label
                  >
                  <input
                    v-model="header.vatBusPostingGroup"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <!-- Даты -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Order Date*</label
                  >
                  <input
                    v-model="header.orderDate"
                    type="date"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Due Date*</label
                  >
                  <input
                    v-model="header.dueDate"
                    type="date"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <!-- Дополнительная информация -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Vendor Invoice No</label
                  >
                  <input
                    v-model="header.vendorInvoiceNo"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Your Reference</label
                  >
                  <input
                    v-model="header.yourReference"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Shipment Method</label
                  >
                  <input
                    v-model="header.shipmentMethodCode"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <!-- Кнопки -->
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
                    Create Order & Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Step 2: Purchase Lines Creation -->
        <div v-if="currentStep === 2">
          <!-- Accordion: Purchase Lines -->
          <div class="mb-6">
            <button
              @click="isLinesSectionOpen = !isLinesSectionOpen"
              class="flex items-center text-lg font-semibold text-blue-600 hover:underline mb-4"
            >
              <span
                >{{ isLinesSectionOpen ? "▼" : "▶" }} Purchase Lines ({{
                  purchaseLines.length
                }})</span
              >
            </button>

            <div v-show="isLinesSectionOpen" class="space-y-6">
              <!-- Form to add new line -->
              <div class="border rounded-lg p-4 bg-gray-50">
                <h3 class="text-md font-semibold mb-4">Add New Line</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Item No*</label
                    >
                    <input
                      v-model="newLine.no"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Description*</label
                    >
                    <input
                      v-model="newLine.description"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Description 2</label
                    >
                    <input
                      v-model="newLine.description2"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Quantity*</label
                    >
                    <input
                      v-model="newLine.quantity"
                      @input="calculateLineAmount"
                      type="number"
                      step="0.00001"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Unit of Measure</label
                    >
                    <input
                      v-model="newLine.unitOfMeasureCode"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Direct Unit Cost</label
                    >
                    <input
                      v-model="newLine.directUnitCost"
                      type="number"
                      step="0.01"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Unit Price LCY</label
                    >
                    <input
                      v-model="newLine.unitPriceLCY"
                      @input="calculateLineAmount"
                      type="number"
                      step="0.01"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Line Amount</label
                    >
                    <input
                      v-model="newLine.lineAmount"
                      type="number"
                      step="0.01"
                      readonly
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-gray-100"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Location Code</label
                    >
                    <input
                      v-model="newLine.locationCode"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Variant Code</label
                    >
                    <input
                      v-model="newLine.variantCode"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Type</label
                    >
                    <select
                      v-model="newLine.type"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    >
                      <option value="Item">Item</option>
                      <option value="Resource">Resource</option>
                      <option value="Fixed Asset">Fixed Asset</option>
                      <option value="Charge (Item)">Charge (Item)</option>
                    </select>
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Indirect Cost %</label
                    >
                    <input
                      v-model="newLine.indirectCostPercent"
                      type="number"
                      step="0.01"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Unit Cost LCY</label
                    >
                    <input
                      v-model="newLine.unitCostLCY"
                      type="number"
                      step="0.01"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Outstanding Quantity</label
                    >
                    <input
                      v-model="newLine.outstandingQuantity"
                      type="number"
                      step="0.00001"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Outstanding Amount LCY</label
                    >
                    <input
                      v-model="newLine.outstandingAmountLCY"
                      type="number"
                      step="0.01"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Amount Rcd Not Invoiced LCY</label
                    >
                    <input
                      v-model="newLine.amountRcdNotInvoicedLCY"
                      type="number"
                      step="0.01"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Job No</label
                    >
                    <input
                      v-model="newLine.jobNo"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Job Task No</label
                    >
                    <input
                      v-model="newLine.jobTaskNo"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Job Line Type</label
                    >
                    <select
                      v-model="newLine.jobLineType"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    >
                      <option value="Material">Material</option>
                      <option value="Resource">Resource</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Allocation Account No</label
                    >
                    <input
                      v-model="newLine.allocationAccountNo"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Shortcut Dimension 1</label
                    >
                    <input
                      v-model="newLine.shortcutDim1Code"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Shortcut Dimension 2</label
                    >
                    <input
                      v-model="newLine.shortcutDim2Code"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Shortcut Dimension 3</label
                    >
                    <input
                      v-model="newLine.shortcutDimCode3"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Shortcut Dimension 4</label
                    >
                    <input
                      v-model="newLine.shortcutDimCode4"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Shortcut Dimension 5</label
                    >
                    <input
                      v-model="newLine.shortcutDimCode5"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Shortcut Dimension 6</label
                    >
                    <input
                      v-model="newLine.shortcutDimCode6"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Shortcut Dimension 7</label
                    >
                    <input
                      v-model="newLine.shortcutDimCode7"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Shortcut Dimension 8</label
                    >
                    <input
                      v-model="newLine.shortcutDimCode8"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Discount %</label
                    >
                    <input
                      v-model="newLine.discountPercent"
                      type="number"
                      step="0.01"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >VAT Identifier</label
                    >
                    <input
                      v-model="newLine.vatIdentifier"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Allow Invoice Discount</label
                    >
                    <select
                      v-model="newLine.allowInvoiceDiscount"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    >
                      <option :value="true">Yes</option>
                      <option :value="false">No</option>
                      <option :value="null">Not Set</option>
                    </select>
                  </div>
                </div>

                <div class="flex justify-end mt-4">
                  <button
                    @click="addLine"
                    type="button"
                    class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                  >
                    Add Line
                  </button>
                </div>
              </div>

              <!-- Existing lines table -->
              <div v-if="purchaseLines.length > 0">
                <h3 class="text-md font-semibold mb-4">Purchase Lines</h3>
                <div class="overflow-x-auto">
                  <table class="min-w-full border text-sm">
                    <thead class="bg-gray-100">
                      <tr>
                        <th class="px-3 py-2 border text-left">Line No</th>
                        <th class="px-3 py-2 border text-left">Type</th>
                        <th class="px-3 py-2 border text-left">Item No</th>
                        <th class="px-3 py-2 border text-left">Description</th>
                        <th class="px-3 py-2 border text-left">Quantity</th>
                        <th class="px-3 py-2 border text-left">Unit</th>
                        <th class="px-3 py-2 border text-left">Unit Price</th>
                        <th class="px-3 py-2 border text-left">Line Amount</th>
                        <th class="px-3 py-2 border text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(line, index) in purchaseLines" :key="index">
                        <td class="px-3 py-2 border">{{ line.lineNo }}</td>
                        <td class="px-3 py-2 border">{{ line.type }}</td>
                        <td class="px-3 py-2 border">{{ line.no }}</td>
                        <td class="px-3 py-2 border">
                          {{ line.description }}
                          <div
                            v-if="line.description2"
                            class="text-xs text-gray-500"
                          >
                            {{ line.description2 }}
                          </div>
                        </td>
                        <td class="px-3 py-2 border">{{ line.quantity }}</td>
                        <td class="px-3 py-2 border">
                          {{ line.unitOfMeasureCode }}
                        </td>
                        <td class="px-3 py-2 border">
                          {{ line.unitPriceLCY }}
                        </td>
                        <td class="px-3 py-2 border">{{ line.lineAmount }}</td>
                        <td class="px-3 py-2 border">
                          <button
                            @click="removeLine(index)"
                            class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2 buttons -->
          <div class="flex justify-between">
            <button
              @click="goBackToHeader"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Back to Header
            </button>
            <div class="flex space-x-3">
              <button
                @click="handleClose"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                @click="savePurchaseLines"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                :disabled="purchaseLines.length === 0"
                :class="{
                  'opacity-50 cursor-not-allowed': purchaseLines.length === 0,
                }"
              >
                Save Purchase Lines ({{ purchaseLines.length }})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
