<script setup>
import { ref } from "vue";
import { useSalesOrdersStore } from "../store/useSalesOrdersStore";

const emit = defineEmits(["submit", "close"]);
const store = useSalesOrdersStore();

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

const salesLines = ref([]);
const currentStep = ref(1); // 1 - header, 2 - lines

// Состояние для аккордеона
const isHeaderSectionOpen = ref(true);
const isLinesSectionOpen = ref(true);

const newLine = ref({
  documentType: "Order",
  documentNo: "",
  sellToCustomerNo: "",
  lineNo: 10000,
  type: "Item",
  no: "",
  variantCode: "",
  description: "",
  description2: "",
  locationCode: "",
  quantity: "1.00000",
  reservedQtyBase: "0.00000",
  unitOfMeasureCode: "PCS",
  unitPrice: "0.00",
  unitCostLCY: "0.00",
  lineAmount: "0.00",
  orderNo: "",
  allocationAccountNo: "",
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
  amountShippedNotInvoicedLCY: "0.00",
  discountPercent: "0.00",
  allowInvoiceDiscount: 1,
  vatIdentifier: "",
});

const handleSubmit = async () => {
  if (currentStep.value === 1) {
    // Создаем header
    try {
      const response = await store.createOrder({ ...order.value });
      if (
        response.message === "SalesOrder created successfully" ||
        response.salesOrder
      ) {
        // Переходим к созданию lines
        currentStep.value = 2;
        // Заполняем поля для lines
        newLine.value.documentNo = order.value.no;
        newLine.value.sellToCustomerNo = order.value.sellToCustomerNo;
        newLine.value.orderNo = order.value.no;
      }
    } catch (error) {
      alert("Failed to create sales order: " + error.message);
    }
  }
};

const addLine = () => {
  // Добавляем новую строку в массив
  const lineToAdd = {
    ...newLine.value,
    lineNo: (salesLines.value.length + 1) * 10000,
  };
  salesLines.value.push(lineToAdd);

  // Сбрасываем форму для новой строки
  resetNewLine();
};

const removeLine = (index) => {
  salesLines.value.splice(index, 1);
};

const resetNewLine = () => {
  newLine.value = {
    documentType: "Order",
    documentNo: order.value.no,
    sellToCustomerNo: order.value.sellToCustomerNo,
    lineNo: (salesLines.value.length + 1) * 10000,
    type: "Item",
    no: "",
    variantCode: "",
    description: "",
    description2: "",
    locationCode: "",
    quantity: "1.00000",
    reservedQtyBase: "0.00000",
    unitOfMeasureCode: "PCS",
    unitPrice: "0.00",
    unitCostLCY: "0.00",
    lineAmount: "0.00",
    orderNo: order.value.no,
    allocationAccountNo: "",
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
    amountShippedNotInvoicedLCY: "0.00",
    discountPercent: "0.00",
    allowInvoiceDiscount: 1,
    vatIdentifier: "",
  };
};

const saveSalesLines = async () => {
  try {
    // Создаем все sales lines
    for (const line of salesLines.value) {
      await store.createSalesLine(line);
    }

    alert("Sales order and lines created successfully!");
    emit("close");
  } catch (error) {
    alert("Failed to create sales lines: " + error.message);
  }
};

const handleClose = () => {
  emit("close");
};

