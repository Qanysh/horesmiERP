<script setup>
import { ref, watch } from 'vue'
import { useVendorsStore } from '@/stores/vendors'
import { usePurchaseOrdersStore } from '@/stores/purchaseOrders'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileTextIcon,
  DollarSignIcon,
  BoxIcon,
  UsersIcon,
} from 'lucide-vue-next'

const vendorsStore = useVendorsStore()
const purchaseOrdersStore = usePurchaseOrdersStore()
const props = defineProps({
  open: Boolean,
  purchaseOrder: Object,
})

const emit = defineEmits(['update:open'])
const showLines = ref(false)
const errorMessage = ref('')

const getVendorName = (vendorNo) => {
  const vendor = vendorsStore.vendors.find((v) => v.BIN === vendorNo)
  return vendor ? `${vendor.BIN} - ${vendor.name}` : vendorNo
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return isNaN(date) ? '' : date.toLocaleDateString()
}

const toggleLines = async () => {
  showLines.value = !showLines.value
  if (showLines.value && props.purchaseOrder?.no) {
    try {
      await purchaseOrdersStore.fetchPurchaseLinesByDocumentNo(props.purchaseOrder.no)
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = error.response?.data?.message || 'Failed to load purchase lines'
      console.error('Error fetching purchase lines:', error)
    }
  }
}

const handlePrint = () => {
  if (!props.purchaseOrder?.no) return
  const url = `http://localhost:3000/api/reports/purchaseOrder/${props.purchaseOrder.no}`
  window.open(url, '_blank')
}

watch(
  () => props.purchaseOrder,
  async (newVal) => {
    if (newVal && newVal.no) {
      try {
        await purchaseOrdersStore.fetchPurchaseLinesByDocumentNo(newVal.no)
        errorMessage.value = ''
      } catch (error) {
        errorMessage.value = error.response?.data?.message || 'Failed to load purchase lines'
        console.error('Error fetching purchase lines:', error)
      }
    }
  },
  { immediate: true },
)
</script>

