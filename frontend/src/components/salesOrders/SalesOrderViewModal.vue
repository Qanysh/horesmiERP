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
import { ChevronDownIcon, ChevronRightIcon, Loader2Icon } from 'lucide-vue-next'

const customersStore = useCustomersStore()
const salesOrdersStore = useSalesOrdersStore()
const props = defineProps({
  open: Boolean,
  salesOrder: Object,
})

const emit = defineEmits(['update:open'])
const showLines = ref(false)
const printing = ref(false)

const getCustomerName = (customerNo) => {
  const customer = customersStore.customers.find((c) => c.customer_no === customerNo)
  return customer ? `${customer.customer_no} - ${customer.name}` : customerNo
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

const toggleLines = async () => {
  showLines.value = !showLines.value
  if (showLines.value && props.salesOrder?.no) {
    try {
      await salesOrdersStore.fetchSalesLinesByDocumentNo(props.salesOrder.no)
      console.log(
        'Fetched lines in ViewModal for',
        props.salesOrder.no,
        salesOrdersStore.salesLinesByDocumentNo[props.salesOrder.no],
      )
    } catch (error) {
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
        console.log(
          'Initial fetch lines for',
          newVal.no,
          salesOrdersStore.salesLinesByDocumentNo[newVal.no],
        )
      } catch (error) {
        console.error('Error fetching sales lines on mount:', error)
      }
    }
  },
  { immediate: true },
)
</script>

<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-[900px]">
      <DialogHeader>
        <DialogTitle>Sales Order Details</DialogTitle>
        <DialogDescription> View all details of this sales order </DialogDescription>
      </DialogHeader>

      <div v-if="salesOrder" class="grid gap-4 py-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h3 class="font-semibold mb-2">Order Information</h3>
            <div class="space-y-1">
              <p><span class="font-medium">No:</span> {{ salesOrder.no }}</p>
              <p>
                <span class="font-medium">Customer:</span>
                {{ getCustomerName(salesOrder.sellToCustomerNo) }}
              </p>
              <p>
                <span class="font-medium">Order Date:</span>
                {{ formatDate(salesOrder.orderDate) }}
              </p>
              <p><span class="font-medium">Due Date:</span> {{ formatDate(salesOrder.dueDate) }}</p>
              <p><span class="font-medium">Status:</span> {{ salesOrder.status }}</p>
            </div>
          </div>
          <div>
            <h3 class="font-semibold mb-2">Financial Information</h3>
            <div class="space-y-1">
              <p><span class="font-medium">Currency:</span> {{ salesOrder.currencyCode }}</p>
              <p>
                <span class="font-medium">Payment Terms:</span> {{ salesOrder.paymentTermsCode }}
              </p>
              <p>
                <span class="font-medium">Payment Method:</span> {{ salesOrder.paymentMethodCode }}
              </p>
              <p>
                <span class="font-medium">Your Reference:</span>
                {{ salesOrder.yourReference || 'N/A' }}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 class="font-semibold mb-2">Description</h3>
          <p>{{ salesOrder.postingDescription || 'N/A' }}</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h3 class="font-semibold mb-2">Sell To</h3>
            <div class="space-y-1">
              <p>{{ salesOrder.sellToCustomerName }}</p>
              <p>{{ salesOrder.sellToAddress }}</p>
              <p>{{ salesOrder.sellToCity }}</p>
              <p>Contact: {{ salesOrder.sellToContact || 'N/A' }}</p>
              <p>Phone: {{ salesOrder.sellToPhoneNo }}</p>
              <p>Email: {{ salesOrder.sellToEmail }}</p>
            </div>
          </div>
          <div>
            <h3 class="font-semibold mb-2">Ship To</h3>
            <div class="space-y-1">
              <p>{{ salesOrder.shipToName || salesOrder.sellToCustomerName }}</p>
              <p>{{ salesOrder.shipToAddress || salesOrder.sellToAddress }}</p>
              <p>{{ salesOrder.shipToCity || salesOrder.sellToCity }}</p>
              <p>Contact: {{ salesOrder.shipToContact || salesOrder.sellToContact || 'N/A' }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <Button variant="ghost" class="flex items-center gap-2" @click="toggleLines">
          <span>Sales Lines</span>
          <ChevronRightIcon v-if="!showLines" class="h-4 w-4" />
          <ChevronDownIcon v-else class="h-4 w-4" />
        </Button>

        <div v-if="showLines" class="mt-2 border rounded-lg p-4 max-h-[300px] overflow-y-auto">
          <div
            v-if="salesOrdersStore.salesLinesByDocumentNo[salesOrder?.no]?.length === 0"
            class="text-sm text-gray-500"
          >
            No sales lines found
          </div>
          <div v-else-if="salesOrdersStore.loading" class="flex justify-center py-4">
            <Loader2Icon class="h-6 w-6 animate-spin text-gray-500" />
          </div>
          <div v-else class="overflow-auto">
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
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="line in salesOrdersStore.salesLinesByDocumentNo[salesOrder?.no] || []"
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
                    {{ line.unitPrice }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ line.lineAmount }}
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

      <div class="flex justify-end gap-2">
        <Button @click="handlePrint" :disabled="printing">
          <Loader2Icon v-if="printing" class="h-4 w-4 animate-spin mr-2" />
          Post & Print
        </Button>
        <Button variant="outline" @click="emit('update:open', false)"> Close </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
