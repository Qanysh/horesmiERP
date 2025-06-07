<script setup>
import { ref, watch } from 'vue'
import { useCustomersStore } from '@/stores/customers'
import { useSalesOrdersStore } from '@/stores/salesOrders'

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
  TruckIcon,
  UsersIcon,
  Loader2Icon,
  BoxIcon,
} from 'lucide-vue-next'

const customersStore = useCustomersStore()
const salesOrdersStore = useSalesOrdersStore()
const props = defineProps({
  open: Boolean,
  salesOrder: Object,
})

const emit = defineEmits(['update:open'])
const showLines = ref(false)
const printing = ref(false)
const errorMessage = ref('')

const getCustomerName = (customerNo) => {
  const customer = customersStore.customers.find((c) => c.customer_no === customerNo)
  return customer ? `${customer.customer_no} - ${customer.name}` : customerNo || 'N/A'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return isNaN(date) ? '' : date.toLocaleDateString()
}

const toggleLines = async () => {
  showLines.value = !showLines.value
  if (showLines.value && props.salesOrder?.no) {
    try {
      await salesOrdersStore.fetchSalesLinesByDocumentNo(props.salesOrder.no)
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = error.response?.data?.message || 'Failed to load sales lines'
      console.error('Error fetching sales lines:', error)
    }
  }
}

const handlePrint = async () => {
  if (!props.salesOrder?.no) return
  printing.value = true
  try {
    const url = `http://localhost:3000/api/reports/salesOrder/${props.salesOrder.no}`
    window.open(url, '_blank')
  } catch (error) {
    errorMessage.value = 'Failed to generate print document'
    console.error('Error printing sales order:', error)
  } finally {
    printing.value = false
  }
}

watch(
  () => props.salesOrder,
  async (newVal) => {
    if (newVal && newVal.no) {
      try {
        await salesOrdersStore.fetchSalesLinesByDocumentNo(newVal.no)
        errorMessage.value = ''
      } catch (error) {
        errorMessage.value = error.response?.data?.message || 'Failed to load sales lines'
        console.error('Error fetching sales lines:', error)
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
        <DialogTitle class="text-xl font-semibold text-black">Sales Order Details</DialogTitle>
        <DialogDescription class="text-sm text-gray-500"
          >View all details of this sales order</DialogDescription
        >
      </DialogHeader>

      <div v-if="errorMessage" class="text-red-500 text-sm mb-4">
        {{ errorMessage }}
      </div>

      <div v-if="salesOrder" class="grid gap-6 py-4">
        <!-- Order Information Section -->
        <div class="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
          <div class="flex items-center space-x-3 text-gray-700">
            <FileTextIcon class="h-6 w-6 text-gray-600" />
            <h3 class="font-semibold text-lg">Order Information</h3>
          </div>
          <div class="space-y-2 mt-2">
            <p><span class="font-medium">No:</span> {{ salesOrder.no || 'N/A' }}</p>
            <p>
              <span class="font-medium">Customer:</span>
              {{ getCustomerName(salesOrder.sellToCustomerNo) }}
            </p>
            <p>
              <span class="font-medium">Order Date:</span> {{ formatDate(salesOrder.orderDate) }}
            </p>
            <p><span class="font-medium">Due Date:</span> {{ formatDate(salesOrder.dueDate) }}</p>
            <p><span class="font-medium">Status:</span> {{ salesOrder.status || 'N/A' }}</p>
          </div>
        </div>

        <!-- Financial Information Section -->

        <div class="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
          <div class="flex items-center space-x-3 text-gray-700">
            <BoxIcon class="h-6 w-6 text-gray-600" />
            <h3 class="font-semibold text-lg">Description</h3>
          </div>
          <p class="text-gray-700 mt-2">{{ salesOrder.postingDescription }}</p>
        </div>

        <!-- Customer Details Section -->
        <div class="grid grid-cols-1 gap-4">
          <div class="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
            <div class="flex items-center space-x-3 text-gray-700">
              <UsersIcon class="h-6 w-6 text-gray-600" />
              <h3 class="font-semibold text-lg">Customer Details</h3>
            </div>
            <div class="space-y-2 mt-2">
              <p>
                <span class="font-medium">Name:</span> {{ salesOrder.sellToCustomerName || 'N/A' }}
              </p>
              <p>
                <span class="font-medium">Address:</span> {{ salesOrder.sellToAddress || 'N/A' }}
              </p>
              <p><span class="font-medium">City:</span> {{ salesOrder.sellToCity || 'N/A' }}</p>
              <p><span class="font-medium">Phone:</span> {{ salesOrder.sellToPhoneNo || 'N/A' }}</p>
              <p><span class="font-medium">Email:</span> {{ salesOrder.sellToEmail || 'N/A' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Toggle Sales Lines -->
      <div class="mt-6">
        <Button
          variant="ghost"
          class="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          @click="toggleLines"
        >
          <span>Sales Lines</span>
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
                    Unit Price
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Shipment Date
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-300">
                <tr
                  v-if="
                    !Array.isArray(salesOrdersStore.salesLinesByDocumentNo[salesOrder?.no]) ||
                    salesOrdersStore.salesLinesByDocumentNo[salesOrder?.no]?.length === 0
                  "
                >
                  <td colspan="7" class="px-6 py-4 text-center text-sm text-gray-500">
                    {{
                      salesOrdersStore.loading
                        ? 'Loading sales lines...'
                        : errorMessage || 'No sales lines found'
                    }}
                  </td>
                </tr>
                <tr
                  v-for="line in salesOrdersStore.salesLinesByDocumentNo[salesOrder?.no] || []"
                  :key="line.id"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ line.lineNo || 'N/A' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ line.no || 'N/A' }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ line.description || 'N/A' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ line.quantity ? `${line.quantity} ${line.unitOfMeasureCode || ''}` : 'N/A' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ line.unitPrice || 'N/A' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ line.lineAmount || 'N/A' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ line.shipmentDate ? formatDate(line.shipmentDate) : '' }}
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
          :disabled="printing"
          class="bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
        >
          <Loader2Icon v-if="printing" class="h-4 w-4 animate-spin mr-2" />
          Post & Print
        </Button>
        <Button
          variant="outline"
          @click="emit('update:open', false)"
          class="hover:bg-gray-200 transition-all duration-300"
          >Close</Button
        >
      </div>
    </DialogContent>
  </Dialog>
</template>