<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent
      class="sm:max-w-[900px] w-full max-h-[80vh] sm:max-h-[800px] overflow-y-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md"
    >
      <DialogHeader>
        <DialogTitle class="text-xl font-semibold text-black">Purchase Order Details</DialogTitle>
        <DialogDescription class="text-sm text-gray-500"
          >View all details of this purchase order</DialogDescription
        >
      </DialogHeader>

      <div v-if="errorMessage" class="text-red-500 text-sm mb-4">
        {{ errorMessage }}
      </div>

      <div v-if="purchaseOrder" class="grid gap-6 py-4">
        <!-- Order Information Section -->
        <div class="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
          <div class="flex items-center space-x-3 text-gray-700">
            <FileTextIcon class="h-6 w-6 text-gray-600" />
            <h3 class="font-semibold text-lg">Order Information</h3>
          </div>
          <div class="space-y-2 mt-2">
            <p><span class="font-medium">No:</span> {{ purchaseOrder.no }}</p>
            <p>
              <span class="font-medium">Vendor:</span> {{ getVendorName(purchaseOrder.vendorNo) }}
            </p>
            <p>
              <span class="font-medium">Order Date:</span> {{ formatDate(purchaseOrder.orderDate) }}
            </p>
            <p>
              <span class="font-medium">Due Date:</span> {{ formatDate(purchaseOrder.dueDate) }}
            </p>
            <p><span class="font-medium">Status:</span> {{ purchaseOrder.status }}</p>
          </div>
        </div>

        <!-- Financial Information Section -->
        <div class="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
          <div class="flex items-center space-x-3 text-gray-700">
            <DollarSignIcon class="h-6 w-6 text-gray-600" />
            <h3 class="font-semibold text-lg">Financial Information</h3>
          </div>
          <div class="space-y-2 mt-2">
            <p><span class="font-medium">Currency:</span> {{ purchaseOrder.currencyCode }}</p>
            <p>
              <span class="font-medium">Payment Terms:</span> {{ purchaseOrder.paymentTermsCode }}
            </p>
            <p>
              <span class="font-medium">Payment Method:</span> {{ purchaseOrder.paymentMethodCode }}
            </p>
            <p>
              <span class="font-medium">Prices Include VAT:</span>
              {{ purchaseOrder.pricesIncludingVAT ? 'Yes' : 'No' }}
            </p>
          </div>
        </div>

        <!-- Description Section -->
        <div class="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
          <div class="flex items-center space-x-3 text-gray-700">
            <BoxIcon class="h-6 w-6 text-gray-600" />
            <h3 class="font-semibold text-lg">Description</h3>
          </div>
          <p class="text-gray-700 mt-2">{{ purchaseOrder.postingDescription }}</p>
        </div>

        <!-- Buy From Section -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
            <div class="flex items-center space-x-3 text-gray-700">
              <UsersIcon class="h-6 w-6 text-gray-600" />
              <h3 class="font-semibold text-lg">Buy From</h3>
            </div>
            <div class="space-y-2 mt-2">
              <p>Vendor: {{ purchaseOrder.buyFromVendorName }}</p>
              <p>Address: {{ purchaseOrder.buyFromAddress }}</p>
              <p>City: {{ purchaseOrder.buyFromCity }}</p>
              <p>Contact: {{ purchaseOrder.buyFromContact }}</p>
              <p>Phone: {{ purchaseOrder.buyFromContactPhoneNo }}</p>
              <p>Email: {{ purchaseOrder.buyFromContactEmail }}</p>
            </div>
          </div>

          <!-- Receipt Section -->
          <div class="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
            <div class="flex items-center space-x-3 text-gray-700">
              <UsersIcon class="h-6 w-6 text-gray-600" />
              <h3 class="font-semibold text-lg">Receipt</h3>
            </div>
            <div class="space-y-2 mt-2">
              <p>Remit To Name: {{ purchaseOrder.remitToName }}</p>
              <p>Remit To Address: {{ purchaseOrder.remitToAddress }}</p>
              <p>Remit To City: {{ purchaseOrder.remitToCity }}</p>
              <p>Post Code: {{ purchaseOrder.remitToPostCode }}</p>
              <p>Country: {{ purchaseOrder.remitToCountryRegionCode }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Toggle Purchase Lines -->
      <div class="mt-6">
        <Button
          variant="ghost"
          class="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          @click="toggleLines"
        >
          <span>Purchase Lines</span>
          <ChevronRightIcon v-if="!showLines" class="h-4 w-4" />
          <ChevronDownIcon v-else class="h-4 w-4" />
        </Button>

        <div
          v-if="showLines"
          class="mt-2 border rounded-lg p-4 max-h-[300px] overflow-y-auto bg-white shadow-sm"
        >
          <div v-if="errorMessage" class="text-red-500 text-sm mb-4">
            {{ errorMessage }}
          </div>
          <div class="overflow-auto">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Line No
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Item No
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Unit Cost
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Expected Date
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-300">
                <tr
                  v-if="
                    !Array.isArray(
                      purchaseOrdersStore.purchaseLinesByDocumentNo[purchaseOrder?.no],
                    ) ||
                    purchaseOrdersStore.purchaseLinesByDocumentNo[purchaseOrder?.no]?.length === 0
                  "
                >
                  <td colspan="7" class="px-6 py-4 text-center text-sm text-gray-500">
                    {{
                      purchaseOrdersStore.loading
                        ? 'Loading purchase lines...'
                        : errorMessage || 'No purchase lines found'
                    }}
                  </td>
                </tr>
                <tr
                  v-for="line in purchaseOrdersStore.purchaseLinesByDocumentNo[purchaseOrder?.no] ||
                  []"
                  :key="line.id"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ line.lineNo }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ line.no }}</td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ line.description }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ line.quantity }} {{ line.unitOfMeasureCode }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ line.directUnitCost }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ line.lineAmount }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ line.expectedReceiptDate ? formatDate(line.expectedReceiptDate) : '' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-2 mt-6">
        <Button
          @click="handlePrint"
          class="bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
          >Post & Print</Button
        >
        <Button
          variant="outline"
          @click="emit('update:open')"
          class="hover:bg-gray-200 transition-all duration-300"
          >Close</Button
        >
      </div>
    </DialogContent>
  </Dialog>
</template>