const goBackToHeader = () => {
  currentStep.value = 1;
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
              {{ currentStep === 1 ? "Add Sales Order" : "Add Sales Lines" }}
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
                >{{ isHeaderSectionOpen ? "▼" : "▶" }} Sales Order
                Information</span
              >
            </button>

            <div v-show="isHeaderSectionOpen">
              <form
                @submit.prevent="handleSubmit"
                class="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <!-- Order Number -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Order Number*</label
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
                    >Customer No*</label
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
                    >Customer Name*</label
                  >
                  <input
                    v-model="order.sellToCustomerName"
                    type="text"
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

                <!-- Description -->
                <div class="space-y-2 md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Description*</label
                  >
                  <textarea
                    v-model="order.postingDescription"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  ></textarea>
                </div>

                <!-- Address -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Address</label
                  >
                  <input
                    v-model="order.sellToAddress"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <!-- City -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >City</label
                  >
                  <input
                    v-model="order.sellToCity"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <!-- Post Code -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Post Code</label
                  >
                  <input
                    v-model="order.sellToPostCode"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <!-- Country -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Country</label
                  >
                  <input
                    v-model="order.sellToCountryRegionCode"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <!-- Phone -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Phone</label
                  >
                  <input
                    v-model="order.sellToPhoneNo"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <!-- Email -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Email</label
                  >
                  <input
                    v-model="order.sellToEmail"
                    type="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>

                <!-- Order Date -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700"
                    >Order Date*</label
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
                    >Due Date*</label
                  >
                  <input
                    v-model="order.dueDate"
                    type="date"
                    required
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
                    Create Order & Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Step 2: Sales Lines Creation -->
        <div v-if="currentStep === 2">
          <!-- Accordion: Sales Lines -->
          <div class="mb-6">
            <button
              @click="isLinesSectionOpen = !isLinesSectionOpen"
              class="flex items-center text-lg font-semibold text-blue-600 hover:underline mb-4"
            >
              <span
                >{{ isLinesSectionOpen ? "▼" : "▶" }} Sales Lines ({{
                  salesLines.length
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
                      >Quantity*</label
                    >
                    <input
                      v-model="newLine.quantity"
                      type="number"
                      step="0.00001"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Reserved Qty Base</label
                    >
                    <input
                      v-model="newLine.reservedQtyBase"
                      type="number"
                      step="0.00001"
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
                      >Unit Price</label
                    >
                    <input
                      v-model="newLine.unitPrice"
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
                      >Line Amount</label
                    >
                    <input
                      v-model="newLine.lineAmount"
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
                      >Amount Shipped Not Invoiced LCY</label
                    >
                    <input
                      v-model="newLine.amountShippedNotInvoicedLCY"
                      type="number"
                      step="0.01"
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
                      >Allow Invoice Discount</label
                    >
                    <select
                      v-model="newLine.allowInvoiceDiscount"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    >
                      <option :value="1">Yes</option>
                      <option :value="0">No</option>
                    </select>
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
                    <input
                      v-model="newLine.jobLineType"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>

                  <!-- Dimensions -->
                  <div class="space-y-2" v-for="i in 8" :key="i">
                    <label class="block text-sm font-medium text-gray-700">
                      Shortcut Dimension {{ i }}
                    </label>
                    <input
                      v-model="newLine[`shortcutDimCode${i}`]"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                    />
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex justify-end space-x-3 mt-4">
                  <button
                    @click="addLine"
                    class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Add Line
                  </button>
                </div>
              </div>

              <!-- Table of added lines -->
              <div v-if="salesLines.length > 0">
                <h3 class="text-md font-semibold mb-4">Lines Added</h3>
                <div class="overflow-x-auto">
                  <table class="min-w-full border text-sm">
                    <thead class="bg-gray-100">
                      <tr>
                        <th class="px-3 py-2 border text-left">Line No</th>
                        <th class="px-3 py-2 border text-left">Item No</th>
                        <th class="px-3 py-2 border text-left">Description</th>
                        <th class="px-3 py-2 border text-left">Qty</th>
                        <th class="px-3 py-2 border text-left">Price</th>
                        <th class="px-3 py-2 border text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(line, index) in salesLines"
                        :key="line.lineNo"
                      >
                        <td class="px-3 py-2 border">{{ line.lineNo }}</td>
                        <td class="px-3 py-2 border">{{ line.no }}</td>
                        <td class="px-3 py-2 border">{{ line.description }}</td>
                        <td class="px-3 py-2 border">{{ line.quantity }}</td>
                        <td class="px-3 py-2 border">{{ line.unitPrice }}</td>
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

              <!-- Footer buttons -->
              <div class="flex justify-between mt-6">
                <button
                  @click="goBackToHeader"
                  class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Back
                </button>
                <button
                  @click="saveSalesLines"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save All Lines & Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
