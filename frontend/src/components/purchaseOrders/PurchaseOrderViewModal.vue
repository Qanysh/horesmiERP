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
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-vue-next'

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
  return vendor ? `${vendor.no} - ${vendor.name}` : vendorNo
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
  const url = `http://localhost:3000/api/purchase/printed/${props.purchaseOrder.no}`
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
    <DialogContent class="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle> Purchase Order Details </DialogTitle>
        <DialogDescription>View all details of this purchase order</DialogDescription>
      </DialogHeader>

      <div v-if="errorMessage" class="text-red-500 text-sm mb-4">
        {{ errorMessage }}
      </div>

      <div v-if="purchaseOrder" class="grid gap-4 py-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h3 class="font-semibold mb-2">Order Information</h3>
            <div class="space-y-1">
              <p><span class="font-medium">No:</span> {{ purchaseOrder.no }}</p>
              <p>
                <span class="font-medium">Vendor:</span> {{ getVendorName(purchaseOrder.vendorNo) }}
              </p>
              <p>
                <span class="font-medium">Order Date:</span>
                {{ formatDate(purchaseOrder.orderDate) }}
              </p>
              <p>
                <span class="font-medium">Due Date:</span> {{ formatDate(purchaseOrder.dueDate) }}
              </p>
              <p><span class="font-medium">Status:</span> {{ purchaseOrder.status }}</p>
            </div>
          </div>
          <div>
            <h3 class="font-semibold mb-2">Financial Information</h3>
            <div class="space-y-1">
              <p><span class="font-medium">Currency:</span> {{ purchaseOrder.currencyCode }}</p>
              <p>
                <span class="font-medium">Payment Terms:</span> {{ purchaseOrder.paymentTermsCode }}
              </p>
              <p>
                <span class="font-medium">Payment Method:</span>
                {{ purchaseOrder.paymentMethodCode }}
              </p>
              <p>
                <span class="font-medium">Prices Include VAT:</span>
                {{ purchaseOrder.pricesIncludingVAT ? 'Yes' : 'No' }}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 class="font-semibold mb-2">Description</h3>
          <p>{{ purchaseOrder.postingDescription }}</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h3 class="font-semibold mb-2">Buy From</h3>
            <div class="space-y-1">
              <p>{{ purchaseOrder.buyFromVendorName }}</p>
              <p>{{ purchaseOrder.buyFromAddress }}</p>
              <p>{{ purchaseOrder.buyFromCity }}</p>
              <p>Contact: {{ purchaseOrder.buyFromContact }}</p>
              <p>Phone: {{ purchaseOrder.buyFromContactPhoneNo }}</p>
              <p>Email: {{ purchaseOrder.buyFromContactEmail }}</p>
            </div>
          </div>
          <div>
            <h3 class="font-semibold mb-2">Receipt</h3>
            <div class="space-y-1">
              <p>{{ purchaseOrder.remitToName }}</p>
              <p>{{ purchaseOrder.remitToAddress }}</p>
              <p>{{ purchaseOrder.remitToCity }}</p>
              <p>Post Code: {{ purchaseOrder.remitToPostCode }}</p>
              <p>Country: {{ purchaseOrder.remitToCountryRegionCode }}</p>
              <p>Contact: {{ purchaseOrder.remitToContact }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <Button variant="ghost" class="flex items-center gap-2" @click="toggleLines">
          <span>Purchase Lines</span>
          <ChevronRightIcon v-if="!showLines" class="h-4 w-4" />
          <ChevronDownIcon v-else class="h-4 w-4" />
        </Button>

        <div v-if="showLines" class="mt-2 border rounded-lg p-4 max-h-[300px] overflow-y-auto">
          <div v-if="errorMessage" class="text-red-500 text-sm mb-4">
            {{ errorMessage }}
          </div>
          <div class="overflow-auto">
            <table class="min-w-full divide-y divide-gray-200">
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
              <tbody class="bg-white divide-y divide-gray-200">
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

      <div class="flex justify-end gap-2">
        <Button @click="handlePrint">Post & Print</Button>
        <Button variant="outline" @click="emit('update:open')">Close</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
